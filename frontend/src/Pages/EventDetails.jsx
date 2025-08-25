"use client";

import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function EventDetails({ className }) {
  const { id } = useParams();
  const [event, setEvent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let abort = false;
    (async () => {
      try {
        const res = await fetch(`/api/events/${id}`, {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch event.");
        const data = await res.json();
        if (!abort) setEvent(data);
      } catch (err) {
        if (!abort) setError(err.message || "Something went wrong.");
      } finally {
        if (!abort) setLoading(false);
      }
    })();
    return () => {
      abort = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-white/70">
        Loading…
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-white/70">
        {error || "Event not found."}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative z-10 mx-auto w-full max-w-5xl p-4 md:p-8",
        className
      )}
    >
      {/* Hero */}
      <div className="mb-6 overflow-hidden rounded-2xl ring-1 ring-white/10">
        <img
          src={event.imageUrl || "https://placehold.co/1200x675?text=Event"}
          alt={event.title}
          className="h-[260px] w-full object-cover sm:h-[360px]"
        />
      </div>

      {/* Title + Meta */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold text-white">{event.title}</h1>

        <Link
          to="/events"
          className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/10 hover:bg-white/15"
        >
          All Events
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 text-sm">
        {event.category && (
          <span className="rounded-full bg-white/5 px-3 py-1 text-white ring-1 ring-white/10">
            {event.category}
          </span>
        )}
        {event.location && (
          <span className="rounded-full bg-white/5 px-3 py-1 text-white ring-1 ring-white/10">
            {event.location}
          </span>
        )}
        <span className="rounded-full bg-white/5 px-3 py-1 text-white ring-1 ring-white/10">
          {formatDateTime(event.date)}
        </span>
        {(event?.createdBy?.clubName || event?.createdBy?.username) && (
          <span className="rounded-full bg-white/5 px-3 py-1 text-white ring-1 ring-white/10">
            {event?.createdBy?.clubName || event?.createdBy?.username}
          </span>
        )}
      </div>

      {/* Description card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 text-white/90"
      >
        <h2 className="mb-2 text-lg font-semibold text-white">About this event</h2>
        <p className="whitespace-pre-line text-sm leading-6 text-white/80">
          {event.description || "No description provided."}
        </p>
      </motion.div>
    </div>
  );
}

function formatDateTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
