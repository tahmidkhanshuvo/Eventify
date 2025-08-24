// src/pages/CreateEvent.jsx
import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Workshop","Seminar","Guest Lecture","Networking Event","Hackathon","Competition","Career Fair",
  "Cultural Fest","Music Concert","Art Exhibition","Movie Night","Social Mixer","Food Festival",
  "Sports Tournament","Fitness Session","Outdoor Trip","Marathon","E-Sports Competition",
  "Charity Drive","Volunteer Day","Awareness Campaign","Club Meeting","Info Session"
];

export default function CreateEvent({ className }) {
  // force dark mode for this page
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    title: "",
    description: "",
    date: "",     // yyyy-mm-dd
    time: "",     // HH:mm (local)
    location: "",
    category: "",
    imageUrl: "",
    imageKitFileId: "", // if you later plug ImageKit, fill this after upload
    capacity: "",
  });

  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  function toDateISO(dateStr, timeStr) {
    // Combine local date+time -> Date
    // If no time, default to 09:00
    const t = timeStr?.trim() ? timeStr : "09:00";
    const d = new Date(`${dateStr}T${t}`);
    return d.toISOString();
  }

  const validate = () => {
    if (!form.title.trim()) return "Title is required.";
    if (!form.description.trim()) return "Description is required.";
    if (!form.date) return "Date is required.";
    if (!form.location.trim()) return "Location is required.";
    if (!form.category) return "Category is required.";
    if (form.capacity && Number(form.capacity) < 0) return "Capacity cannot be negative.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      date: toDateISO(form.date, form.time),   // matches schema `Date`
      location: form.location.trim(),
      category: form.category,
      imageUrl: form.imageUrl.trim(),
      imageKitFileId: form.imageKitFileId.trim(),
      capacity: form.capacity ? Number(form.capacity) : undefined,
      // createdBy is set by backend (from auth); do NOT send from the client.
    };

    try {
      setSubmitting(true);
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to create event.");
      }

      setSuccess("Event created successfully!");
      // optional: go to My Events
      setTimeout(() => navigate("/students/myevents"), 900);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={cn(
        "dark relative z-10 mx-auto w-full max-w-4xl p-4 md:p-8",
        className
      )}
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Create Event</h1>
        <p className="text-sm text-white/60">
          Fill in the details below to publish your event.
        </p>
      </div>

      {/* Form card */}
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6",
          "backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
        )}
      >
        {/* Basic details */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium text-white/70">Title *</label>
            <input
              name="title"
              type="text"
              value={form.title}
              onChange={onChange}
              placeholder="e.g., Hackathon 2025"
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white ring-1 ring-white/10 placeholder-white/40 outline-none focus:ring-2 focus:ring-[#7d9dd2]/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-white/70">Date *</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={onChange}
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white ring-1 ring-white/10 placeholder-white/40 outline-none focus:ring-2 focus:ring-[#7d9dd2]/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-white/70">Time</label>
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={onChange}
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white ring-1 ring-white/10 placeholder-white/40 outline-none focus:ring-2 focus:ring-[#7d9dd2]/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-white/70">Location *</label>
            <input
              name="location"
              type="text"
              value={form.location}
              onChange={onChange}
              placeholder="e.g., BRAC University Auditorium"
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white ring-1 ring-white/10 placeholder-white/40 outline-none focus:ring-2 focus:ring-[#7d9dd2]/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-white/70">Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={onChange}
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white ring-1 ring-white/10 outline-none focus:ring-2 focus:ring-[#7d9dd2]/40"
            >
              <option className="bg-neutral-900" value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-neutral-900">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium text-white/70">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              rows={4}
              placeholder="Describe your event..."
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white ring-1 ring-white/10 placeholder-white/40 outline-none focus:ring-2 focus:ring-[#7d9dd2]/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-white/70">Capacity</label>
            <input
              name="capacity"
              type="number"
              min="0"
              value={form.capacity}
              onChange={onChange}
              placeholder="e.g., 200"
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white ring-1 ring-white/10 placeholder-white/40 outline-none focus:ring-2 focus:ring-[#7d9dd2]/40"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-white/70">Image URL</label>
            <input
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={onChange}
              placeholder="https://..."
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white ring-1 ring-white/10 placeholder-white/40 outline-none focus:ring-2 focus:ring-[#7d9dd2]/40"
            />
          </div>

          {/* Image preview */}
          {form.imageUrl ? (
            <div className="md:col-span-2">
              <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                <img
                  src={form.imageUrl}
                  alt="Event cover preview"
                  className="h-48 w-full object-cover"
                />
              </div>
            </div>
          ) : null}

          {/* ImageKit file id (optional; fill after you add uploader) */}
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-medium text-white/70">
              ImageKit File ID (optional)
            </label>
            <input
              name="imageKitFileId"
              type="text"
              value={form.imageKitFileId}
              onChange={onChange}
              placeholder="populated by your ImageKit uploader"
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white ring-1 ring-white/10 placeholder-white/40 outline-none focus:ring-2 focus:ring-[#7d9dd2]/40"
            />
          </div>
        </div>

        {/* Messages */}
        {error ? (
          <div className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300 ring-1 ring-red-500/30">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="mt-4 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300 ring-1 ring-emerald-500/30">
            {success}
          </div>
        ) : null}

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-semibold text-white transition",
              "bg-gradient-to-r from-[#5d429a] via-[#7d9dd2] to-[#5fc3b1]",
              "hover:brightness-110 active:brightness-95 disabled:opacity-60"
            )}
          >
            {submitting ? "Creating..." : "Create Event"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl bg-white/5 px-4 py-2 text-sm text-white ring-1 ring-white/10 hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </motion.form>
    </div>
  );
}
