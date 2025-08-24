import React from "react";
import BackgroundFX from "../components/BackgroundFX";
import { HoverEffect } from "../components/ui/card-hover-effect";
import ApprovalList from "./ApprovalList";
import Storedthelist from "./Storedthelist";

export const projects = [
  { id: 1, name: "Working",  description: "Events That Running",   count: 10 },
  { id: 2, name: "Upcoming", description: "Events Are Upcoming",   count: 5  },
  { id: 3, name: "Done",     description: "Events are Finished",   count: 8  },
];

export default function SuperAdmin() {
  const [tab, setTab] = React.useState("approval");

  // search inputs (apply to approval list)
  const [searchUserName, setSearchUserName] = React.useState("");
  const [searchEmail, setSearchEmail] = React.useState("");
  const [searchUniversity, setSearchUniversity] = React.useState("");

  // pending requests
  const [requests, setRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [busyId, setBusyId] = React.useState(null);

  // approved organizers (Stored List)
  const [approved, setApproved] = React.useState([]);
  const [loadingApproved, setLoadingApproved] = React.useState(false);
  const [approvedError, setApprovedError] = React.useState("");

  // ---- Logout (no navbar) ----
  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    try { window.dispatchEvent(new Event("auth:changed")); } catch {}
    window.location.href = "/admin-login";
  }

  // ---- Fetch pending requests ----
  const fetchRequests = React.useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/superadmin/requests", {
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      if (res.status === 401 || res.status === 403) {
        window.location.href = "/admin-login";
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to load requests");
      setRequests(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // ---- Approve / Reject ----
  async function onApprove(userId) {
    setBusyId(userId);
    try {
      const res = await fetch(`/api/superadmin/requests/${userId}/approve`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Approve failed");
      await fetchRequests();
      if (data?.tempPassword) {
        alert(`Approved.\nTemporary password emailed.\nTemp password: ${data.tempPassword}`);
      } else {
        alert("Approved.");
      }
    } catch (e) {
      alert(e.message || "Approve failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onReject(userId) {
    if (!window.confirm("Reject this organizer request? This will remove it permanently.")) return;
    setBusyId(userId);
    try {
      const res = await fetch(`/api/superadmin/requests/${userId}/reject`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Reject failed");
      await fetchRequests();
      alert("Rejected.");
    } catch (e) {
      alert(e.message || "Reject failed");
    } finally {
      setBusyId(null);
    }
  }

  // ---- Stored List (Approved organizers) ----
  const toCard = React.useCallback((u) => {
    const joined = u?.createdAt ? new Date(u.createdAt).toISOString().slice(0,10) : "";
    const bio = u?.clubName
      ? `${u.clubPosition ? u.clubPosition + " " : ""}@ ${u.clubName}${u.clubWebsite ? " — " + u.clubWebsite : ""}`
      : "";
    return {
      _id: u._id,
      profile: {
        name: u.fullName,
        username: u.username,
        email: u.email,
        university: u.university,
        role: u.role,
        joined,
        bio,
        avatar: u.clubLogoUrl || "",
      },
      participatedEvents: [],
    };
  }, []);

  const fetchApproved = React.useCallback(async () => {
    setApprovedError("");
    setLoadingApproved(true);
    try {
      const res = await fetch("/api/superadmin/approved", {
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to load approved list");
      setApproved(Array.isArray(data) ? data.map(toCard) : []);
    } catch (e) {
      setApproved([]);
      setApprovedError(e.message || "Failed to load approved organizers");
    } finally {
      setLoadingApproved(false);
    }
  }, [toCard]);

  React.useEffect(() => {
    if (tab === "stored" && approved.length === 0 && !loadingApproved) {
      fetchApproved();
    }
  }, [tab, approved.length, loadingApproved, fetchApproved]);

  // ---- Filter client-side (Approval tab only) ----
  const filteredRequests = React.useMemo(() => {
    const n = searchUserName.trim().toLowerCase();
    const em = searchEmail.trim().toLowerCase();
    const uni = searchUniversity.trim().toLowerCase();

    return requests.filter((u) => {
      const byName =
        !n ||
        (u.fullName && u.fullName.toLowerCase().includes(n)) ||
        (u.username && u.username.toLowerCase().includes(n));
      const byEmail = !em || (u.email && u.email.toLowerCase().includes(em));
      const byUni = !uni || (u.university && u.university.toLowerCase().includes(uni));
      return byName && byEmail && byUni;
    });
  }, [requests, searchUserName, searchEmail, searchUniversity]);

  return (
    <div className="relative isolate min-h-screen">
      <BackgroundFX />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-6">
        {/* Header bar (title + logout) */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white/90">Super Admin Console</h1>
          <button
            onClick={handleLogout}
            className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-black hover:bg-white"
            title="Log out"
          >
            Log out
          </button>
        </div>

        {/* Stats */}
        <HoverEffect items={projects} />

        <hr className="my-8 h-px border-0 bg-gray-200/70" />

        {/* Tabs */}
        <div className="mb-6 flex items-center gap-2">
          <button
            onClick={() => setTab("approval")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition
              ${tab === "approval" ? "bg-white text-black shadow" : "bg-white/10 text-white hover:bg-white/20"}`}
          >
            Approval List
          </button>
          <button
            onClick={() => setTab("stored")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition
              ${tab === "stored" ? "bg-white text-black shadow" : "bg-white/10 text-white hover:bg-white/20"}`}
          >
            Stored List
          </button>

          {tab === "stored" && (
            <button
              onClick={fetchApproved}
              className="ml-2 rounded-full bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20"
              title="Refresh stored list"
            >
              Refresh
            </button>
          )}
        </div>

        {/* Search (only for approval tab) */}
        {tab === "approval" && (
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Username or Name…"
                className="w-full rounded-md bg-white px-3 py-1.5 text-sm text-black placeholder-black sm:w-64"
                value={searchUserName}
                onChange={(e) => setSearchUserName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email…"
                className="w-full rounded-md bg-neutral-200 px-3 py-1.5 text-sm text-black placeholder-gray-600 sm:w-64"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="University…"
                className="w-full rounded-md bg-neutral-200 px-3 py-1.5 text-sm text-black placeholder-gray-600 sm:w-64"
                value={searchUniversity}
                onChange={(e) => setSearchUniversity(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={fetchRequests}
                className="rounded-md bg-white/90 px-3 py-1.5 text-sm font-semibold text-black hover:bg-white disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Refreshing…" : "Refresh"}
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        {tab === "approval" ? (
          <>
            {error && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </div>
            )}
            <ApprovalList
              profiles={filteredRequests}
              onApprove={onApprove}
              onReject={onReject}
              busyId={busyId}
            />
            {!loading && filteredRequests.length === 0 && !error && (
              <p className="mt-6 text-sm text-white/60">No pending organizer requests.</p>
            )}
          </>
        ) : (
          <>
            {loadingApproved && (
              <p className="mt-4 text-sm text-white/70">Loading approved organizers…</p>
            )}
            {approvedError && (
              <p className="mt-4 text-sm text-red-300">{approvedError}</p>
            )}
            {!loadingApproved && !approvedError && (
              <Storedthelist
                profiles={approved}
                searchUserName={searchUserName}
                onSearchUserNameChange={setSearchUserName}
                searchEmail={searchEmail}
                onSearchEmailChange={setSearchEmail}
                searchUniversity={searchUniversity}
                onSearchUniversityChange={setSearchUniversity}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
