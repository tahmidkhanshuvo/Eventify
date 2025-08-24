// App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import BackgroundFX from "./components/BackgroundFX.jsx";
import Layout from "./components/Layout.jsx"; // ⬅️ import Layout

import LoginPage from "./login/login.jsx";
import SignUpPage from "./signup/signup.jsx";
import Home from "./navbar/Home.jsx";
import AboutUs from "./navbar/AboutUs.jsx";
import Club from "./navbar/Club.jsx";
import Events from "./navbar/Events.jsx";
import Student from "./dahsboard/Student.jsx";
import MainAdmin from "./SuperAdmin/mainAdmin.jsx";

function AppInner() {
  const location = useLocation();
  const path = location.pathname;
  const hideGlobalBg = path === "/login" || path === "/signup";

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

  return (
    <div>
      {!hideGlobalBg && <BackgroundFX />}

      <div className="relative z-10">
        <Routes>
          {/* Public menu pages wrapped with Layout so they show Navbar + Footer */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/aboutus" element={<Layout><AboutUs /></Layout>} />
          <Route path="/clubs" element={<Layout><Club /></Layout>} />
          <Route path="/events" element={<Layout><Events /></Layout>} />

          {/* Auth pages: these already include their own <Layout> */}
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

          {/* Protected routes (don’t wrap unless those pages expect Layout) */}
          <Route
            path="/student"
            element={
              <ProtectedRoute roles={["Student"]}>
                <Student />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["Super Admin"]}>
                <MainAdmin />
              </ProtectedRoute>
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

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

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
