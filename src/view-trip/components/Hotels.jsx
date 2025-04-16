import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-5'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <div key={index} className='bg-white shadow p-3 rounded-lg'>
            <img
              src='/placeholder.jpg'
              className='rounded-md w-full h-[180px] object-cover'
              alt='Hotel'
            />
            <div className='my-2'>
              <h2 className='font-medium text-lg'>{hotel?.hotelName}</h2>
              <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
              <h2 className='text-sm text-gray-600 mt-1'>💰 {hotel?.price}</h2>
              <h2 className='text-sm text-gray-600 mt-1'>⭐ {hotel?.rating}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hotels
