import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from './components/ui/sonner.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google'
import Header from './components/ui/Custom/Header.jsx'
import MyTrips from './my-trips/index.jsx'
import CreateTrip from './create-trip/index.jsx'
import Viewtrip from './view-trip/[tripId]/index.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />
},
{
  path:'/create-trip',
  element: <CreateTrip />
},
{
  path: '/view-trip/:tripId',
  element: <Viewtrip />
},
{
  path: '/my-trips',
  element: <MyTrips />
}

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster/>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
