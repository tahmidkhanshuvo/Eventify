// src/Pages/Create_events.jsx
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
    imageUrl: "",   // optional: if organizer wants to paste a URL instead of uploading
    capacity: "",
  });

  // local file state + preview
  const [file, setFile] = React.useState(null);
  const [filePreview, setFilePreview] = React.useState("");

  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  function toDateISO(dateStr, timeStr) {
    // Combine local date+time -> Date (default 09:00 if time empty)
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

  // handle file select + preview (PNG/JPG/WEBP)
  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    setError("");
    if (!f) {
      setFile(null);
      if (filePreview) URL.revokeObjectURL(filePreview);
      setFilePreview("");
      return;
    }
    if (!/^image\/(png|jpe?g|webp)$/i.test(f.type)) {
      setError("Please select a PNG, JPG, or WEBP image.");
      e.target.value = "";
      return;
    }
    // revoke old preview before replacing
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFile(f);
    setFilePreview(URL.createObjectURL(f));
  };

  React.useEffect(() => {
    // cleanup preview URL on unmount
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

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
      imageUrl: form.imageUrl.trim(),          // optional direct URL path still supported
      capacity: form.capacity ? Number(form.capacity) : undefined,
      // createdBy is set by backend (from auth); do NOT send from the client.
    };

    try {
      setSubmitting(true);

      // 1) Create the event (cookie-based auth)
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Your session has expired. Please log in again.");
        }
        const msg = await res.text();
        throw new Error(msg || "Failed to create event.");
      }

      const created = await res.json();

      // 2) If a file was chosen, upload banner to /api/events/:id/banner
      if (file) {
        const fd = new FormData();
        // IMPORTANT: field name must match upload.single('banner') on the server
        fd.append("banner", file);

        const up = await fetch(`/api/events/${created._id}/banner`, {
          method: "POST",
          credentials: "include",
          body: fd,
        });

        if (!up.ok) {
          if (up.status === 401) {
            throw new Error("Your session has expired. Please log in again.");
          }
          const umsg = await up.text();
          // event exists; we only surface banner upload failure
          throw new Error(umsg || "Event created, but banner upload failed.");
        }
      }

      setSuccess("Event created successfully!");
      // Navigate organizer to My Events (matches your sidebar link)
      setTimeout(() => navigate("/organizers/myevents"), 900);
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

          {/* Optional: paste an image URL */}
          <div>
            <label className="mb-1 block text-xs font-medium text-white/70">Image URL (optional)</label>
            <input
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={onChange}
              placeholder="https://..."
              className="w-full rounded-xl bg-white/5 px-3 py-2 text-sm text-white ring-1 ring-white/10 placeholder-white/40 outline-none focus:ring-2 focus:ring-[#7d9dd2]/40"
            />
          </div>

          {/* File upload */}
          <div>
            <label className="mb-1 block text-xs font-medium text-white/70">
              Upload Banner (1920×1080 JPG/PNG/WEBP)
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={onFileChange}
              className="block w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-white file:px-3 file:py-2 file:text-black hover:file:brightness-95"
            />
          </div>

          {/* Preview (uploaded file takes priority; else URL) */}
          {(filePreview || form.imageUrl) ? (
            <div className="md:col-span-2">
              <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                <img
                  src={filePreview || form.imageUrl}
                  alt="Event cover preview"
                  className="h-48 w-full object-cover"
                />
              </div>
            </div>
          ) : null}
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
