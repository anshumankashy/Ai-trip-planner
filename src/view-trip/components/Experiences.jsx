import React from "react";

const getActivityImage = (type = "") => {
    const keyword = type?.toLowerCase?.() || "";
    if (keyword.includes("helicopter")) return "/helicoptor.jpg";
    if (keyword.includes("cruise")) return "/cruise.jpg";
    if (keyword.includes("adventure")) return "/adventure.jpg";
    if (keyword.includes("relaxation")) return "/relax.jpg";
    return "/activity-placeholder.avif"; // default
  };
  
  const getFoodImage = (name = "") => {
    const keyword = name?.toLowerCase?.() || "";
    if (keyword.includes("lunch")) return "/lunch.jpeg";
    if (keyword.includes("dining") || keyword.includes("lodge"))
      return "/fine-dining.jpeg";
    return "/food-placeholder.png"; // default
  };
  

  function Experiences({ trip }) {
    console.log("🔍 Trip prop received in Experiences:", trip);
  
    const activities = Array.isArray(trip?.tripData?.activities)
      ? trip.tripData.activities
      : [];
  
    const food = Array.isArray(trip?.tripData?.food)
      ? trip.tripData.food
      : [];
  
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-indigo-600 mb-8">🌟 Experiences</h2>
  
        {/* Activities */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4">🎒 Activities</h3>
          {activities.length === 0 ? (
            <p className="text-gray-500">No activities available.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {activities.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden"
                >
                  <img
                    src={getActivityImage(item.name || item.type)}
                    alt={item.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-5">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h4>
                    <p className="text-sm text-blue-600 mt-1 font-medium">
                      {item.type}
                    </p>
                    <p className="text-gray-600 mt-2 text-sm">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
  
        {/* Food */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">🍽️ Food Recommendations</h3>
          {food.length === 0 ? (
            <p className="text-gray-500">No food recommendations available.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {food.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden"
                >
                  <img
                    src={getFoodImage(item.name)}
                    alt={item.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-5">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h4>
                    <p className="text-sm text-pink-600 mt-1 font-medium">
                      {item.type}
                    </p>
                    <p className="text-gray-600 mt-2 text-sm">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
export default Experiences  