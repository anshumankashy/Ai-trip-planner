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

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && value > 5) {
      toast.error("Please enter Trip Days less than or equal to 5"); // Changed to toast.error for better visibility
      return; // Added return to prevent setting invalid data
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
    onSuccess: (tokenResponse) => {
      GetUserProfile(tokenResponse);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Google login failed. Please try again."); // Added error feedback
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
      await OnGenerateTrip(); // Added await to ensure proper sequencing
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      toast.error("Failed to fetch user profile. Please try again.");
    }
  };

  const OnGenerateTrip = async () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        setOpenDialog(true);
        return;
      }

      if (
        !formData?.location ||
        !formData?.budget ||
        !formData?.travelers ||
        !formData?.noOfDays ||
        formData?.noOfDays > 5
      ) {
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
      const tripText = result?.response?.text();
      
      if (!tripText) {
        throw new Error("No trip data received from AI");
      }
      
      await SaveAITrip(tripText);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const SaveAITrip = async (TripData) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();
      
      await setDoc(doc(db, "AITrip", docId), {
        userSelection: formData,
        tripData: TripData,
        userEmail: user?.email,
        id: docId,
        createdAt: new Date().toISOString() // Added timestamp for sorting
      });
      
      navigate('view-trip/' + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:p-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will design your trip accordingly
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_KEY}
            selectProps={{
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
              placeholder: 'Search for a destination...', // Added placeholder
              noOptionsMessage: () => 'No destinations found', // Better UX
              loadingMessage: () => 'Searching...' // Better UX
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input
            placeholder='Ex. 3'
            type='number'
            min="1"
            max="5"
            onChange={(e) => handleInputChange('noOfDays', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition-all ${
                formData.budget === item.title ? 'shadow-lg border-blue-500 bg-blue-50' : ''
              }`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('travelers', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition-all ${
                formData.travelers === item.title ? 'shadow-lg border-blue-500 bg-blue-50' : ''
              }`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />
          ) : (
            'Generate Trip'
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" className="h-10 w-auto mx-auto mb-5" />
              <h2 className='font-bold text-lg text-center'>Sign In With Google</h2>
              <p className='text-center'>Sign in to the App with Google authentication securely</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center justify-center"
                disabled={loading}
              >
                <FcGoogle className='h-7 w-7' />
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