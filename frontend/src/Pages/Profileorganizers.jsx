// src/Pages/EditEvent.jsx
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const CATEGORY_OPTIONS = [
  "Workshop","Seminar","Guest Lecture","Networking Event","Hackathon","Competition","Career Fair",
  "Cultural Fest","Music Concert","Art Exhibition","Movie Night","Social Mixer","Food Festival",
  "Sports Tournament","Fitness Session","Outdoor Trip","Marathon","E-Sports Competition",
  "Charity Drive","Volunteer Day","Awareness Campaign","Club Meeting","Info Session"
];

const SAMPLE_EVENT = {
  _id: "evt_demo_1",
  title: "HackFest 2025",
  description:
    "Join an intense 24-hour hackathon. Teams, mentors, prizes, and plenty of coffee.",
  date: "2025-10-12",
  location: "North South University, Dhaka",
  category: "Hackathon",
  imageUrl:
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600&auto=format&fit=crop",
  imageKitFileId: "",
  capacity: 300,
  createdBy: "USER_ID_DEMO",
};

export default function Profileorganizers({
  initialEvent = SAMPLE_EVENT,
  onSave,    // optional: (payload) => Promise|void
  onCancel,  // optional: () => void
  className,
}) {
  // force dark mode styling (remove if your app already sets dark globally)
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const [event, setEvent] = React.useState(() => normalize(initialEvent));
  const [saving, setSaving] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const isDirty = React.useMemo(
    () => JSON.stringify(normalize(initialEvent)) !== JSON.stringify(event),
    [initialEvent, event]
  );

  function normalize(e) {
    const d = typeof e.date === "string" ? e.date : toInputDate(e.date);
    return {
      _id: e._id ?? "",
      title: e.title ?? "",
      description: e.description ?? "",
      date: d ?? "",
      location: e.location ?? "",
      category: e.category ?? CATEGORY_OPTIONS[0],
      imageUrl: e.imageUrl ?? "",
      imageKitFileId: e.imageKitFileId ?? "",
      capacity: e.capacity ?? 0,
      createdBy: e.createdBy ?? "",
    };
  }

  function toInputDate(value) {
    try {
      const d = value instanceof Date ? value : new Date(value);
      if (Number.isNaN(d.getTime())) return "";
      return d.toISOString().slice(0, 10);
    } catch {
      return "";
    }
  }

  function validate(current) {
    const v = {};
    if (!current.title.trim()) v.title = "Title is required.";
    if (!current.description.trim()) v.description = "Description is required.";
    if (!current.date) v.date = "Date is required.";
    if (!current.location.trim()) v.location = "Location is required.";
    if (!current.category) v.category = "Category is required.";
    if (current.capacity !== "" && Number(current.capacity) < 0)
      v.capacity = "Capacity must be zero or more.";
    return v;
    }

  function handleChange(field, value) {
    setEvent((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate(event);
    setErrors(v);
    if (Object.keys(v).length) {
      setMsg("Please fix the highlighted fields.");
      return;
    }
    setMsg("");
    setSaving(true);
    try {
      if (onSave) {
        await onSave(event);
      } else {
        // Fallback demo PUT/POST – replace with your API
        const method = event._id ? "PUT" : "POST";
        const url = event._id ? `/api/events/${event._id}` : "/api/events";
        await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(event),
        });
      }
      setMsg("Saved ✓");
    } catch (err) {
      setMsg("Save failed. Check console.");
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    setEvent(normalize(initialEvent));
    setErrors({});
    setMsg("");
  }

  return (
    <div
      className={cn(
        "dark relative z-10 mx-auto w-full max-w-6xl bg-transparent p-4 md:p-8",
        className
      )}
    >
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Edit Event</h1>
          <p className="text-sm text-white/60">Update details & preview in real time.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-white ring-1 ring-white/10 hover:bg-white/10"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => (onCancel ? onCancel() : window.history.back())}
            className="rounded-lg bg-white/0 px-3 py-1.5 text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            form="event-form"
            type="submit"
            disabled={saving || !isDirty}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm text-black",
              "bg-[#7d9dd2] hover:bg-[#6a8ec3]",
              "disabled:cursor-not-allowed disabled:opacity-60"
            )}
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* Form + Preview */}
      <div className="grid gap-6 md:grid-cols-5">
        {/* Form */}
        <form
          id="event-form"
          onSubmit={handleSubmit}
          className="md:col-span-3 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
        >
          {/* Title */}
          <Field
            label="Title"
            error={errors.title}
            input={
              <input
                type="text"
                value={event.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className={inputClass(errors.title)}
                placeholder="e.g. HackFest 2025"
              />
            }
          />

          {/* Description */}
          <Field
            label="Description"
            error={errors.description}
            input={
              <textarea
                rows={4}
                value={event.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className={inputClass(errors.description, "min-h-[120px]")}
                placeholder="Tell attendees what to expect…"
              />
            }
          />

          {/* Date + Capacity */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Date"
              error={errors.date}
              input={
                <input
                  type="date"
                  value={event.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className={inputClass(errors.date)}
                />
              }
            />
            <Field
              label="Capacity"
              error={errors.capacity}
              input={
                <input
                  type="number"
                  min={0}
                  value={event.capacity}
                  onChange={(e) => handleChange("capacity", Number(e.target.value))}
                  className={inputClass(errors.capacity)}
                  placeholder="e.g. 300"
                />
              }
            />
          </div>

          {/* Location */}
          <Field
            label="Location"
            error={errors.location}
            input={
              <input
                type="text"
                value={event.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className={inputClass(errors.location)}
                placeholder="Campus Auditorium, Dhaka"
              />
            }
          />

          {/* Category */}
          <Field
            label="Category"
            error={errors.category}
            input={
              <select
                value={event.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className={inputClass(errors.category)}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            }
          />

          {/* Image URL (ImageKit ready) */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Cover Image URL"
              input={
                <input
                  type="url"
                  value={event.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  className={inputClass()}
                  placeholder="https://…"
                />
              }
              hint="Paste a public URL (or integrate ImageKit upload)."
            />
            <Field
              label="ImageKit File ID"
              input={
                <input
                  type="text"
                  value={event.imageKitFileId}
                  onChange={(e) => handleChange("imageKitFileId", e.target.value)}
                  className={inputClass()}
                  placeholder="for deletes via ImageKit API"
                />
              }
              hint="Optional: store ImageKit fileId to enable deletes."
            />
          </div>

          {msg && (
            <p className="text-sm text-white/80">{msg}</p>
          )}
        </form>

        {/* Live Preview */}
        <motion.div
          layout
          className="md:col-span-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
        >
          <div className="relative">
            {event.imageUrl ? (
              <img
                src={event.imageUrl}
                alt={event.title || "Event cover"}
                className="h-48 w-full object-cover"
              />
            ) : (
              <div className="h-48 w-full bg-gradient-to-br from-white/10 to-white/0" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {event.date && (
              <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-1 text-xs text-white ring-1 ring-white/10">
                {prettyDate(event.date)}
              </div>
            )}
          </div>

          <div className="space-y-2 p-4">
            <h3 className="truncate text-lg font-semibold text-white">
              {event.title || "Untitled Event"}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {event.category && (
                <span className="rounded-full bg-white/5 px-2 py-1 text-white/80 ring-1 ring-white/10">
                  {event.category}
                </span>
              )}
              {Number.isFinite(event.capacity) && (
                <span className="rounded-full bg-white/5 px-2 py-1 text-white/80 ring-1 ring-white/10">
                  Capacity: {event.capacity}
                </span>
              )}
            </div>

            {event.location && (
              <div className="text-sm text-white/80">{event.location}</div>
            )}

            <p className="line-clamp-4 text-sm text-white/70">
              {event.description || "Event description will appear here…"}
            </p>

            <div className="pt-2">
              <button
                type="button"
                className="rounded-lg bg-[#5fc3b1]/20 px-3 py-1.5 text-sm text-[#5fc3b1] ring-1 ring-[#5fc3b1]/30 hover:bg-[#5fc3b1]/25"
              >
                Preview Action
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- tiny helpers ---------- */

function Field({ label, input, error, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-white">{label}</label>
      {input}
      {error ? (
        <p className="text-xs text-red-300">{error}</p>
      ) : hint ? (
        <p className="text-xs text-white/50">{hint}</p>
      ) : null}
    </div>
  );
}

function inputClass(hasError, extra = "") {
  return cn(
    "w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40",
    "outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[#7d9dd2]/40",
    hasError && "ring-red-400 focus:ring-red-400/60",
    extra
  );
}

function prettyDate(iso) {
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
