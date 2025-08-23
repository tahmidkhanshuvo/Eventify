import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './login/login.jsx'
import SignUpPage from './signup/signup.jsx'
import Home from './navbar/Home.jsx'
import AboutUs from './navbar/AboutUs.jsx'
import Club from './navbar/Club.jsx'
import Events from './navbar/Events.jsx'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/clubs" element={<Club />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App