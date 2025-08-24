// src/cards/ExpandableProfiles.jsx
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ExpandableProfiles({ profiles: initialProfiles = [] }) {
  const [profiles, setProfiles] = React.useState(initialProfiles);
  const [selected, setSelected] = React.useState(null);

  // keep local state in sync when the parent filters change
  React.useEffect(() => {
    setProfiles(initialProfiles);
  }, [initialProfiles]);

  const handleDelete = (id) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    setSelected(null);
  };

  return (
    <div className="p-0">
      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((item) => {
          const p = item.profile;
          return (
            <motion.button
              key={item.id}
              layoutId={`card-${item.id}`}
              onClick={() => setSelected(item)}
              className="text-left rounded-xl bg-white shadow ring-1 ring-black/5 p-4 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{p.name}</h3>
              <div className="mt-2 text-sm text-neutral-600 space-y-1">
                <div><span className="font-medium">Username:</span> @{p.username}</div>
                <div className="truncate"><span className="font-medium">Email:</span> {p.email}</div>
                {p.university && (
                  <div className="truncate"><span className="font-medium">University:</span> {p.university}</div>
                )}
              </div>
              <div className="mt-3 text-xs text-neutral-500">
                Role: {p.role} • Joined: {p.joined}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Expand overlay */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel */}
            <motion.div
              layoutId={`card-${selected.id}`}
              className="fixed inset-x-0 top-16 z-50 mx-auto w-[min(94vw,56rem)] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden"
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
                  <div>
                    <h3 className="text-2xl font-bold">{selected.profile.name}</h3>
                    <p className="text-sm text-neutral-500">
                      @{selected.profile.username} • {selected.profile.email}
                    </p>
                    <div className="mt-2 text-sm text-neutral-700 space-y-1">
                      <div>Role: <span className="font-medium">{selected.profile.role}</span></div>
                      <div>Joined: <span className="font-medium">{selected.profile.joined}</span></div>
                      {selected.profile.university && (
                        <div>University: <span className="font-medium">{selected.profile.university}</span></div>
                      )}
                      {selected.profile.bio && (
                        <p className="mt-3">{selected.profile.bio}</p>
                      )}
                    </div>
                  </div>

                  {/* ❌ Delete */}
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="rounded-full p-2 hover:bg-neutral-200/70"
                    aria-label="Delete profile card"
                    title="Delete card"
                  >
                    <X className="w-5 h-5 text-neutral-700" />
                  </button>
                </div>

                {/* Participated event history */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold">Participated Events</h4>
                  {selected.participatedEvents?.length ? (
                    <ul className="mt-3 divide-y divide-neutral-200">
                      {selected.participatedEvents.map((ev) => (
                        <li key={ev.id} className="py-3 flex items-center justify-between">
                          <div>
                            <div className="font-medium">{ev.title}</div>
                            <div className="text-sm text-neutral-500">{ev.date}</div>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-neutral-100">
                            {ev.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-neutral-500 mt-2">No events yet.</p>
                  )}
                </div>

                {/* Footer actions */}
                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => setSelected(null)}
                    className="px-4 py-2 rounded-lg bg-neutral-200 hover:bg-neutral-300"
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
