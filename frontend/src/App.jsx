// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackgroundFX from "./components/BackgroundFX.jsx";
import LoginPage from "./login/login.jsx";
import SignUpPage from "./signup/signup.jsx";
import Home from "./navbar/Home.jsx";
import AboutUs from "./navbar/AboutUs.jsx";
import Club from "./navbar/Club.jsx";
import Events from "./navbar/Events.jsx";
import Student from "./dashboard/Student.jsx";
import MainAdmin from "./SuperAdmin/mainAdmin.jsx";
import Organizer from "./dashboard/Organizer.jsx";  


 // your background component

export default function App() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-neutral-950 text-white">
      {/* Background stays always */}
      <BackgroundFX />

      {/* Foreground: routes */}
      <div className="relative">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/clubs" element={<Club />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/student" element={<Student />} />
            <Route path="/admin" element={<MainAdmin />} />
            <Route path="/students" element ={<Student/>}/>
            <Route path ="/organizers" element={<Organizer/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

