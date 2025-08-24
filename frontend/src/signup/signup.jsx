"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const pwd = form.get("password");
    const confirm = form.get("confirm");
    if (pwd !== confirm) {
      alert("Passwords do not match.");
      return;
    }
    // Handle signup
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <BackgroundFX />

      <section className="relative z-10 mx-auto flex min-h-screen w-[min(760px,94%)] items-center justify-center py-12">
        <div className="w-full">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            <header className="mb-6">
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#7d9dd2] to-[#3fc3b1] bg-clip-text text-transparent">
                Create your Eventify account
              </h1>
              <p className="text-white/70 text-sm mt-1">
                Fill in the details below to get started.
              </p>
            </header>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white/85">
                  Full Name
                </Label>
                <Input id="fullName" name="fullName" placeholder="Alex Johnson" required />
              </div>

              {/* Email, Username */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/85">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-white/85">Username</Label>
                  <Input id="username" name="username" placeholder="eventify_user" required />
                </div>
              </div>

              {/* Phone, Student ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/85">Phone</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+8801XXXXXXXXX" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-white/85">Student ID</Label>
                  <Input id="studentId" name="studentId" placeholder="2025-00000" required />
                </div>
              </div>

              {/* Department, City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-white/85">Department</Label>
                  <select
                    id="department"
                    name="department"
                    required
                    className="h-11 w-full rounded-md bg-white/90 text-gray-900 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#3fc3b1]"
                  >
                    <option value="">Select department</option>
                    <option>CSE</option>
                    <option>EEE</option>
                    <option>ECE</option>
                    <option>BBA</option>
                    <option>Architecture</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white/85">City</Label>
                  <Input id="city" name="city" placeholder="Dhaka" required />
                </div>
              </div>

              {/* Year, Semester */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-white/85">Year</Label>
                  <select
                    id="year"
                    name="year"
                    required
                    className="h-11 w-full rounded-md bg-white/90 text-gray-900 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#3fc3b1]"
                  >
                    <option value="">Select year</option>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>Masters</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester" className="text-white/85">Semester</Label>
                  <select
                    id="semester"
                    name="semester"
                    required
                    className="h-11 w-full rounded-md bg-white/90 text-gray-900 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#3fc3b1]"
                  >
                    <option value="">Select semester</option>
                    <option>Spring</option>
                    <option>Summer</option>
                    <option>Fall</option>
                  </select>
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/85">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-white/80 hover:bg-white/10"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <Eye open={showPassword} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm" className="text-white/85">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="confirm"
                      name="confirm"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-type password"
                      className="pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-white/80 hover:bg-white/10"
                      aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                    >
                      <Eye open={showConfirm} />
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full select-none rounded-xl bg-gradient-to-r from-[#3fc3b1] to-[#7d9dd2] text-white font-semibold h-11 transition-all hover:-translate-y-0.5 shadow-[0_0_22px_rgba(63,195,177,0.45)] hover:shadow-[0_0_34px_rgba(63,195,177,0.6)]"
              >
                Create account
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-white/60">
            © {new Date().getFullYear()} Eventify. All rights reserved.
          </p>
        </div>
      </section>
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
      <div className="pointer-events-none absolute -top-44 -left-36 h-[40rem] w-[40rem] rounded-full bg-[#7d9dd2]/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -top-32 -right-40 h-[34rem] w-[34rem] rounded-full bg-[#3fc3b1]/25 blur-3xl animate-float-slower" />

      {/* rotating conic sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
        <div className="absolute left-1/2 top-1/2 h-[180vmax] w-[180vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(125,157,210,0.25),transparent_30%,rgba(63,195,177,0.25),transparent_70%)] animate-rotate-slower" />
      </div>

      {/* subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />

      {/* animated vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,transparent,rgba(0,0,0,0.65))]" />

      <style jsx global>{`
        @keyframes float-slow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(22px, -12px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float-slower {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-18px, 10px) scale(1.07); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes rotate-slower {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-float-slow { animation: float-slow 16s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 26s ease-in-out infinite; }
        .animate-rotate-slower { animation: rotate-slower 40s linear infinite; }
      `}</style>
    </>
  );
}

/* ------- tiny inline icon ------- */
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
