// components/auth/SuperAdminLogin.jsx
"use client";

import React, { useState } from "react";

const PRIMARY = "#3fc3b1";
const SECONDARY = "#7d9dd2";

export default function SuperAdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const togglePassword = () =>
    setForm((s) => ({ ...s, showPassword: !s.showPassword }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("SuperAdmin login", form.email);
      alert("SuperAdmin logged in (stub). Replace with real auth.");
    } catch (err) {
      console.error(err);
      alert("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Background */}
      <BackgroundDecor />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src="https://ik.imagekit.io/qlaegzdb2/Admin.png?updatedAt=1756042144647"
              alt="SuperAdmin Logo"
              className="h-16 w-auto"
            />
          </div>
          <br></br>

          {/* Glass Card */}
          <div
            className="rounded-2xl p-6 sm:p-7"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <h2
              className="mb-1 text-center text-white"
              style={{
                fontFamily: "Sora, sans-serif",
                fontWeight: 700,
                fontSize: "1.35rem",
              }}
            >
              Administrator Login
            </h2>
            <p
              className="mb-6 text-center text-sm text-white/75"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              Enter your credentials here
            </p>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm text-white/80"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@eventify.com"
                  value={form.email}
                  onChange={onChange}
                  className="h-11 w-full rounded-lg border-none bg-white/10 px-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[rgba(63,195,177,0.45)]"
                  style={{
                    fontFamily: "Sora, sans-serif",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm text-white/80"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={form.showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={onChange}
                    className="h-11 w-full rounded-lg border-none bg-white/10 px-3 pr-10 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[rgba(63,195,177,0.45)]"
                    style={{
                      fontFamily: "Sora, sans-serif",
                      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
                      backdropFilter: "blur(10px)",
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-white/80 hover:text-white"
                    style={{ fontFamily: "Sora, sans-serif" }}
                    aria-label={
                      form.showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {form.showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <GlowButton type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </GlowButton>
              </div>
            </form>
          </div> <br></br><br></br>

          {/* Footer text */}
          <p
            className="mt-4 text-center text-xs text-white/50"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            © {new Date().getFullYear()} Eventify — Administrator Console
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helper components ---------- */

function GlowButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`group relative inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-lg px-4 font-bold text-white transition ${className}`}
      style={{
        fontFamily: "Sora, sans-serif",
        background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`,
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.15), 0 10px 30px rgba(0,0,0,0.35)",
      }}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="pointer-events-none absolute inset-x-0 -bottom-px block h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${PRIMARY}, ${SECONDARY}, transparent)`,
        }}
      />
      <span
        className="pointer-events-none absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 opacity-0 blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${SECONDARY}, ${PRIMARY}, transparent)`,
        }}
      />
    </button>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_-10%_-20%,rgba(63,195,177,0.12),transparent_60%),radial-gradient(1100px_700px_at_110%_-10%,rgba(125,157,210,0.12),transparent_60%),linear-gradient(180deg,rgba(7,10,18,0.95),rgba(7,10,18,0.98))]" />
      <div
        className="pointer-events-none absolute -inset-x-40 -top-1/3 h-[60vh] rotate-12 blur-[80px] opacity-60"
        style={{
          background:
            "conic-gradient(from 120deg, rgba(63,195,177,0.18), rgba(125,157,210,0.18), transparent 60%)",
        }}
      />
    </>
  );
}
