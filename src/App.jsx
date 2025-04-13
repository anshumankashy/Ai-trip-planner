import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h2 className='text-5xl text-red-700 font-bold'> Hello Suman </h2>
     <button className='text-[50px] text-yellow-500 font-bold'>Get Back to Work, You Don't have Time</button>

    </>
  )
}

export default App
