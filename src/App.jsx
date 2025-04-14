import { Routes, Route } from 'react-router-dom'
import Header from './components/ui/Custom/Header'
import Hero from './components/ui/Custom/Hero'
import CreateTrip from './create-trip'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <>
      <Header />
      <Toaster/>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>
    </>
  )
}

export default App
