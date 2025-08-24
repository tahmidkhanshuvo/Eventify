// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

// ✅ make sure this path/casing matches your file exactly
// If your file is ./Pages/My_events.jsx keep your original import
import MyEvents from "./Pages/My_events.jsx";
import All_events from "./Pages/All_events.jsx";
import Create_events from "./Pages/Create_events.jsx";
import Profilepage from "./Pages/Profilepage.jsx";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background stays behind everything */}
      <BackgroundFX />

      {/* Foreground: routes */}
      <div className="relative z-10 min-h-screen">
        <BrowserRouter>
          <Routes>
            {/* Public/top-level */}
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/clubs" element={<Club />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/admin" element={<MainAdmin />} />
            <Route path="/organizers" element={<Organizer />} />

            {/* Nested student area */}
            <Route path="/student" element={<Student />}>
              {/* default -> /students/myevents */}
              <Route index element={<Navigate to="myevents" replace />} />
              <Route path="myevents" element={<MyEvents />} />
              <Route path="allevents" element={<All_events />} />
              <Route path="myprofile" element={<Profilepage />} />
              <Route path="me" element={<Profilepage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
