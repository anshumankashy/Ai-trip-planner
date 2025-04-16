import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AiModel';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

// ... [imports unchanged]

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && value > 5) {
      toast.error("Please enter Trip Days less than or equal to 5");
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log('FormData', formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
    onError: (error) => {
      console.log(error);
      toast.error("Google login failed. Please try again.");
    }
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'application/json'
          }
        }
      );
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      await OnGenerateTrip();
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      toast.error("Failed to fetch user profile. Please try again.");
    }
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.travelers || !formData?.noOfDays || formData?.noOfDays > 5) {
      toast.error("Please fill all the fields correctly to continue");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{travelers}', formData?.travelers)
      .replace('{budget}', formData?.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAITrip(result?.response?.text());
  };

  const SaveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
    toast.success("Trip Generated Successfully");
  };

  return (
    <div className='px-5 sm:px-10 lg:px-36 xl:px-48 mt-10'>
      <div className='mb-12'>
        <h2 className='font-extrabold text-3xl sm:text-4xl text-[#1e293b]'>✨ Tell us your travel preferences</h2>
        <p className='mt-3 text-gray-500 text-lg'>We’ll tailor the perfect trip just for you based on your inputs.</p>
      </div>

      {/* Destination Input */}
      <div className='mb-10'>
        <h2 className='text-xl font-semibold mb-3'>📍 Destination</h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACE_KEY}
          selectProps={{
            value: place,
            onChange: (v) => {
              setPlace(v);
              handleInputChange('location', v);
            },
            placeholder: 'Search for a destination...',
            noOptionsMessage: () => 'No destinations found',
            loadingMessage: () => 'Searching...'
          }}
        />
      </div>

      {/* Days Input */}
      <div className='mb-10'>
        <h2 className='text-xl font-semibold mb-3'>🗓️ Trip Duration (Max 5 Days)</h2>
        <Input
          placeholder='Ex. 3'
          type='number'
          min="1"
          max="5"
          className="w-32"
          onChange={(e) => handleInputChange('noOfDays', parseInt(e.target.value))}
        />
      </div>

      {/* Budget */}
      <div className='mb-10'>
        <h2 className='text-xl font-semibold mb-3'>💰 Your Budget</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-5 border rounded-xl cursor-pointer hover:shadow-xl transition-all duration-200 ${formData.budget === item.title ? 'border-blue-500 bg-blue-50 shadow-md' : 'bg-white'}`}
            >
              <div className='text-3xl mb-2'>{item.icon}</div>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <p className='text-sm text-gray-500'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Travelers */}
      <div className='mb-10'>
        <h2 className='text-xl font-semibold mb-3'>🧳 Who are you traveling with?</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('travelers', item.title)}
              className={`p-5 border rounded-xl cursor-pointer hover:shadow-xl transition-all duration-200 ${formData.travelers === item.title ? 'border-blue-500 bg-blue-50 shadow-md' : 'bg-white'}`}
            >
              <div className='text-3xl mb-2'>{item.icon}</div>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <p className='text-sm text-gray-500'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className='mt-10 flex justify-end'>
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}
          className="text-base px-6 py-2"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className='h-6 w-6 animate-spin' />
          ) : (
            'Generate Trip ✈️'
          )}
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" className="h-10 w-auto mx-auto mb-5" />
              <h2 className='font-bold text-lg text-center'>Sign In With Google</h2>
              <p className='text-center text-sm text-gray-500'>Sign in securely to create your AI-powered trip plan.</p>

              <Button
                onClick={login}
                className="w-full mt-6 flex gap-4 items-center justify-center"
                disabled={loading}
              >
                <FcGoogle className='h-6 w-6' />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
