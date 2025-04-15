import React from 'react';
import placeholder from '../../assets/placeholder.jpg';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        
            <img src={placeholder} className="rounded-xl h-[200px] w-full object-cover" />
          </div>
  
    </div>
  );
}

export default Hotels;
