import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Ticket,
  Users,
  X,
  MessageCircle,
} from "lucide-react";

const questions = [
  [
    "How do I create an event?",
    "Sign up as an organizer. After a Super Admin approves your club account, open Create Event in your organizer dashboard. Add a title, date, location, category, capacity, and banner.",
  ],
  [
    "How do I register?",
    "Create a student account, open an upcoming event, and choose Register for event. Your registration appears in My Events. You can unregister before the event starts.",
  ],
  [
    "Where is my certificate?",
    "After an event has taken place, open its details from My Events and choose Download certificate. Certificates are available only to registered students.",
  ],
  [
    "Which roles are supported?",
    "Students discover and register for events. Approved organizers manage their own events and attendees. Super Admins review organizer applications.",
  ],
  [
    "Are there paid tickets?",
    "Eventify currently manages free event registrations. It does not process payments or issue refunds.",
  ],
  [
    "Can I follow a club?",
    "The Clubs page shows approved organizer profiles and links to their upcoming events. Club membership and following are not currently managed inside Eventify.",
  ],
];

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Welcome to Eventify. Ask about events, registrations, certificates, or organizer accounts.",
      from: "bot",
    },
  ]);
  const dialog = useRef(null);
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetch("/api/events")
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load events.");
        return response.json();
      })
      .then((data) => {
        if (active) setEvents(Array.isArray(data) ? data : []);
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
  }, [attempt]);
  useEffect(() => {
    if (chatOpen && !dialog.current.open) dialog.current.showModal();
    else if (!chatOpen && dialog.current.open) dialog.current.close();
  }, [chatOpen]);
  const ask = (text) => {
    if (!text.trim()) return;
    const value = text.toLowerCase();
    const answer = /certificat/.test(value)
      ? questions[2][1]
      : /creat|organi/.test(value)
        ? questions[0][1]
        : /register|join|sign up/.test(value)
          ? questions[1][1]
          : /role|admin/.test(value)
            ? questions[3][1]
            : /ticket|pay|refund/.test(value)
              ? questions[4][1]
              : /club|follow/.test(value)
                ? questions[5][1]
                : "Try asking about creating events, registering, certificates, or roles. Browse Events to see what is coming up.";
    setMessages((previous) => [
      ...previous,
      { text, from: "user" },
      { text: answer, from: "bot" },
    ]);
    setInput("");
  };
  return (
    <Layout>
      <main className="bg-[#0b0d12] text-white">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div>
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-lime-200">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-300" /> Campus
              life, connected.
            </p>
            <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-.06em] sm:text-7xl">
              Find your people.
              <br />
              <span className="text-lime-200">Make your moment.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-slate-400">
              The workshop that sparks an idea. The competition that pushes you
              further. Your next campus experience starts here.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/events"
                className="inline-flex items-center gap-7 rounded-full bg-lime-200 px-6 py-3.5 text-sm font-semibold text-slate-950 hover:bg-lime-100"
              >
                Discover events <ArrowUpRight size={17} />
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-white/20 px-6 py-3.5 text-sm hover:bg-white/5"
              >
                Bring your club along
              </Link>
            </div>
            <p className="mt-9 text-xs text-slate-500">
              FOR THE CURIOUS · THE CREATORS · THE COMMUNITY
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#151923] p-7 sm:p-10">
            <div className="mb-10 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[.2em] text-slate-400">
                On your horizon
              </span>
              <CalendarDays className="text-lime-200" size={23} />
            </div>
            <h2 className="mb-7 text-3xl font-medium tracking-tight">
              Something good
              <br />
              is coming up.
            </h2>
            {events.slice(0, 3).map((event, index) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="group flex items-center gap-4 border-t border-white/10 py-5"
              >
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-sm font-semibold ${index % 2 ? "bg-violet-300/15 text-violet-200" : "bg-lime-200/15 text-lime-200"}`}
                >
                  {new Date(event.date).getDate()}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold group-hover:text-lime-200">
                    {event.title}
                  </h3>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {event.category} · {event.location}
                  </p>
                </div>
                <ArrowUpRight size={17} className="text-slate-500" />
              </Link>
            ))}
            {!events.length && (
              <div className="space-y-4 border-t border-white/10 pt-6 text-sm text-slate-400">
                {loading ? (
                  <p role="status">
                    Finding upcoming events… The server may take a moment to
                    wake up.
                  </p>
                ) : error ? (
                  <>
                    <p role="alert">{error}</p>
                    <button
                      onClick={() => setAttempt((value) => value + 1)}
                      className="text-lime-200"
                    >
                      Try again ↗
                    </button>
                  </>
                ) : (
                  <>
                    <p>The calendar is ready for your next big idea.</p>
                    <Link className="text-lime-200" to="/signup">
                      Become an organizer ↗
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
        <div className="border-y border-white/10">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-5 px-6 py-6 text-xs font-medium uppercase tracking-[.14em] text-slate-400">
            {[
              "Workshops",
              "Hackathons",
              "Cultural fests",
              "Sports",
              "Community",
            ].map((name) => (
              <span key={name}>✳ {name}</span>
            ))}
          </div>
        </div>
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[.2em] text-lime-200">
                Your next plan
              </p>
              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
                Step out. Get involved.
              </h2>
            </div>
            <Link
              to="/events"
              className="text-sm text-slate-400 hover:text-white"
            >
              See the full calendar ↗
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((event) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[.025]"
              >
                {event.imageUrl ? (
                  <img
                    src={event.imageUrl}
                    alt=""
                    loading="lazy"
                    className="aspect-video w-full object-cover transition group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="grid aspect-video place-items-center bg-violet-300/10">
                    <CalendarDays size={50} className="text-violet-200/50" />
                  </div>
                )}
                <div className="p-6">
                  <p className="mb-3 text-[10px] uppercase tracking-[.16em] text-lime-200">
                    {event.category}
                  </p>
                  <h3 className="text-xl font-medium tracking-tight">
                    {event.title}
                  </h3>
                  <p className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <MapPin size={13} />
                    {event.location}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    {new Date(event.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "Asia/Dhaka",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {!loading && !error && !events.length && (
            <p className="rounded-xl border border-dashed border-white/15 p-8 text-slate-400">
              No upcoming events yet. Check back soon, or start something with
              your club.
            </p>
          )}
        </section>
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="rounded-3xl bg-lime-200 p-8 text-slate-950 sm:p-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em]">
              Less organising. More happening.
            </p>
            <h2 className="max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
              A home for every club.
              <br />A place for every student.
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                [
                  CalendarDays,
                  "Create a moment",
                  "Publish your event with a date, place, and capacity.",
                ],
                [
                  Users,
                  "Bring people together",
                  "Keep registrations and attendees in one place.",
                ],
                [
                  Ticket,
                  "Remember the experience",
                  "Download participation certificates after the event.",
                ],
              ].map(([Icon, title, copy]) => (
                <div key={title}>
                  <Icon size={25} />
                  <h3 className="mb-2 mt-4 font-semibold">{title}</h3>
                  <p className="text-sm leading-6 text-slate-700">{copy}</p>
                </div>
              ))}
            </div>
            <Link
              to="/club"
              className="mt-9 inline-flex items-center gap-3 border-b border-slate-900 pb-1 text-sm font-semibold"
            >
              Explore university clubs <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
        <button
          onClick={() => setChatOpen(true)}
          aria-label="Open Eventify help"
          className="fixed bottom-6 right-6 z-50 rounded-full bg-lime-200 p-4 text-slate-950 shadow-xl"
        >
          <MessageCircle />
        </button>
        <dialog
          ref={dialog}
          onCancel={() => setChatOpen(false)}
          aria-labelledby="eventify-help-title"
          className="fixed inset-0 m-auto w-[min(480px,94vw)] rounded-2xl border border-white/15 bg-[#151923] p-0 text-white backdrop:bg-black/70"
        >
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <h2 id="eventify-help-title" className="font-semibold">
              Eventify help
            </h2>
            <button onClick={() => setChatOpen(false)} aria-label="Close help">
              <X size={20} />
            </button>
          </div>
          <div
            role="log"
            aria-live="polite"
            className="max-h-[45vh] space-y-3 overflow-y-auto p-5"
          >
            {messages.map((message, index) => (
              <p
                key={index}
                className={`rounded-xl p-3 text-sm leading-6 ${message.from === "user" ? "ml-8 bg-lime-200/10 text-lime-100" : "mr-5 bg-white/5 text-slate-300"}`}
              >
                {message.text}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 px-5 pb-4">
            {questions.slice(0, 3).map(([question]) => (
              <button
                key={question}
                onClick={() => ask(question)}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-300"
              >
                {question}
              </button>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              ask(input);
            }}
            className="flex gap-2 border-t border-white/10 p-4"
          >
            <input
              aria-label="Your question"
              value={input}
              maxLength={1000}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Eventify…"
              className="min-w-0 flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm"
            />
            <button
              disabled={!input.trim()}
              className="rounded-lg bg-lime-200 px-4 text-sm text-slate-950"
            >
              Send
            </button>
          </form>
        </dialog>
      </main>
    </Layout>
  );
}
