import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, MapPin, Users, ArrowLeft } from "lucide-react";

export async function downloadCertificate(event) {
  const response = await fetch(`/api/certificates/event/${event._id}`);
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Unable to download certificate.");
  }
  const url = URL.createObjectURL(await response.blob());
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `Certificate-${event.title.replace(/[^a-z0-9_-]/gi, "-")}.pdf`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {}
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetch(`/api/events/${id}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Event not found.");
        return data;
      })
      .then((data) => {
        if (active) setEvent(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    if (user?.role === "Student")
      fetch("/api/registrations/my-events")
        .then((response) => (response.ok ? response.json() : []))
        .then((events) => {
          if (active) setRegistered(events.some((item) => item._id === id));
        })
        .catch(() => {});
    return () => {
      active = false;
    };
  }, [id]);
  const mutate = async () => {
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`/api/events/${id}/register`, {
        method: registered ? "DELETE" : "POST",
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Unable to update registration.");
      setRegistered(!registered);
      setMessage(data.message);
      setEvent((previous) => ({
        ...previous,
        registrationCount: Math.max(
          0,
          (previous.registrationCount || 0) + (registered ? -1 : 1),
        ),
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  const certificate = async () => {
    setBusy(true);
    setError("");
    try {
      await downloadCertificate(event);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };
  if (loading)
    return (
      <div role="status" className="mx-auto max-w-6xl p-10 text-slate-400">
        Loading event…
      </div>
    );
  if (!event)
    return (
      <div className="mx-auto max-w-6xl p-10 text-white">
        <p role="alert">{error || "Event not found."}</p>
        <Link to="/events" className="mt-4 inline-block text-lime-200">
          Back to events
        </Link>
      </div>
    );
  const ended = new Date(event.date) <= new Date();
  const full =
    event.capacity != null && event.registrationCount >= event.capacity;
  const owner =
    user &&
    (String(event.createdBy?._id) === String(user._id || user.id) ||
      user.role === "Super Admin");
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 text-white">
      <Link
        to="/events"
        className="mb-7 inline-flex items-center gap-2 text-sm text-slate-400"
      >
        <ArrowLeft size={16} />
        Back to events
      </Link>
      <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-violet-300/10">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="max-h-[420px] w-full object-cover"
          />
        ) : (
          <div className="grid h-48 place-items-center">
            <CalendarDays size={50} className="text-violet-200" />
          </div>
        )}
      </div>
      <div className="grid gap-8 md:grid-cols-[1fr_320px]">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[.2em] text-lime-200">
            {event.category}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            {event.title}
          </h1>
          <p className="mt-5 text-sm text-slate-400">
            Organised by{" "}
            {event.createdBy?.clubName ||
              event.createdBy?.username ||
              "a campus organizer"}
          </p>
          <section className="mt-10 border-t border-white/10 pt-7">
            <h2 className="mb-4 text-xl font-semibold">About this event</h2>
            <p className="whitespace-pre-line text-sm leading-7 text-slate-300">
              {event.description}
            </p>
          </section>
        </div>
        <aside className="self-start rounded-2xl border border-white/10 bg-white/[.04] p-6">
          <p className="mb-6 text-lg font-semibold">
            {ended ? "Event completed" : "Make it a date"}
          </p>
          <p className="mb-4 flex gap-3 text-sm text-slate-300">
            <CalendarDays size={19} className="shrink-0 text-lime-200" />
            {new Date(event.date).toLocaleString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Dhaka",
            })}{" "}
            (Dhaka)
          </p>
          <p className="mb-4 flex gap-3 text-sm text-slate-300">
            <MapPin size={19} className="shrink-0 text-lime-200" />
            {event.location}
          </p>
          <p className="mb-7 flex gap-3 text-sm text-slate-300">
            <Users size={19} className="shrink-0 text-lime-200" />
            {event.capacity == null
              ? "Open registration"
              : `${event.registrationCount || 0} / ${event.capacity} places filled`}
          </p>
          {user?.role === "Student" ? (
            <>
              {registered && (
                <p className="mb-4 text-sm text-lime-200">
                  ✓ You’re registered
                </p>
              )}
              {!ended && (
                <button
                  onClick={mutate}
                  disabled={busy || (!registered && full)}
                  className="w-full rounded-full bg-lime-200 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50"
                >
                  {busy
                    ? "Please wait…"
                    : registered
                      ? "Cancel registration"
                      : full
                        ? "Event is full"
                        : "Register for event"}
                </button>
              )}
              {ended && registered && (
                <button
                  onClick={certificate}
                  disabled={busy}
                  className="w-full rounded-full bg-lime-200 px-5 py-3 text-sm font-semibold text-slate-950"
                >
                  {busy ? "Preparing…" : "Download certificate"}
                </button>
              )}
            </>
          ) : !user && !ended ? (
            <Link
              to="/login"
              className="block rounded-full bg-lime-200 px-5 py-3 text-center text-sm font-semibold text-slate-950"
            >
              Sign in to register
            </Link>
          ) : null}
          {owner && (
            <Link
              to={`/organizers/manage-event/${event._id}`}
              className="mt-4 block text-sm text-lime-200"
            >
              Manage event ↗
            </Link>
          )}
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-300">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="mt-4 text-sm text-lime-200">
              {message}
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}
