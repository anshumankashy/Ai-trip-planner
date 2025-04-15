import { Routes, Route } from 'react-router-dom';
import Header from './components/ui/Custom/Header';
import Hero from './components/ui/Custom/Hero';
import CreateTrip from './create-trip';
import { Toaster } from './components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
