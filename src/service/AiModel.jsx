// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-1.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating,Time ttravel each of the location for 3 days with each day plan with best time to visit in JSON format.`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `I cannot directly access and display images or real-time pricing information for hotels.  Hotel prices fluctuate constantly.  Also, I don't have access to a comprehensive image database.  Therefore, I cannot provide the image URLs or precise pricing.  However, I can give you a JSON structure that you can populate with this information using online travel booking sites and map services like Google Maps.

\`\`\`json
{
  "tripName": "Las Vegas Budget Getaway for Couples (3 Days)",
  "budget": "Cheap",
  "travelers": 2,
  "hotels": [
    {
      "hotelName": "Hotel Name 1 (Example)",
      "hotelAddress": "123 Example Street, Las Vegas, NV",
      "price": "$$$ (replace with actual price range)", 
      "hotelImageUrl": "URL_TO_HOTEL_IMAGE (replace with image URL)",
      "geoCoordinates": {
        "latitude": 36.1699,
        "longitude": -115.1398
      },
      "rating": 3.8,
      "description": "A basic hotel with clean rooms and a convenient location.  May lack amenities."
    },
    {
      "hotelName": "Hotel Name 2 (Example)",
      "hotelAddress": "456 Another Street, Las Vegas, NV",
      "price": "$$$ (replace with actual price range)",
      "hotelImageUrl": "URL_TO_HOTEL_IMAGE (replace with image URL)",
      "geoCoordinates": {
        "latitude": 36.1699,
        "longitude": -115.1398
      },
      "rating": 4.2,
      "description": "Slightly more upscale, but still budget-friendly. May offer a pool."
    },
    {
      "hotelName": "Hotel Name 3 (Example)",
      "hotelAddress": "789 YetAnother Street, Las Vegas, NV",
      "price": "$$$ (replace with actual price range)",
      "hotelImageUrl": "URL_TO_HOTEL_IMAGE (replace with image URL)",
      "geoCoordinates": {
        "latitude": 36.1699,
        "longitude": -115.1398
      },
      "rating": 3.5,
      "description": "Offers free breakfast, which can save money."
    }
  ],
  "itinerary": {
    "day1": [
      {
        "placeName": "The Strip (Walking Tour)",
        "placeDetails": "Walk the length of the Strip, admiring the hotels and atmosphere.",
        "placeImageUrl": "URL_TO_STRIP_IMAGE (replace with image URL)",
        "geoCoordinates": { "latitude": 36.1091, "longitude": -115.1726 },
        "ticketPricing": "Free",
        "rating": 4.5,
        "travelTime": "Variable, depending on how far you walk"
      },
      {
        "placeName": "Fremont Street Experience (Evening)",
        "placeDetails": "See the Viva Vision light show.",
        "placeImageUrl": "URL_TO_FREMONT_STREET_IMAGE (replace with image URL)",
        "geoCoordinates": { "latitude": 36.1672, "longitude": -115.1424 },
        "ticketPricing": "Free (show)",
        "rating": 4.2,
        "travelTime": "30 minutes by taxi/rideshare"
      }
    ],
    "day2": [
      {
        "placeName": "Red Rock Canyon National Conservation Area",
        "placeDetails": "Hike or drive through scenic desert landscape.",
        "placeImageUrl": "URL_TO_RED_ROCK_IMAGE (replace with image URL)",
        "geoCoordinates": { "latitude": 36.1852, "longitude": -115.7777},
        "ticketPricing": "$15 per vehicle",
        "rating": 4.7,
        "travelTime": "45 minutes by car"
      },
      {
        "placeName": "In-N-Out Burger",
        "placeDetails": "Enjoy a classic West Coast burger (Budget-friendly meal)",
        "placeImageUrl": "URL_TO_IN_N_OUT_IMAGE (replace with image URL)",
        "geoCoordinates": { "latitude": 36.1151, "longitude": -115.1741 },
        "ticketPricing": "$10-15 per person",
        "rating": 4.0,
        "travelTime": "variable"
      }
    ],
    "day3": [
      {
        "placeName": "Seven Magic Mountains",
        "placeDetails": "Colorful art installation outside of the city (Requires transportation)",
        "placeImageUrl": "URL_TO_SEVEN_MAGIC_MOUNTAIN_IMAGE (replace with image URL)",
        "geoCoordinates": { "latitude": 36.0006, "longitude": -114.9577 },
        "ticketPricing": "Free",
        "rating": 4.4,
        "travelTime": "30-45 minutes by car"
      },
      {
        "placeName": "Downtown Container Park",
        "placeDetails": "Unique shopping and dining area in repurposed shipping containers.",
        "placeImageUrl": "URL_TO_CONTAINER_PARK_IMAGE (replace with image URL)",
        "geoCoordinates": { "latitude": 36.1645, "longitude": -115.1445},
        "ticketPricing": "Free entry",
        "rating": 4.1,
        "travelTime": "15-20 minutes by car from Strip"
      }

    ]
  }
}
\`\`\`

**To use this:**

1. **Find Hotels:** Use websites like Booking.com, Expedia, Kayak, etc., to search for hotels in Las Vegas within your budget. Fill in the \`hotel\` array with the details you find.
2. **Find Images:** Search for images of each hotel and location on Google Images or similar and paste the URLs into the JSON.
3. **Get Geocoordinates:** Use Google Maps to find the latitude and longitude for each location and hotel.
4. **Check Prices:**  Prices for attractions can change, so double-check before you go.


Remember to factor in transportation costs (taxis, rideshares, or the cost of renting a car).  Walking is a great option for exploring the Strip, but consider rideshares for more distant locations.  Enjoy your trip!
`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}
main();
