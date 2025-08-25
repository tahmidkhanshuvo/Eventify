"use client";

import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function AllEvents({ className }) {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch events.");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError("Error fetching events: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter((e) => {
      const by = e?.createdBy || {};
      return [
        e?.title,
        e?.location,
        e?.category,
        by?.clubName,
        by?.username,
      ]
        .map((v) => (v || "").toLowerCase())
        .some((v) => v.includes(q));
    });
  }, [query, events]);

  return (
    <div className="min-h-dvh bg-transparent">
      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl bg-transparent p-4 md:p-8",
          className
        )}
      >
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">All Events</h1>
            <p className="text-sm text-white/60">Search by title, category, location, or organizer.</p>
          </div>

          {/* Search */}
          <div className="w-full sm:w-96">
            <label className="sr-only">Search</label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events…"
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

        {/* Events */}
        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/70">
            Loading events...
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-white/70">
            {error}
          </div>
        ) : filtered.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((ev) => (
              <motion.article
                key={ev._id}
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
                    src={ev.imageUrl || "https://placehold.co/800x450?text=Event"}
                    alt={ev.title}
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
                  <h3 className="truncate text-base font-semibold text-white">{ev.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
                    {ev.category && (
                      <span className="rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
                        {ev.category}
                      </span>
                    )}
                    {ev.location && (
                      <span className="rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
                        {ev.location}
                      </span>
                    )}
                    {(ev?.createdBy?.clubName || ev?.createdBy?.username) && (
                      <span className="rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
                        {ev?.createdBy?.clubName || ev?.createdBy?.username}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <Link
                      to={`/events/${ev._id}`}
                      className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/10 hover:bg-white/15"
                    >
                      View
                    </Link>
                    {/* Manage button removed as requested */}
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
