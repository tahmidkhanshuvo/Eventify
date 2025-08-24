"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/focus-cards";  // Assuming you have FocusCards component from before.
import Layout from "@/components/Layout";
import { ShieldCheck, BarChart3, Users, CalendarDays, Mic2 } from "lucide-react"; // Using Lucide icons for features.

export default function AboutUs() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <Layout>
        {/* Global background */}
        <BackgroundFX />

        <section className="relative z-10 mx-auto w-[min(1200px,92%)] pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24 md:pb-28">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-indigo-500 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent"
            >
              Welcome to Eventify
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto max-w-2xl text-lg text-white/80"
            >
              Eventify is your one-stop solution for discovering, planning, and managing events in a seamless way.
              We bring together event creators, attendees, and community leaders in a unified space.
            </motion.p>
          </div>

          {/* Features Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Why Choose Eventify?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card
                card={{
                  title: "Role-based Access Control",
                  src: <ShieldCheck className="h-8 w-8 text-teal-500" />,
                  description: "Manage permissions effectively with different roles like Admin, Organizer, and Attendee.",
                }}
              />
              <Card
                card={{
                  title: "Event Analytics",
                  src: <BarChart3 className="h-8 w-8 text-teal-500" />,
                  description: "Get detailed insights on your events' performance, including attendee data and engagement metrics.",
                }}
              />
              <Card
                card={{
                  title: "Community Engagement",
                  src: <Users className="h-8 w-8 text-teal-500" />,
                  description: "Foster collaboration and engagement within your community through meetups, clubs, and events.",
                }}
              />
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Meet The Team</h2>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-2">Team: If_it_works_it_works</h3>
              <p className="text-white/60 text-lg">
                Department: CSE
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Team Member 1: Asifuzzaman Shanto */}
              <div className="bg-neutral-800 p-6 rounded-xl">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Asifuzzaman Shanto"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-white">Asifuzzaman Shanto</h3>
                <p className="text-white/70">ID: 20220204008</p>
              </div>

              {/* Team Member 2: Ma-Huan Sheikh Meem */}
              <div className="bg-neutral-800 p-6 rounded-xl">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Ma-Huan Sheikh Meem"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-white">Ma-Huan Sheikh Meem</h3>
                <p className="text-white/70">ID: 20220204070</p>
              </div>

              {/* Team Member 3: Tahmid Khan */}
              <div className="bg-neutral-800 p-6 rounded-xl">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Tahmid Khan"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-white">Tahmid Khan</h3>
                <p className="text-white/70">ID: 20220204086</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-white mb-6">Get in Touch</h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto max-w-2xl text-lg text-white/80"
            >
              Have questions? Reach out to us and we’d love to help you get started with Eventify today!
            </motion.p>
            <a
              href="mailto:support@eventify.com"
              className="mt-8 inline-block bg-teal-500 px-6 py-3 text-white rounded-lg hover:bg-teal-600 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </section>
      </Layout>
    </main>
  );
}

/* BackgroundFX component */
function BackgroundFX() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,#7d9dd2_12%,transparent_60%),radial-gradient(1000px_600px_at_90%_-10%,#3fc3b1_12%,transparent_60%)] opacity-30" />
      <div className="pointer-events-none absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-[#7d9dd2]/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#3fc3b1]/25 blur-3xl animate-float-slower" />
    </>
  );
}
