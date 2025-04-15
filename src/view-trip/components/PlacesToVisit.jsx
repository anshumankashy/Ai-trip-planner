import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  // Safely get itinerary or default to empty array
  const itinerary = Array.isArray(trip?.tripData?.itinerary) 
    ? trip.tripData.itinerary 
    : [];

  // Early return if no itinerary items
  if (itinerary.length === 0) {
    return (
      <div>
        <h2 className='font-bold text-xl'>Places to Visit</h2>
        <p className='text-gray-500 mt-2'>No itinerary planned yet</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className='font-bold text-xl'>Places to Visit</h2>
      <div>
        {itinerary.map((item, index) => (
          <div key={`day-${index}`} className='mt-5'>
            <h2 className='font-bold text-lg'>{item.day || `Day ${index + 1}`}</h2>
            <div className='grid md:grid-cols-2 gap-5'>
              {Array.isArray(item.plan) ? (
                item.plan.map((place, placeIndex) => (
                  <div key={`place-${index}-${placeIndex}`} className='my-2'>
                    <h2 className='font-medium text-sm text-orange-600'>
                      {place.time || 'Time not specified'}
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))
              ) : (
                <p className='text-gray-500'>No plans for this day</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;