import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../button'

function Hero() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-10 md:px-20 lg:px-36 xl:mx-56 gap-6 sm:gap-8 lg:gap-9">
      <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-center mt-10">
        <span className="text-[#f56551]">Discover Your Next Adventure with AI: </span>
        Personalized Itineraries at Your Fingertips
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-500 text-center max-w-2xl">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to="/create-trip">
        <Button>Get Started, It's free</Button>
      </Link>

      <img src="/landing.png" alt="AI Trip Planner" className="w-full max-w-[750px]" />
    </div>
  )
}

export default Hero
