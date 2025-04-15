import React from 'react';

function InfoSection({ trip }) {
  // Handle loading state
  if (!trip) {
    return <p className="text-center py-4">Loading trip information...</p>;
  }

  // Extract data directly from trip object
  const location = trip.location || trip.destination || 'Unknown Destination';
  const noOfDays = trip.noOfDays || trip.duration || 0;
  const budget = trip.budget || 'Not specified';
  const travelers = trip.travelers || trip.travelingWith || 'Not specified';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="relative h-[340px] w-full mb-6 rounded-lg overflow-hidden">
        <img
          src={trip.image || '/placeholder.jpg'}
          className="h-full w-full object-cover"
          alt={`Trip to ${location}`}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h1 className="text-white text-3xl font-bold">{location}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">Duration</h3>
          <p className="text-2xl font-bold mt-2">
            {noOfDays} day{noOfDays !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">Budget</h3>
          <p className="text-2xl font-bold mt-2">
            {budget}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">Travelers</h3>
          <p className="text-2xl font-bold mt-2">
            {travelers}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;