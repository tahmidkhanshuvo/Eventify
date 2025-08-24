import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/material"; // Import Box for consistent styling

function getStoredUser() {
  try {
    const s = localStorage.getItem("user");
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

const Layout = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser());

  // Keep Layout in sync with auth changes across tabs AND same-tab updates
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "user" || e.key === "token") setUser(getStoredUser());
    };
    const onAuthChanged = () => setUser(getStoredUser());

    window.addEventListener("storage", onStorage);
    window.addEventListener("auth:changed", onAuthChanged);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth:changed", onAuthChanged);
    };
  }, []);

  const emitAuthChanged = () => {
    try {
      window.dispatchEvent(new Event("auth:changed"));
    } catch {}
  };

  // Hydrate from cookie on initial load (if localStorage is empty)
  useEffect(() => {
    let aborted = false;

    async function hydrateFromCookie() {
      // If we already have a user in localStorage, skip
      if (getStoredUser()) return;

      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) return; // not logged in; do nothing

        const me = await res.json();
        if (aborted || !me) return;

        // Persist minimal state; token is httpOnly, but we set a harmless flag
        localStorage.setItem("user", JSON.stringify(me));
        if (!localStorage.getItem("token")) {
          // Presence flag for route guards; API still uses the cookie.
          localStorage.setItem("token", "cookie");
        }

        setUser(me);
        emitAuthChanged();
      } catch {
        // ignore network errors
      }
    }

    hydrateFromCookie();
    return () => {
      aborted = true;
    };
  }, []); // run once

  const handleLogout = async () => {
    try {
      // Server-side logout clears the cookie
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      }).catch(() => {});
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      emitAuthChanged();
      setUser(null);

      // If user was on a protected area, send to login.
      const path = window.location.pathname;
      if (path.startsWith("/student") || path.startsWith("/organizers") || path.startsWith("/admin")) {
        window.location.href = "/login";
      } else {
        // Soft refresh to update any auth-conditional UI
        window.location.reload();
      }
    }
  };

  return (
    <>
      {/* Pass user + logout to Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      <Box
        sx={{
          pt: 8,
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>{children}</Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
