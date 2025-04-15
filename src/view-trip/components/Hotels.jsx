import React from 'react';
import placeholder from '../../../public/placeholder.jpg';
import { Button } from '@/components/ui/button';

function Hotels({ trip }) {
  return (
     <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

        <div className='grid-bold cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {trip?.tripData?.hotel?.map((item,index)=>(
               <div>
                  <img src="/placeholder.jpg" className='h-[340px] w-full object-cover rounded-lg' />
               </div>
            ))}
        </div>
    </div>
  )
}

export default Hotels;
