// src/pages/ManageEvent.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function ManageEvent({ className }) {
  const { id } = useParams();
  const [event, setEvent] = React.useState(null);
  const [attendees, setAttendees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("details"); // details, attendees

  React.useEffect(() => {
    let abort = false;

    async function fetchData() {
      try {
        // Fetch event details
        const eventRes = await fetch(`/api/events/${id}`, {
          credentials: "include",
        });
        if (!eventRes.ok) throw new Error("Failed to fetch event");
        const eventData = await eventRes.json();
        if (!abort) setEvent(eventData);

        // Fetch attendees
        const attendeesRes = await fetch(`/api/events/${id}/attendees`, {
          credentials: "include",
        });
        if (attendeesRes.ok) {
          const attendeesData = await attendeesRes.json();
          if (!abort) setAttendees(attendeesData);
        }
      } catch (err) {
        if (!abort) setError(err.message || "Something went wrong.");
      } finally {
        if (!abort) setLoading(false);
      }
    }

    fetchData();
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
        className,
      )}
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Manage: {event.title}
          </h1>
          <p className="text-sm text-white/60">Event management dashboard</p>
        </div>
        <Link
          to="/organizers/myevents"
          className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/10 hover:bg-white/15"
        >
          ← Back to My Events
        </Link>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab("details")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            activeTab === "details"
              ? "text-white border-b-2 border-white"
              : "text-white/60 hover:text-white",
          )}
        >
          Event Details
        </button>
        <button
          onClick={() => setActiveTab("attendees")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            activeTab === "attendees"
              ? "text-white border-b-2 border-white"
              : "text-white/60 hover:text-white",
          )}
        >
          Attendees ({attendees.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "details" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <div className="mb-6 overflow-hidden rounded-xl">
            <img
              src={event.imageUrl || "https://placehold.co/1200x675?text=Event"}
              alt={event.title}
              className="h-64 w-full object-cover"
            />
          </div>

          <h2 className="mb-2 text-xl font-semibold text-white">
            {event.title}
          </h2>

          <div className="mb-4 flex flex-wrap gap-2 text-sm">
            {event.category && (
              <span className="rounded-full bg-white/5 px-3 py-1 text-white ring-1 ring-white/10">
                {event.category}
              </span>
            )}
            {event.location && (
              <span className="rounded-full bg-white/5 px-3 py-1 text-white ring-1 ring-white/10">
                📍 {event.location}
              </span>
            )}
            <span className="rounded-full bg-white/5 px-3 py-1 text-white ring-1 ring-white/10">
              📅 {formatDateTime(event.date)}
            </span>
          </div>

          <p className="whitespace-pre-line text-sm leading-6 text-white/80">
            {event.description || "No description provided."}
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              to={`/organizers/edit-event/${event._id}`}
              className="rounded-lg bg-[#7d9dd2] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6d8dc2]"
            >
              Edit Event
            </Link>
          </div>
        </motion.div>
      )}

      {activeTab === "attendees" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-white">
            Registered Attendees ({attendees.length})
          </h2>

          {attendees.length === 0 ? (
            <div className="py-8 text-center text-white/60">
              No attendees registered yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white">
                <thead>
                  <tr className="border-b border-white/10 text-left text-white/60">
                    <th className="pb-2 font-medium">Username</th>
                    <th className="pb-2 font-medium">Email</th>
                    <th className="pb-2 font-medium">University</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((user) => (
                    <tr key={user._id} className="border-b border-white/5">
                      <td className="py-3">{user.username}</td>
                      <td className="py-3">{user.email}</td>
                      <td className="py-3">{user.university || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}
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
