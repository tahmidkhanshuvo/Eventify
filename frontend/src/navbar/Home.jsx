"use client";

import React from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  LockKeyhole,
  BarChart3,
  Bot,
  Users,
  GraduationCap,
  CalendarDays,
  Send,
  X,
  User as UserIcon,
  Sparkles,
} from "lucide-react";

/* --------------------------------
   Home Page
----------------------------------*/
export default function Home() {
  // ✅ ADDED: minimal state to control chatbot visibility
  const [chatOpen, setChatOpen] = React.useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <Layout>
        {/* Global background */}
        <BackgroundFX />

        <section className="relative z-10 mx-auto w-[min(1200px,92%)] pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24 md:pb-28">
          {/* Headline */}
          <div className="text-center">
            <PlainTitle>
              <span className="mt-2 block bg-gradient-to-r from-indigo-300 via-sky-200 to-fuchsia-300 bg-clip-text text-balance text-5xl font-bold text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
                All your club events in one place — Eventify
              </span>{" "}
              <br></br>
            </PlainTitle>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              className="mx-auto mt-5 max-w-2xl text-pretty text-base text-white/70 sm:text-lg"
            >
              <h2 className="mb-6 text-center text-xl font-regular text-white/90 sm:text-3xl">
                Join thousands of students discovering and attending campus events with ease.
              </h2>{" "}
              <br></br>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
              className="mt-8 flex items-center justify-center gap-3"
            >
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-neutral-800 bg-neutral-900 hover:bg-neutral-800"
                onClick={() => (window.location.href = "/events")}
              >
                Explore events
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-neutral-800 bg-neutral-900 hover:bg-neutral-800"
                onClick={() => (window.location.href = "/create")}
              >
                Create an event
              </Button>
            </motion.div>
          </div>

          {/* Radial icon layout */}
          <IconRing />

          {/* Infinite Moving Cards — logos/images */}
          <div className="mt-16">
            <h2 className="mb-6 text-center text-2xl font-semibold text-white/90 sm:text-3xl">
              Associated Clubs
            </h2>
            <InfiniteMovingCards
              items={[
                { src: "https://ik.imagekit.io/qlaegzdb2/Adobe%20Express%20-%20file%20(86).png", alt: "image 1" },
                { src: "https://ik.imagekit.io/qlaegzdb2/Adobe%20Express%20-%20file%20(87).png", alt: "image 2" },
                { src: "https://ik.imagekit.io/qlaegzdb2/271756523_109469641627057_2744856006829852045_n_1_removebg_preview.png", alt: "image 3" },
                { src: "https://ik.imagekit.io/qlaegzdb2/476816991_1031997955634005_5751634906524642340_n_removebg_preview.png", alt: "image 4" },
                { src: "https://ik.imagekit.io/qlaegzdb2/495506446_1085555516933852_7516840257830876744_n_removebg_preview.png", alt: "image 5" },
                { src: "https://ik.imagekit.io/qlaegzdb2/526631485_782085651020538_1352053436245588455_n_removebg_preview.png", alt: "image 6" },
                { src: "https://ik.imagekit.io/qlaegzdb2/austpic%20new%20logo%20(light%20theme)-01%20(1)%20(2).png?updatedAt=1756048907819", alt: "image 7" },
              ]}
              direction="right"
              speed="slow"
              pauseOnHover
            />
          </div>
        </section>

        {/* ✅ ADDED: floating button + chatbot panel (non-intrusive) */}
        <ChatbotFAB onClick={() => setChatOpen(true)} />
        <FAQChatbot open={chatOpen} onClose={() => setChatOpen(false)} />
        {/* ✅ END additions */}

      </Layout>
    </main>
  );
}

/* --------------------------------
   Plain title (no shimmer overlay)
----------------------------------*/
function PlainTitle({ children }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mx-auto max-w-6xl text-white"
    >
      <span className="relative block [text-wrap:balance]">{children}</span>
    </motion.h1>
  );
}

