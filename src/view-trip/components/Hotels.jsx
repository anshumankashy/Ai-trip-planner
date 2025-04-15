import React from 'react'

function Hotels(trip) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'> Hotel recommendation</h2>
    
        <div>
            {trip?.tripData?.hotels?.map((item,index)=>(
                <div>
                    <img src="/placeholder.jpg" className='h-[340px] w-full object-cover rounded-xl' />
                </div>

            ))}
        </div>
    
    
    </div>
  )
}

export default Hotels