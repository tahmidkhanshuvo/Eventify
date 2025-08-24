import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash } from "lucide-react";

export default function ExpandableProfilesApproval({
  profiles: initialProfiles = [],
  onApprove,
  onReject,
  busyId,
}) {
  const [profiles, setProfiles] = React.useState(initialProfiles);
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    setProfiles(initialProfiles);
  }, [initialProfiles]);

  const fallbackAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=600";

  const dropRow = (id) => {
    setProfiles((prev) => prev.filter((p) => (p._id || p.id) !== id));
    setSelected((cur) => ((cur?._id || cur?.id) === id ? null : cur));
  };

  return (
    <div className="p-0">
      {/* Rows */}
      <div className="space-y-3">
        {profiles.map((p) => {
          const id = p._id || p.id;
          const prof = p.profile || p;
          return (
            <motion.div
              key={id}
              layoutId={`card-${id}`}
              onClick={() => setSelected(p)}
              className="group flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10 sm:px-5 sm:py-4"
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <img
                  src={prof.avatar || fallbackAvatar}
                  alt={`${prof.name || prof.fullName || "User"} avatar`}
                  className="h-12 w-12 rounded-xl object-cover shadow-md sm:h-14 sm:w-14"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="truncate text-base font-semibold leading-tight text-white sm:text-lg">
                    {prof.name || prof.fullName}
                  </div>
                  <div className="truncate text-sm leading-tight text-white/70 sm:text-base">
                    @{prof.username}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={busyId === id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onApprove?.(id);
                  }}
                  className="shrink-0 rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600 active:scale-95 disabled:opacity-60"
                  title="Approve"
                >
                  {busyId === id ? "Approving…" : "Approve"}
                </button>

                <button
                  disabled={busyId === id}
                  onClick={async (e) => {
                    e.stopPropagation();
                    await onReject?.(id);
                    dropRow(id);
                  }}
                  className="shrink-0 rounded-full bg-red-600 px-4 py-1.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 active:scale-95 disabled:opacity-60"
                  title="Reject"
                >
                  {busyId === id ? "Working…" : "Reject"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expand overlay */}
      <AnimatePresence>
        {selected && (() => {
          const id = selected._id || selected.id;
          const prof = selected.profile || selected;
          return (
            <>
              <motion.div
                className="fixed inset-0 z-40 bg-black/60"
                onClick={() => setSelected(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                layoutId={`card-${id}`}
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
                    <div className="flex items-start gap-4">
                      <img
                        src={prof.avatar || fallbackAvatar}
                        alt={`${prof.name || prof.fullName || "User"} avatar`}
                        className="h-14 w-14 rounded-xl object-cover shadow"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900">
                          {prof.name || prof.fullName}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          @{prof.username} • {prof.email}
                        </p>
                        <div className="mt-2 space-y-1 text-sm text-neutral-700">
                          {prof.role && <div>Role: <span className="font-medium">{prof.role}</span></div>}
                          {prof.joined && <div>Joined: <span className="font-medium">{prof.joined}</span></div>}
                          {prof.university && <div>University: <span className="font-medium">{prof.university}</span></div>}
                          {prof.bio && <p className="mt-3">{prof.bio}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        disabled={busyId === id}
                        onClick={() => onApprove?.(id)}
                        className="rounded-full bg-emerald-500 px-3 py-2 text-white hover:bg-emerald-600 disabled:opacity-60"
                        title="Approve"
                      >
                        Approve
                      </button>
                      <button
                        disabled={busyId === id}
                        onClick={async () => {
                          await onReject?.(id);
                          setSelected(null);
                          dropRow(id);
                        }}
                        className="rounded-full bg-red-600 p-2 text-white hover:bg-red-700 disabled:opacity-60"
                        title="Reject"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setSelected(null)}
                        className="rounded-full bg-neutral-200 p-2 text-neutral-800 hover:bg-neutral-300"
                        title="Close"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
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
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
