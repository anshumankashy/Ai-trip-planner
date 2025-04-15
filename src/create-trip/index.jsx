import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AiModel';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog,setOpenDailog]=useState([false])

  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && value > 5) {
      console.log("Please enter Trip Days less than or equal to 5");
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log('FormData', formData);
  }, [formData]);

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>console.log(codeResp),
    onError:(error)=>console.log(error)
  })

  const OnGenerateTrip = async() => {

    const user=localStorage.getItem('user');
    if(!user)
    {
      setOpenDailog(true)
      return ;
    }
    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.travelers ||
      !formData?.noOfDays ||
      formData?.noOfDays > 5
    ) {
      toast("Please fill all the fields correctly to continue");
      return;
    }

    const FINAL_PROMPT =AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{travelers}', formData?.travelers)
    .replace('{budget}', formData?.budget);

    console.log('FINAL_PROMPT', FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
  }

  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.acess_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
    })


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
              }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input
            placeholder='Ex. 3'
            type='number'
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
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData.budget === item.title && 'shadow-lg border-blue-500'
              }`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-grey-500'>{item.desc}</h2>
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
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData.travelers === item.title && 'shadow-lg border-blue-500'
              }`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-grey-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>
      <Dialog open={openDailog}>
      
  <DialogContent>
    <DialogHeader>
      
      <DialogDescription>
           <imag src="/logo.svg"/>
           <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
           <p>Sign in to the App with Google authentication securely</p>

          <Button
          onClick={login}
          className="w-full mt-5 flex gap-4 items-center">
          <FcGoogle className='h-7 w-7'/>
          Sign In With Google</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  );
}

export default CreateTrip;
