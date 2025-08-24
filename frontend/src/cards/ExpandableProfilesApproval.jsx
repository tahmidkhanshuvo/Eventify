import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExpandableProfilesApproval({ profiles: initialProfiles = [] }) {
  const [profiles, setProfiles] = React.useState(initialProfiles);
  const [selected, setSelected] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    setProfiles(initialProfiles);
  }, [initialProfiles]);

  const handleDelete = (id) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    setSelected((cur) => (cur?.id === id ? null : cur));
  };

  // Save to localStorage and go to /storedthelist
  const handleApprove = (profileObj) => {
    try {
      const key = "approvedProfiles";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      // de-dupe by id
      const next = existing.some((p) => p.id === profileObj.id)
        ? existing.map((p) => (p.id === profileObj.id ? profileObj : p))
        : [...existing, profileObj];

      localStorage.setItem(key, JSON.stringify(next));
      setSelected(null);
      navigate("/storedthelist"); // <-- route you want to show the stored list
    } catch (e) {
      console.error("Failed to approve profile:", e);
    }
  };

  const fallbackAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=600";

  return (
    <div className="p-0">
      {/* Rows */}
      <div className="space-y-3">
        {profiles.map((p) => (
          <motion.div
            key={p.id}
            layoutId={`card-${p.id}`}
            onClick={() => setSelected(p)}
            className="group flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10 sm:px-5 sm:py-4"
          >
            {/* Left: avatar + text */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <img
                src={p.profile?.avatar || fallbackAvatar}
                alt={`${p.profile?.name || "User"} avatar`}
                className="h-12 w-12 rounded-xl object-cover shadow-md sm:h-14 sm:w-14"
                loading="lazy"
              />
              <div className="min-w-0">
                <div className="truncate text-base font-semibold leading-tight text-white sm:text-lg">
                  {p.profile?.name}
                </div>
                <div className="truncate text-sm leading-tight text-white/70 sm:text-base">
                  @{p.profile?.username}
                </div>
              </div>
            </div>

            {/* Right: Approve + Delete */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprove(p);
                }}
                className="shrink-0 rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600 active:scale-95"
                aria-label={`Approve ${p.profile?.name || "profile"}`}
                title="Approve"
              >
                Approve
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(p.id);
                }}
                className="shrink-0 rounded-full bg-red-600 px-4 py-1.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 active:scale-95"
                aria-label={`Delete ${p.profile?.name || "profile"}`}
                title="Delete card"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expand overlay */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              layoutId={`card-${selected.id}`}
              className="fixed inset-x-0 top-16 z-50 mx-auto w-[min(94vw,56rem)] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              role="dialog"
              aria-modal="true"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Profile details */}
                  <div className="flex items-start gap-4">
                    <img
                      src={selected.profile?.avatar || fallbackAvatar}
                      alt={`${selected.profile?.name || "User"} avatar`}
                      className="h-14 w-14 rounded-xl object-cover shadow"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900">
                        {selected.profile?.name}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        @{selected.profile?.username} • {selected.profile?.email}
                      </p>
                      <div className="mt-2 space-y-1 text-sm text-neutral-700">
                        {selected.profile?.role && (
                          <div>
                            Role:{" "}
                            <span className="font-medium">
                              {selected.profile.role}
                            </span>
                          </div>
                        )}
                        {selected.profile?.joined && (
                          <div>
                            Joined:{" "}
                            <span className="font-medium">
                              {selected.profile.joined}
                            </span>
                          </div>
                        )}
                        {selected.profile?.university && (
                          <div>
                            University:{" "}
                            <span className="font-medium">
                              {selected.profile.university}
                            </span>
                          </div>
                        )}
                        {selected.profile?.bio && (
                          <p className="mt-3">{selected.profile.bio}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprove(selected)}
                      className="rounded-full bg-emerald-500 px-3 py-2 text-white hover:bg-emerald-600"
                      aria-label="Approve profile"
                      title="Approve profile"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDelete(selected.id)}
                      className="rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
                      aria-label="Delete profile card"
                      title="Delete card"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setSelected(null)}
                      className="rounded-full bg-neutral-200 p-2 text-neutral-800 hover:bg-neutral-300"
                      aria-label="Close"
                      title="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Participated events */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-neutral-900">
                    Participated Events
                  </h4>
                  {selected.participatedEvents?.length ? (
                    <ul className="mt-3 divide-y divide-neutral-200">
                      {selected.participatedEvents.map((ev) => (
                        <li
                          key={ev.id}
                          className="flex items-center justify-between py-3"
                        >
                          <div>
                            <div className="font-medium text-neutral-900">
                              {ev.title}
                            </div>
                            <div className="text-sm text-neutral-500">
                              {ev.date}
                            </div>
                          </div>
                          <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs">
                            {ev.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-neutral-500">
                      No events yet.
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => setSelected(null)}
                    className="rounded-lg bg-neutral-200 px-4 py-2 hover:bg-neutral-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
