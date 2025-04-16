import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user)
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }

  return (
    <div className='shadow-sm flex justify-between items-center px-4 sm:px-6 py-4 flex-wrap gap-y-4'>
      <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />

      <div className='flex items-center gap-3 flex-wrap'>
        {user ? (
          <>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-sm px-4 py-2">+ Create Trip</Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-sm px-4 py-2">My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} alt="User" className='h-[35px] w-[35px] rounded-full cursor-pointer' />
              </PopoverTrigger>
              <PopoverContent className='w-32'>
                <h2 className='cursor-pointer text-sm text-center' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button onClick={() => setOpenDialog(true)} className="text-sm px-4 py-2">Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogDescription className="space-y-4 text-center">
              <img src="/logo.svg" alt="logo" width="100px" className="mx-auto" />
              <h2 className="font-bold text-lg">Sign In to check out your travel plan</h2>
              <p className="text-sm text-gray-500">Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-4 flex gap-4 items-center justify-center">
                <FcGoogle className="h-6 w-6" />
                Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header
