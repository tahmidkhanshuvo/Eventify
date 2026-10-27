import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { downloadCertificate } from "./EventDetails";

export default function MyEvents({ mode = "created" }) {
  const [events, setEvents] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [attempt, setAttempt] = React.useState(0);
  const [busy, setBusy] = React.useState("");
  React.useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetch(
      mode === "registered" ? "/api/registrations/my-events" : "/api/events/my",
    )
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Unable to load your events.");
        return data;
      })
      .then((data) => {
        if (active) setEvents(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [mode, attempt]);
  const filtered = events.filter((event) =>
    [event.title, event.location, event.category]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const certificate = async (event) => {
    setBusy(event._id);
    setError("");
    try {
      await downloadCertificate(event);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy("");
    }
  };
  return (
    <main className="mx-auto w-full max-w-6xl p-3 text-white md:p-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[.2em] text-lime-200">
            Your campus calendar
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">My events</h1>
          <p className="mt-3 text-sm text-slate-400">
            {mode === "registered"
              ? "Your registrations, memories, and participation certificates."
              : "Manage your events and keep track of attendees."}
          </p>
        </div>
        <input
          aria-label="Search your events"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search your events…"
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm"
        />
      </div>
      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-300/20 bg-red-300/5 p-5 text-sm text-red-200"
        >
          {error}
          <button
            onClick={() => setAttempt((value) => value + 1)}
            className="ml-4 underline"
          >
            Retry
          </button>
        </div>
      )}
      {loading ? (
        <p role="status" className="p-6 text-slate-400">
          Loading your events…
        </p>
      ) : filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((event) => (
            <article
              key={event._id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.035]"
            >
              {event.imageUrl ? (
                <img
                  loading="lazy"
                  src={event.imageUrl}
                  alt=""
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <div className="grid aspect-video place-items-center bg-violet-300/10">
                  <CalendarDays className="text-violet-200" size={36} />
                </div>
              )}
              <div className="p-5">
                <p className="text-xs text-lime-200">{event.category}</p>
                <h2 className="my-3 text-lg font-medium">{event.title}</h2>
                <p className="text-xs text-slate-400">
                  {new Date(event.date).toLocaleDateString("en-GB", {
                    dateStyle: "long",
                    timeZone: "Asia/Dhaka",
                  })}{" "}
                  · {event.location}
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs">
                  <Link
                    to={
                      mode === "created"
                        ? `/organizers/manage-event/${event._id}`
                        : `/events/${event._id}`
                    }
                    className="text-lime-200"
                  >
                    {mode === "created"
                      ? "Manage event ↗"
                      : "View registration ↗"}
                  </Link>
                  {mode === "registered" &&
                    new Date(event.date) <= new Date() && (
                      <button
                        disabled={busy === event._id}
                        onClick={() => certificate(event)}
                        className="text-violet-200"
                      >
                        {busy === event._id
                          ? "Preparing…"
                          : "Download certificate"}
                      </button>
                    )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-white/15 p-10 text-center text-slate-400">
          <p>
            {query
              ? "No events match your search."
              : mode === "registered"
                ? "Your next experience is waiting. Register for an event to see it here."
                : "You haven’t created any events yet."}
          </p>
          <Link
            className="mt-5 inline-block text-lime-200"
            to={mode === "registered" ? "/events" : "/organizers/create-event"}
          >
            {mode === "registered" ? "Discover events ↗" : "Create an event ↗"}
          </Link>
        </div>
      )}
    </main>
  );
}
