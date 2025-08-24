"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setOk("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      setErr("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // receive httpOnly cookie
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Login failed");

      // Only allow Student or Organizer here
      if (data?.role !== "Student" && data?.role !== "Organizer") {
        // If any other role logs in, clear client state and block
        try { await fetch("/api/auth/logout", { method: "POST", credentials: "include" }); } catch {}
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        throw new Error("This login is for Students and Organizers only.");
      }

      // Optional: store token for client-only needs (cookie already set)
      if (data?.token) localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: data?._id,
          username: data?.username,
          email: data?.email,
          role: data?.role,
        })
      );

      // notify Layout/Navbar listeners
      try { window.dispatchEvent(new Event("auth:changed")); } catch {}

      // role-based redirect (Student -> /student, Organizer -> choose where)
      const dest = data?.role === "Student" ? "/student" : "/"; // change "/" to "/organizer" if you add it
      setOk("Logged in! Redirecting…");
      setTimeout(() => { window.location.href = dest; }, 500);
    } catch (e2) {
      setErr(e2.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <Layout>
        <BackgroundFX />

        <section className="relative z-10 mx-auto flex min-h-screen w-[min(560px,92%)] items-center justify-center py-12">
          <div className="w-full">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
              <header className="mb-6">
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#7d9dd2] to-[#3fc3b1] bg-clip-text text-transparent">
                  Sign in to Eventify
                </h1>
                <p className="text-white/70 text-sm mt-1">
                  Welcome back! Please enter your details.
                </p>
              </header>

              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                {err && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                    aria-live="polite"
                  >
                    {err}
                  </div>
                )}
                {ok && (
                  <div
                    role="status"
                    className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200"
                    aria-live="polite"
                  >
                    {ok}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/85">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="h-12"
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/85">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="h-12 pr-12"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-white/80 hover:bg-white/10"
                    >
                      <Eye open={showPassword} />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full select-none rounded-xl bg-gradient-to-r from-[#3fc3b1] to-[#7d9dd2] text-white font-semibold h-11 transition-all hover:-translate-y-0.5 shadow-[0_0_22px_rgba(63,195,177,0.45)] hover:shadow-[0_0_34px_rgba(63,195,177,0.6)] disabled:opacity-60"
                >
                  {loading ? "Signing in…" : "Sign in"}
                </button>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-transparent px-2 text-xs text-white/60">or continue with</span>
                  </div>
                </div>

                {/* Google OAuth button (stub) */}
                <button
                  type="button"
                  onClick={() => {
                    // If you add Google OAuth backend: window.location.href = "/api/auth/google"
                  }}
                  className="h-11 w-full rounded-xl bg-white text-gray-900 hover:bg-white/90 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                >
                  <GoogleGlyph />
                  <span className="font-medium">Continue with Google</span>
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-white/60">
              © {new Date().getFullYear()} Eventify. All rights reserved.
            </p>
          </div>
        </section>
      </Layout>
    </main>
  );
}

/* ------- Background animation ------- */
function BackgroundFX() {
  return (
    <>
      {/* base gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,#7d9dd2_12%,transparent_60%),radial-gradient(1000px_600px_at_90%_-10%,#3fc3b1_12%,transparent_60%)] opacity-30" />

      {/* soft moving blobs */}
      <div className="pointer-events-none absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-[#7d9dd2]/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#3fc3b1]/25 blur-3xl animate-float-slower" />

      {/* rotating conic sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
        <div className="absolute left-1/2 top-1/2 h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(125,157,210,0.25),transparent_30%,rgba(63,195,177,0.25),transparent_70%)] animate-rotate-slower" />
      </div>

      {/* subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />

      {/* animated vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,transparent,rgba(0,0,0,0.65))]" />
    </>
  );
}

/* ------- tiny inline icons ------- */
function Eye({ open }) {
  return open ? (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2.3 12S5.5 5 12 5s9.7 7 9.7 7-3.2 7-9.7 7S2.3 12 2.3 12Z" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3l18 18" />
      <path d="M9.9 5.2A9.8 9.8 0 0 1 12 5c6.5 0 9.7 7 9.7 7a16 16 0 0 1-3.1 4.4M6.1 6.3A16 16 0 0 0 2.3 12S5.5 19 12 19c1.3 0 2.5-.2 3.6-.6" />
      <path d="M9.1 9.1A3.5 3.5 0 0 0 12 15.5c.5 0 .9-.1 1.3-.3" />
    </svg>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12.24 10.285v3.59h5.953c-.26 1.52-1.795 4.457-5.953 4.457-3.586 0-6.516-2.97-6.516-6.629s2.93-6.63 6.516-6.63c2.045 0 3.418.87 4.203 1.62l2.86-2.76C17.5 2.31 15.12 1.2 12.24 1.2 6.99 1.2 2.7 5.49 2.7 10.703c0 5.213 4.29 9.503 9.54 9.503 5.51 0 9.15-3.867 9.15-9.32 0-.63-.07-1.11-.16-1.6H12.24z"
        fill="#4285F4"
      />
    </svg>
  );
}
