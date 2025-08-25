// App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import "./api.js";

import BackgroundFX from "./components/BackgroundFX.jsx";

import LoginPage from "./login/login.jsx";
import SignUpPage from "./signup/signup.jsx";
import Home from "./navbar/Home.jsx";
import AboutUs from "./navbar/AboutUs.jsx";
import Club from "./navbar/Club.jsx";
import EventDetails from "./Pages/EventDetails.jsx";

// Dashboards (layouts that render <Outlet/>)
import Student from "./dashboard/Student.jsx";
import Organizer from "./dashboard/Organizer.jsx";

// Pages used inside dashboards
import AllEvents from "./Pages/All_events.jsx";
import MyEvents from "./Pages/My_events.jsx";
import CreateEvents from "./Pages/Create_events.jsx";
import ProfilePage from "./Pages/Profilepage.jsx";

// Super Admin (leave as-is per your note)
import SuperAdmin from "./SuperAdmin/SuperAdmin.jsx";
import SuperAdminLogin from "./SuperAdmin/SuperAdminLogin.jsx";

// Logout page
import Logout from "./Pages/Logout.jsx";

function AppInner() {
  const location = useLocation();
  const path = location.pathname;
  const hideGlobalBg =
    path === "/login" || path === "/signup" || path === "/admin-login";

  // Authoritative auth check from server (cookie-based)
  const [me, setMe] = useState({ loading: true, user: null });

  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) {
          if (!aborted) setMe({ loading: false, user: null });
          return;
        }
        const u = await res.json();
        if (aborted) return;

        // keep localStorage in sync for other parts of the app
        localStorage.setItem("user", JSON.stringify(u));
        if (!localStorage.getItem("token")) localStorage.setItem("token", "cookie");

        setMe({ loading: false, user: u });
      } catch {
        if (!aborted) setMe({ loading: false, user: null });
      }
    })();
    return () => {
      aborted = true;
    };
  }, []);

  function PageLoader() {
    return (
      <div className="grid min-h-[60vh] place-items-center text-white/80">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 animate-pulse rounded-full bg-white/60" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-white/60 [animation-delay:150ms]" />
          <span className="h-3 w-3 animate-pulse rounded-full bg-white/60 [animation-delay:300ms]" />
          <span className="ml-2">checking session…</span>
        </div>
      </div>
    );
  }

  function ProtectedRoute({ children, roles }) {
    if (me.loading) return <PageLoader />;
    if (!me.user) return <Navigate to="/login" replace />;
    if (roles && !roles.includes(me.user.role)) return <Navigate to="/" replace />;
    return children;
  }

  function GuestOnly({ children }) {
    if (me.loading) return <PageLoader />;
    if (me.user) return <Navigate to="/" replace />;
    return children;
  }

  // Keep this exactly as-is for your separate Super Admin portal
  function AdminPortalGate({ children }) {
    if (me.loading) return <PageLoader />;
    if (me.user?.role === "Super Admin") return <Navigate to="/admin" replace />;
    return children;
  }

  return (
    <div>
      {!hideGlobalBg && <BackgroundFX />}

      <div className="relative z-10">
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/club" element={<Club />} />
          <Route path="/events" element={<AllEvents />} />

          {/* Auth pages */}
          <Route
            path="/login"
            element={
              <GuestOnly>
                <LoginPage />
              </GuestOnly>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestOnly>
                <SignUpPage />
              </GuestOnly>
            }
          />

          {/* Super Admin login (kept separate) */}
          <Route
            path="/admin-login"
            element={
              <AdminPortalGate>
                <SuperAdminLogin />
              </AdminPortalGate>
            }
          />

          {/* ---------- Protected, nested dashboards ---------- */}

          {/* Student area */}
          <Route
            path="/student"
            element={
              <ProtectedRoute roles={["Student"]}>
                <Student />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="allevents" replace />} />
            <Route path="allevents" element={<AllEvents />} />
            <Route path="myevents" element={<MyEvents />} />
            <Route path="myprofile" element={<ProfilePage />} />
          </Route>

          {/* Organizer area */}
          <Route
            path="/organizers"
            element={
              <ProtectedRoute roles={["Organizer"]}>
                <Organizer />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="create-event" replace />} />
            <Route path="allevents" element={<AllEvents />} />
            <Route path="myevents" element={<MyEvents />} />
            <Route path="create-event" element={<CreateEvents />} />
            <Route path="myprofile" element={<ProfilePage />} />
          </Route>

          {/* Super Admin area (untouched) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["Super Admin"]}>
                <SuperAdmin />
              </ProtectedRoute>
            }
          />

          {/* Logout */}
          <Route path="/logout" element={<Logout />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
