import React from "react";

const getTimeColor = (time) => {
  switch (time.toLowerCase()) {
    case "morning":
      return "bg-yellow-100 text-yellow-800";
    case "afternoon":
      return "bg-blue-100 text-blue-800";
    case "evening":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRandomImage = (time) => {
  switch (time.toLowerCase()) {
    case "morning":
      return "/morning.jpg";
    case "afternoon":
      return "/afternoon.jpg";
    case "evening":
    case "night":
      return "/night.webp";
    default:
      return "/placeholder.jpg";
  }
};

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  if (!itinerary || Object.entries(itinerary).length === 0) {
    return <p>No itinerary available.</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-6">📍 Places to Visit</h2>

      {Object.entries(itinerary).map(([dayKey, dayData], index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200"
        >
          <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
            {dayKey.replace(/(\w)(\d)/, (_, p1, p2) => `${p1} ${p2}`)}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(dayData).map(([timeOfDay, activityData], i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-100 shadow-sm overflow-hidden"
              >
                <img
                  src={getRandomImage(timeOfDay)}
                  alt="Activity"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${getTimeColor(
                      timeOfDay
                    )}`}
                  >
                    {timeOfDay}
                  </span>

                  {activityData ? (
                    <>
                      <h4 className="text-lg font-semibold mt-2">
                        {activityData.activity}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {activityData.details}
                      </p>

                      <div className="mt-3 flex justify-between text-sm">
                        <span className="text-gray-600">
                          ⏱ {activityData.duration}
                        </span>
                        <span className="text-green-600 font-medium">
                          💰 {activityData.cost}
                        </span>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 mt-1">No activity information available.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
