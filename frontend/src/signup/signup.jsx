"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState("student"); // "student" | "organizer"

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
    <main
      className="relative min-h-screen overflow-hidden bg-neutral-950 text-white font-medium"
      style={{ fontFamily: "Sora, ui-sans-serif, system-ui" }}
    >
      <Layout>
        <BackgroundFX />

        <section className="relative z-10 mx-auto flex min-h-screen w-[min(680px,92%)] items-center justify-center py-12">
          <div className="w-full">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10">
              <header className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7d9dd2] to-[#3fc3b1] bg-clip-text text-transparent">
                  Join Eventify Today
                </h1>
                <br />
                <p className="text-white/80 text-sm mt-3">
                  Where Students and Club Members Connect, Learn & Grow
                </p>
              </header>

              {/* Toggle */}
              <div className="mb-6 flex items-center justify-center">
                <div className="inline-flex rounded-2xl bg-white/10 p-1 backdrop-blur-md border border-white/10">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      role === "student"
                        ? "bg-white text-black"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("organizer")}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      role === "organizer"
                        ? "bg-white text-black"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Organizer
                  </button>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="role" value={role} />

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white/85">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Alex Johnson"
                    required
                    className="h-12"
                  />
                </div>

                {/* Email + Username */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/85">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white/85">
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="eventify_user"
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                {/* Phone + (Student ID | Club Name) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white/85">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+8801XXXXXXXXX"
                      required
                      className="h-12"
                    />
                  </div>
                  {role === "student" ? (
                    <div className="space-y-2">
                      <Label htmlFor="studentId" className="text-white/85">
                        Student ID
                      </Label>
                      <Input
                        id="studentId"
                        name="studentId"
                        placeholder="2025-00000"
                        required
                        className="h-12"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="clubName" className="text-white/85">
                        Club Name
                      </Label>
                      <Input
                        id="clubName"
                        name="clubName"
                        placeholder="e.g., Robotics Club"
                        required
                        className="h-12"
                      />
                    </div>
                  )}
                </div>

                {/* (Department | Club Post) + City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {role === "student" ? (
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-white/85">
                        Department
                      </Label>
                      <select
                        id="department"
                        name="department"
                        required
                        className="h-12 w-full rounded-md bg-white/90 text-gray-900 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#3fc3b1]"
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
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="clubPost" className="text-white/85">
                        Club Post
                      </Label>
                      <Input
                        id="clubPost"
                        name="clubPost"
                        placeholder="e.g., President / Coordinator"
                        required
                        className="h-12"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-white/85">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Dhaka"
                      required
                      className="h-12"
                    />
                  </div>
                </div>

                {/* Year + University OR Wide University */}
                {role === "student" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-white/85">
                        Year
                      </Label>
                      <select
                        id="year"
                        name="year"
                        required
                        className="h-12 w-full rounded-md bg-white/90 text-gray-900 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#3fc3b1]"
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
                      <Label htmlFor="university" className="text-white/85">
                        University Name
                      </Label>
                      <Input
                        id="university"
                        name="university"
                        placeholder="e.g., Daffodil International University"
                        required
                        className="h-12"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 w-full md:w-[95%] mx-auto">
                    <Label htmlFor="university" className="text-white/85">
                      University Name
                    </Label>
                    <Input
                      id="university"
                      name="university"
                      placeholder="e.g., Daffodil International University"
                      required
                      className="h-12"
                    />
                  </div>
                )}

                {/* Passwords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/85">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        required
                        className="h-12 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-white/80 hover:bg-white/10"
                      >
                        <Eye open={showPassword} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm" className="text-white/85">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirm"
                        name="confirm"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-type password"
                        required
                        className="h-12 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 text-white/80 hover:bg-white/10"
                      >
                        <Eye open={showConfirm} />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full select-none rounded-xl bg-gradient-to-r from-[#3fc3b1] to-[#7d9dd2] text-white font-semibold h-12 transition-all hover:-translate-y-0.5 shadow-[0_0_22px_rgba(63,195,177,0.45)] hover:shadow-[0_0_34px_rgba(63,195,177,0.6)] mt-6"
                >
                  Create account
                </button>
              </form>
            </div>
            <p className="mt-20 text-center text-xl text-white/60">
              Join us today.
            </p>
          </div>
        </section>
      </Layout>
    </main>
  );
}

/* --- BackgroundFX --- */
function BackgroundFX() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,#7d9dd2_12%,transparent_60%),radial-gradient(1000px_600px_at_90%_-10%,#3fc3b1_12%,transparent_60%)] opacity-30" />
      <div className="pointer-events-none absolute -top-44 -left-36 h-[40rem] w-[40rem] rounded-full bg-[#7d9dd2]/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -top-32 -right-40 h-[34rem] w-[34rem] rounded-full bg-[#3fc3b1]/25 blur-3xl animate-float-slower" />
    </>
  );
}

/* --- Eye --- */
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
