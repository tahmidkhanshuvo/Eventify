// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BackgroundFX from "./components/BackgroundFX.jsx";

import Home from "./navbar/Home.jsx";
import AboutUs from "./navbar/AboutUs.jsx";
import Club from "./navbar/Club.jsx";
import Events from "./navbar/Events.jsx";
import LoginPage from "./login/login.jsx";
import SignUpPage from "./signup/signup.jsx";

import Student from "./dashboard/Student.jsx";
import Organizer from "./dashboard/Organizer.jsx";
import MainAdmin from "./SuperAdmin/mainAdmin.jsx";

// pages used by both
import MyEvents from "./Pages/My_events.jsx";
import AllEvents from "./Pages/All_events.jsx";
import CreateEvent from "./Pages/Create_events.jsx";       // ✅ ensure filename
import ProfileStudent from "./Pages/Profilepage.jsx";
import ProfileOrganizers from "./Pages/ProfileOrganizers.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundFX />
      <div className="relative z-10 min-h-screen">
        <BrowserRouter>
          <Routes>
            {/* public */}
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/clubs" element={<Club />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/admin" element={<MainAdmin />} />

            {/* student area */}
            <Route path="/student" element={<Student />}>
              <Route index element={<Navigate to="myevents" replace />} />
              <Route path="myevents" element={<MyEvents />} />
              <Route path="allevents" element={<AllEvents />} />
              <Route path="myprofile" element={<ProfileStudent />} />
              <Route path="me" element={<ProfileStudent />} />
            </Route>

            {/* organizers area */}
            <Route path="/organizers" element={<Organizer />}>
              <Route index element={<Navigate to="create-event" replace />} />
              <Route path="myevents" element={<MyEvents />} />
              <Route path="allevents" element={<AllEvents />} />
              <Route path="create-event" element={<CreateEvent />} />
              <Route path="profileorganizers" element={<ProfileOrganizers />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
