import { useEffect, useState, useCallback } from "react";

export function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch {
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const onAuthChanged = () => refresh();
    window.addEventListener("auth:changed", onAuthChanged);
    return () => window.removeEventListener("auth:changed", onAuthChanged);
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    try { window.dispatchEvent(new Event("auth:changed")); } catch {}
  }, []);

  return {
    user,
    loading,
    refresh,
    logout,
    isStudent: user?.role === "Student",
    isOrganizer: user?.role === "Organizer",
  };
}
