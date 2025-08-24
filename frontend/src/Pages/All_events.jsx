
// src/pages/MyEvents.jsx
import React from "react";
import { motion } from "motion/react" // or: import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const SAMPLE_EVENTS = [
  {
    id: "e-101",
    name: "HackFest 2025",
    university: "North South University",
    club: "NSU ACM",
    date: "2025-10-12",
    status: "Registered",
    cover:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "e-102",
    name: "AI Bootcamp",
    university: "BRAC University",
    club: "AI Society",
    date: "2025-06-28",
    status: "Completed",
    cover:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "e-103",
    name: "Frontend Fiesta",
    university: "Dhaka University",
    club: "DU Dev Circle",
    date: "2025-09-05",
    status: "Ongoing",
    cover:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "e-104",
    name: "DevOps Day",
    university: "IUT",
    club: "IUT Programming Club",
    date: "2025-08-30",
    status: "Registered",
    cover:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "e-105",
    name: "UI Marathon",
    university: "BRAC University",
    club: "Design Guild",
    date: "2025-11-21",
    status: "Planned",
    cover:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function All_events({ initialEvents, className }) {
  // choose data: prop or fallback
  const events = React.useMemo(
    () => (Array.isArray(initialEvents) && initialEvents.length ? initialEvents : SAMPLE_EVENTS),
    [initialEvents]
  );

  const [query, setQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter((e) => {
      return (
        e.name.toLowerCase().includes(q) ||
        (e.university || "").toLowerCase().includes(q) ||
        (e.club || "").toLowerCase().includes(q)
      );
    });
  }, [query, events]);

  // Debug logs
  React.useEffect(() => {
    console.log("Events data:", events);
    console.log("Filtered events:", filtered);
    console.log("Motion import:", motion);
  }, [events, filtered]);

  return (
    <div className="min-h-dvh bg-transparent">
      {/* page container */}
      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl bg-transparent p-4 md:p-8",
          className
        )}
      >
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">My Events</h1>
            <p className="text-sm text-white/60">Search by event, university, or club.</p>
          </div>

          {/* Search */}
          <div className="w-full sm:w-96">
            <label className="sr-only">Search</label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events, universities, clubs…"
                className={cn(
                  "w-full rounded-xl bg-white/5 px-10 py-2.5 text-sm text-white",
                  "placeholder-white/50 outline-none ring-1 ring-white/10",
                  "focus:ring-2 focus:ring-[#7d9dd2]/40"
                )}
              />
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-white/70 hover:bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((ev) => (
              <motion.article
                key={ev.id}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className={cn(
                  "group/isolate isolate overflow-hidden rounded-2xl border border-white/10 bg-white/5",
                  "hover:bg-white/10 transition-colors"
                )}
              >
                {/* Cover */}
                <div className="relative">
                  <img
                    src={ev.cover}
                    alt={ev.name}
                    className="h-40 w-full object-cover bg-neutral-900"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-1 text-xs text-white ring-1 ring-white/10">
                    {formatDate(ev.date)}
                  </div>
                </div>

                {/* Body */}
                <div className="relative z-[1] flex flex-col gap-2 p-4">
                  <h3 className="truncate text-base font-semibold text-white">{ev.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
                    <span className="rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
                      {ev.university}
                    </span>
                    <span className="rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
                      {ev.club}
                    </span>
                    <span className="ml-auto rounded-full bg-[#5fc3b1]/20 px-2 py-1 text-xs text-[#5fc3b1] ring-1 ring-[#5fc3b1]/30">
                      {ev.status}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <button className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/10 hover:bg-white/15">
                      View
                    </button>
                    <button className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/10 hover:bg-white/15">
                      Manage
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/70">
            No events found. Try a different search.
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}
