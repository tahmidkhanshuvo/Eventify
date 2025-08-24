// src/Pages/ProfileStudent.jsx
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// ——— category enum from your schema ———
const CATEGORY_OPTIONS = [
  "Workshop", "Seminar", "Guest Lecture", "Networking Event", "Hackathon",
  "Competition", "Career Fair", "Cultural Fest", "Music Concert",
  "Art Exhibition", "Movie Night", "Social Mixer", "Food Festival",
  "Sports Tournament", "Fitness Session", "Outdoor Trip", "Marathon",
  "E-Sports Competition", "Charity Drive", "Volunteer Day",
  "Awareness Campaign", "Club Meeting", "Info Session",
];

// tiny util to convert <input type="datetime-local"> to ISO
function toISO(local) {
  if (!local) return "";
  // Treat the local input as local time, convert to ISO
  const dt = new Date(local);
  // If browser interprets as UTC, adjust using timezone offset
  // but in practice this is usually fine for UI
  return dt.toISOString();
}
// pretty date for the badge
function fmtDate(iso) {
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

export default function ProfileStudent({
  // optional initial student + event for editing
  student = {
    name: "Aisha Rahman",
    username: "aisha_r",
    email: "aisha@example.com",
    university: "North South University",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800&auto=format&fit=crop",
    bio: "CS undergrad passionate about hackathons & ML.",
  },
  initialEvent = {
    title: "HackFest 2025",
    description:
      "University-wide hackathon focused on AI + DevTools. Build something awesome with your team!",
    date: new Date().toISOString(),
    location: "NSU Auditorium",
    category: "Hackathon",
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop",
    imageKitFileId: "",
    capacity: 300,
    createdBy: "current-user-id", // string placeholder for UI
  },
  className,
  onSave, // optional callback(payload)
}) {
  // force dark (page is designed for dark only)
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const [event, setEvent] = React.useState(initialEvent);
  const [saving, setSaving] = React.useState(false);

  function updateField(key, val) {
    setEvent((prev) => ({ ...prev, [key]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    // minimal front-end validation (required fields)
    const required = ["title", "description", "date", "location", "category"];
    const missing = required.filter((k) => !String(event[k] || "").trim());
    if (missing.length) {
      alert(`Please fill: ${missing.join(", ")}`);
      setSaving(false);
      return;
    }

    const payload = {
      ...event,
      // ensure date in ISO for backend schema
      date: event.date,
    };

    if (onSave) {
      onSave(payload);
    } else {
      // demo: just log
      console.log("SAVE EVENT PAYLOAD →", payload);
      alert("Saved (check console). Plug this into your API call.");
    }
    setSaving(false);
  }

  function handleReset() {
    setEvent(initialEvent);
  }

  // derive a value for the datetime-local input (local format)
  const localDateTime = React.useMemo(() => {
    try {
      const d = new Date(event.date);
      const pad = (n) => String(n).padStart(2, "0");
      const yyyy = d.getFullYear();
      const mm = pad(d.getMonth() + 1);
      const dd = pad(d.getDate());
      const hh = pad(d.getHours());
      const mi = pad(d.getMinutes());
      return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
    } catch {
      return "";
    }
  }, [event.date]);

  return (
    <div
      className={cn(
        "dark relative z-10 mx-auto w-full max-w-7xl bg-transparent p-4 md:p-8",
        className
      )}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Student Profile</h1>
          <p className="text-sm text-white/60">
            Edit your details and update an event you’re involved in.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 pr-4">
          <img
            src={student.avatar}
            alt={student.name}
            className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10"
          />
          <div className="leading-tight">
            <div className="text-sm font-medium text-white">{student.name}</div>
            <div className="text-xs text-white/60">@{student.username}</div>
          </div>
        </div>
      </div>

      {/* 2-column layout */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,360px),1fr]">
        {/* Left: Student card */}
        <motion.section
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        >
          <div className="relative h-28 w-full bg-gradient-to-tr from-[#7d9dd2]/30 to-[#5fc3b1]/30" />
          <div className="-mt-8 px-5 pb-5">
            <img
              src={student.avatar}
              alt={student.name}
              className="h-16 w-16 rounded-xl object-cover ring-2 ring-white/10"
            />
            <h3 className="mt-3 text-lg font-semibold text-white">{student.name}</h3>
            <p className="text-sm text-white/60">
              {student.email} • {student.university}
            </p>
            <p className="mt-3 text-sm text-white/80">{student.bio}</p>

            <div className="mt-4 flex gap-2">
              <button className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/10 hover:bg-white/15">
                Edit Profile (coming soon)
              </button>
              <button className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/10 hover:bg-white/15">
                Change Avatar
              </button>
            </div>
          </div>
        </motion.section>

        {/* Right: Event editor (matches your schema) */}
        <motion.section
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        >
          {/* Cover + date badge */}
          <div className="relative">
            <img
              src={
                event.imageUrl ||
                "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop"
              }
              alt={event.title || "Event cover"}
              className="h-40 w-full object-cover bg-neutral-900"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {event.date ? (
              <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-1 text-xs text-white ring-1 ring-white/10">
                {fmtDate(event.date)}
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 p-5">
            {/* title */}
            <div>
              <label className="mb-1 block text-xs font-medium text-white/80">Title *</label>
              <input
                type="text"
                value={event.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g., HackFest 2025"
                className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[#7d9dd2]/40"
              />
            </div>

            {/* description */}
            <div>
              <label className="mb-1 block text-xs font-medium text-white/80">
                Description *
              </label>
              <textarea
                value={event.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={4}
                placeholder="Describe what the event is about…"
                className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[#7d9dd2]/40"
              />
            </div>

            {/* date */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-white/80">
                  Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={localDateTime}
                  onChange={(e) => updateField("date", toISO(e.target.value))}
                  className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[#7d9dd2]/40"
                />
              </div>

              {/* capacity */}
              <div>
                <label className="mb-1 block text-xs font-medium text-white/80">
                  Capacity (seats)
                </label>
                <input
                  type="number"
                  min={0}
                  value={Number(event.capacity ?? 0)}
                  onChange={(e) =>
                    updateField("capacity", Math.max(0, Number(e.target.value || 0)))
                  }
                  className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[#7d9dd2]/40"
                />
              </div>
            </div>

            {/* location + category */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-white/80">Location *</label>
                <input
                  type="text"
                  value={event.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="e.g., NSU Auditorium"
                  className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[#7d9dd2]/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white/80">Category *</label>
                <select
                  value={event.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[#7d9dd2]/40"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c} className="bg-neutral-900">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* imageUrl + imageKitFileId */}
            <div className="grid gap-4 sm:grid-cols-[2fr,1fr]">
              <div>
                <label className="mb-1 block text-xs font-medium text-white/80">
                  Image URL
                </label>
                <input
                  type="url"
                  value={event.imageUrl}
                  onChange={(e) => updateField("imageUrl", e.target.value)}
                  placeholder="https://…"
                  className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[#7d9dd2]/40"
                />
                <p className="mt-1 text-[11px] text-white/50">
                  Paste a hosted image URL for preview, or integrate ImageKit upload later.
                </p>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white/80">
                  ImageKit File ID
                </label>
                <input
                  type="text"
                  value={event.imageKitFileId}
                  onChange={(e) => updateField("imageKitFileId", e.target.value)}
                  placeholder="file_xxx (for delete API)"
                  className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[#7d9dd2]/40"
                />
              </div>
            </div>

            {/* createdBy (readonly for UI demo) */}
            <div>
              <label className="mb-1 block text-xs font-medium text-white/80">
                Created By (User ID)
              </label>
              <input
                type="text"
                value={event.createdBy}
                onChange={(e) => updateField("createdBy", e.target.value)}
                className="w-full cursor-text rounded-xl bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[#7d9dd2]/40"
              />
              <p className="mt-1 text-[11px] text-white/50">
                In production, this comes from the logged-in user.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/10 hover:bg-white/15 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg bg-white/5 px-4 py-2 text-sm text-white ring-1 ring-white/10 hover:bg-white/10"
              >
                Reset
              </button>
            </div>
          </form>
        </motion.section>
      </div>
    </div>
  );
}