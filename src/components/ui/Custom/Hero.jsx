import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 text-center bg-white">
      <h1 className="font-extrabold text-5xl sm:text-6xl md:text-7xl leading-tight max-w-4xl mb-6">
        <span className="text-[#f56551]">Discover Your Next Adventure</span> with AI:
        <br />
        <span className="text-gray-800">Personalized Itineraries</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-500 mb-8 max-w-xl">
        Your personal AI-powered trip planner is here to help.
      </p>
      <Link to="/create-trip">
      <Button className="text-lg px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
        Get Started! Its Free!
      </Button>
      </Link>
    </div>
  ) 
}

export default Hero