/* --------------------------------
   Icon Ring (solid)
----------------------------------*/
function IconRing() {
  const items = [
    { Icon: ShieldCheck, label: "Role-based Access Control" },
    { Icon: LockKeyhole, label: "Secure login system" },
    { Icon: BarChart3, label: "Event analysis" },
    { Icon: Bot, label: "AI chatbot" },
    { Icon: Users, label: "Student Community" },
    { Icon: GraduationCap, label: "Enrich Co-curricular skills" },
    { Icon: CalendarDays, label: "Smart Scheduling" },
  ];
  const centerImg = "https://ik.imagekit.io/qlaegzdb2/Eventify%20icon-02.png";

  return (
    <div className="relative mx-auto mt-12 aspect-square w-full max-w-[700px]">
      {/* Outer glow ring */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,.15)_0%,transparent_60%)]" />
      <h2 className="mb-6 text-center text-xl font-regular text-white/90 sm:text-3xl"></h2> <br></br>
      {/* Center badge - solid */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 flex h-60 w-60 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={centerImg} alt="Eventify" className="h-full w-full object-contain" loading="lazy" />
      </motion.div>

      {/* Icons around circle */}
      {items.map(({ Icon, label }, i) => {
        const angle = (i / items.length) * Math.PI * 2;
        const radius = 250;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const delay = 0.05 * i + 0.45;
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x, y }}
            transition={{ delay, type: "spring", stiffness: 120, damping: 12 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-3">
                <Icon className="h-7 w-7" />
              </div>
              <span className="text-xs text-white/70">{label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* --------------------------------
   Infinite Moving Cards (images)
   — JS/JSX version adapted from Aceternity UI
----------------------------------*/
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = React.useState(false);

  React.useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  function getDirection() {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--animation-direction", direction === "left" ? "forwards" : "reverse");
  }
  function getSpeed() {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--animation-duration", speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s");
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 mx-auto max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li key={idx} className="relative w-[220px] max-w-full shrink-0 rounded-2xl border border-neutral-800 bg-neutral-900/80 px-4 py-4">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt || `image-${idx + 1}`} className="h-full w-full object-contain" loading="lazy" />
            </div>
          </li>
        ))}
      </ul>

      {/* keyframes & animation setup */}
      <style jsx>{`
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) linear infinite;
          animation-direction: var(--animation-direction, forwards);
        }
        @keyframes scroll {
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

function BackgroundFX() {
  return (
    <>
      {/* base gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,#7d9dd2_12%,transparent_60%),radial-gradient(1000px_600px_at_90%_-10%,#3fc3b1_12%,transparent_60%)] opacity-30" />

      {/* soft moving blobs */}
      <div className="pointer-events-none absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-[#7d9dd2]/25 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#3fc3b1]/25 blur-3xl animate-float-slower" />

      {/* rotating conic sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
        <div className="absolute left-1/2 top-1/2 h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(125,157,210,0.25),transparent_30%,rgba(63,195,177,0.25),transparent_70%)] animate-rotate-slower" />
      </div>

      {/* subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-screen [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px)] [background-size:36px_36px]" />

      {/* animated vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,transparent,rgba(0,0,0,0.65))]" />

      <style jsx global>{`
        @keyframes float-slow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -10px) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float-slower {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-16px, 12px) scale(1.07); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes rotate-slower {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-float-slow { animation: float-slow 14s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 22s ease-in-out infinite; }
        .animate-rotate-slower { animation: rotate-slower 36s linear infinite; }
      `}</style>
    </>
  );
}

/* --------------------------------
   Floating AI Chat Bot Button (FAB)
----------------------------------*/
function ChatbotFAB({ onClick }) {
  return (
    <button
      aria-label="Open chatbot"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-[70] group rounded-full bg-[#3fc3b1] p-4 shadow-[0_12px_40px_-8px_rgba(63,195,177,0.6)] transition-transform hover:scale-105 focus:outline-none"
    >
      <Bot className="h-6 w-6 text-neutral-900 transition-transform group-hover:rotate-6" />
      <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/20" />
      <span className="pointer-events-none absolute -top-10 right-1/2 translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900/90 px-2 py-1 text-xs text-white opacity-0 shadow-md backdrop-blur transition-opacity group-hover:opacity-100">
        Chat with Eventify
      </span>
    </button>
  );
}

/* --------------------------------
   FAQ Chatbot Panel (glass card)
   - pre-made FAQs with quick chips
   - lives in Home.jsx but isolated
----------------------------------*/
function FAQChatbot({ open, onClose }) {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([
    { from: "bot", text: "Hi! I’m Eventify Assistant. Ask me about creating events, clubs, RBAC, analytics, secure login, refunds, or reminders." },
  ]);

  const FAQS = React.useMemo(
    () => [
      { q: "How do I create an event?", k: ["create event", "add event"], a: "Go to **Create an event**, fill in title, time, venue and visibility. You can add tickets & a poster. Hit **Publish** to make it live." },
      { q: "How can I join a club?", k: ["join club", "club join"], a: "Open **Associated Clubs**, pick a club, then tap **Follow** or **Join**. Some clubs approve requests; you’ll get a notification." },
      { q: "Do you support role-based access control?", k: ["rbac", "role-based", "roles"], a: "Yes. Eventify uses **RBAC** with roles like **Owner**, **Admin**, **Editor**, **Member**, **Viewer**. Permissions are scoped to clubs/events." },
      { q: "Is login secure?", k: ["secure login", "security", "login"], a: "We use hashed credentials, rate limiting, and optional **2FA** for organizers. OAuth via Google/University SSO may be enabled." },
      { q: "Can I analyze event performance?", k: ["analysis", "analytics", "insights"], a: "Use **Event analysis** to see registrations, check-ins, invite CTR, and demographics (where available). Export CSV supported." },
      { q: "How do reminders work?", k: ["reminder", "notifications"], a: "After following a club or registering, reminders are sent by email & in‑app (24h and 1h before). Manage preferences in Settings." },
      { q: "Refunds & tickets", k: ["refund", "ticket", "payment"], a: "Refunds depend on organizer policy. If enabled, tap **Request refund** on your ticket page. For payment issues, contact the host or support." },
    ],
    []
  );

  function similarity(a, b) {
    const A = new Set((a || "").toLowerCase().split(/\W+/).filter(Boolean));
    const B = new Set((b || "").toLowerCase().split(/\W+/).filter(Boolean));
    if (!A.size || !B.size) return 0;
    let inter = 0;
    A.forEach((t) => B.has(t) && inter++);
    return inter / Math.sqrt(A.size * B.size);
  }

  function findAnswer(text) {
    const t = (text || "").toLowerCase();
    // keyword match
    for (const f of FAQS) if (f.k.some((kw) => t.includes(kw))) return f.a;
    // fuzzy by question+keywords
    const scored = FAQS.map((f) => ({
      f,
      s: similarity(t, f.q + " " + f.k.join(" ")),
    })).sort((a, b) => b.s - a.s);
    return (scored[0]?.s || 0) > 0.2
      ? scored[0].f.a
      : "I’m not fully sure. Try asking about events, clubs, RBAC, analytics, secure login, refunds, or reminders.";
  }

  function md(s = "") {
    return s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  const ask = (txt) => {
    if (!txt.trim()) return;
    setMessages((m) => [...m, { from: "user", text: txt }, { from: "bot", text: findAnswer(txt) }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ask(input);
    setInput("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      {/* panel */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-6 right-6 w-[min(420px,92vw)] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-xl backdrop-blur-md"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-400/90">
              <Bot className="h-4 w-4 text-neutral-900" />
            </div>
            <div>
              <div className="text-sm font-semibold">Eventify Assistant</div>
              <div className="text-xs text-white/60">FAQ • Instant answers</div>
            </div>
          </div>
          <button
            aria-label="Close chatbot"
            className="rounded-md p-1.5 hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* messages */}
        <div className="max-h-[55vh] min-h-[320px] overflow-y-auto px-4 py-3">
          <div className="grid gap-2">
            {messages.map((m, i) => (
              <div key={i} className={m.from === "user" ? "ml-auto max-w-[85%]" : "max-w-[85%]"}>
                <div
                  className={
                    "inline-flex items-start gap-3 rounded-xl px-3 py-2 text-sm " +
                    (m.from === "user"
                      ? "bg-teal-400/95 text-neutral-900"
                      : "bg-neutral-900/70 border border-white/10")
                  }
                >
                  <div className="mt-0.5">
                    {m.from === "user" ? (
                      <UserIcon className="h-4 w-4 opacity-80" />
                    ) : (
                      <Sparkles className="h-4 w-4 opacity-80" />
                    )}
                  </div>
                  <div
                    className="prose prose-invert prose-p:my-0"
                    dangerouslySetInnerHTML={{ __html: m.text.split("\n").map(md).join("<br/>") }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* quick chips */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["How do I create an event?", "How can I join a club?", "Do you support role-based access control?", "Is login secure?"].map(
              (q) => (
                <button
                  key={q}
                  onClick={() => ask(q)}
                  className="truncate rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-left text-xs text-white/80 hover:bg-white/[0.08]"
                >
                  {q}
                </button>
              )
            )}
          </div>
        </div>

        {/* composer */}
        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/10 px-3 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question…"
            className="flex-1 rounded-lg bg-neutral-900/70 px-3 py-2 text-sm outline-none placeholder:text-white/40"
          />
          <Button
            type="submit"
            size="sm"
            className="bg-teal-400 text-neutral-900 hover:bg-teal-400/90"
          >
            <Send className="mr-1 h-4 w-4" />
            Send
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
