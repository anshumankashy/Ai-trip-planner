import React from "react";

function TravelTips({ trip }) {
  const tips = trip?.tripData?.travel_tips;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">✈️ Travel Tips</h2>

      {tips && tips.length > 0 ? (
        <ul className="space-y-4">
          {tips.map((tip, index) => (
            <li
              key={index}
              className="bg-blue-50 border border-blue-100 rounded-lg p-4 shadow-sm"
            >
              <span className="font-semibold text-blue-800">Tip {index + 1}:</span>{" "}
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No travel tips available.</p>
      )}
    </div>
  );
}

export default TravelTips;
