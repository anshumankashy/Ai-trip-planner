import { Button } from '@/components/ui/button'
import React from 'react'
import { IoIoSend } from 'react-icons/io'

function InfoSection({trip}) {
  return (
    <div>
      <img src="/placeholder.jpg" className='h-[340px] w-full object-cover rounded-lg' />

<div className='flex justify-between items-center'>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='fond-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>

        <div className='flex gap-5'>
          <h2 className='p-1 px-3 bg-gray-300 rounded-lg text-sm'>📅 {trip.userSelection?.noOfDays} Day</h2>
          <h2 className='p-1 px-3 bg-gray-300 rounded-lg text-sm'>💸 {trip.userSelection?.budget} Day</h2>
          <h2 className='p-1 px-3 bg-gray-300 rounded-lg text-sm'>🧑  No. of Travellers: {trip.userSelection?.travelers}</h2>
        </div>
      </div>
      <Button> <IoIoSend/> </Button>
    </div>
    </div>
  )
}

export default InfoSection