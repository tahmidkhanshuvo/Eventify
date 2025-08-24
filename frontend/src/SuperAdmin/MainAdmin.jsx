// src/SuperAdmin/MainAdmin.jsx
import React from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import BackgroundFX from "../components/BackgroundFX";
import Storedthelist from "./Storedthelist";
import ApprovalList from "./ApprovalList"; // wrapper that renders ExpandableProfiles

// Demo stats (unchanged)
export const projects = [
  { id: 1, name: "Working", description: "Events That Running", count: 10 },
  { id: 2, name: "Upcoming", description: "Events Are Upcoming", count: 5 },
  { id: 3, name: "Done", description: "Events are Fully Finished", count: 8 },
];

// ✅ Dummy candidates to approve (passed into ApprovalList)
const approvalCandidates = [
  {
    id: 101,
    profile: {
      name: "Aisha Rahman",
      username: "aisha_r",
      email: "aisha@example.com",
      role: "Student",
      joined: "2024-03-11",
      university: "North South University",
      bio: "CS undergrad passionate about hackathons & ML.",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=600",
    },
    participatedEvents: [
      { id: "e1", title: "AI Bootcamp", date: "2024-06-01", status: "Completed" },
      { id: "e2", title: "HackFest 2024", date: "2024-07-12", status: "Completed" },
    ],
  },
  {
    id: 102,
    profile: {
      name: "Rifat Hasan",
      username: "rifat_h",
      email: "rifat@example.com",
      role: "Organizer",
      joined: "2023-11-28",
      university: "BRAC University",
      bio: "Organizes meetups & workshops for web devs.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=jpg&q=60&w=600",
    },
    participatedEvents: [
      { id: "e3", title: "React Summit", date: "2024-04-20", status: "Organizer" },
      { id: "e4", title: "DevOps Day", date: "2024-08-16", status: "Speaker" },
    ],
  },
  {
    id: 103,
    profile: {
      name: "Nusrat Jahan",
      username: "nusratj",
      email: "nusrat@example.com",
      role: "Student",
      joined: "2024-01-02",
      university: "Dhaka University",
      bio: "Frontend learner, loves design systems.",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?fm=jpg&q=60&w=600",
    },
    participatedEvents: [
      { id: "e5", title: "Design Systems 101", date: "2024-05-08", status: "Completed" },
      { id: "e6", title: "UI Marathon", date: "2024-09-21", status: "Registered" },
    ],
  },
];
const DIRECTORY = [
  {
    id: 1,
    profile: {
      name: "Aisha Rahman",
      username: "aisha_r",
      email: "aisha@example.com",
      role: "Student",
      joined: "2024-03-11",
      university: "North South University",
      bio: "CS undergrad passionate about hackathons & ML.",
    },
    participatedEvents: [
      { id: "e1", title: "AI Bootcamp", date: "2024-06-01", status: "Completed" },
      { id: "e2", title: "HackFest 2024", date: "2024-07-12", status: "Completed" },
      { id: "e3", title: "JS Camp", date: "2024-10-05", status: "Registered" },
    ],
  },
  {
    id: 2,
    profile: {
      name: "Rifat Hasan",
      username: "rifat_h",
      email: "rifat@example.com",
      role: "Organizer",
      joined: "2023-11-28",
      university: "BRAC University",
      bio: "Organizes meetups & workshops for web devs.",
    },
    participatedEvents: [
      { id: "e1", title: "React Summit", date: "2024-04-20", status: "Organizer" },
      { id: "e2", title: "DevOps Day", date: "2024-08-16", status: "Speaker" },
    ],
  },
  {
    id: 3,
    profile: {
      name: "Nusrat Jahan",
      username: "nusratj",
      email: "nusrat@example.com",
      role: "Student",
      joined: "2024-01-02",
      university: "Dhaka University",
      bio: "Frontend learner, loves design systems.",
    },
    participatedEvents: [
      { id: "e1", title: "Design Systems 101", date: "2024-05-08", status: "Completed" },
      { id: "e2", title: "UI Marathon", date: "2024-09-21", status: "Registered" },
    ],
  },
];


export default function MainAdmin() {
  // search inputs for Approval List
  const [searchUserName, setSearchUserName] = React.useState("");
  const [searchEmail, setSearchEmail] = React.useState("");
  const [searchUniversity, setSearchUniversity] = React.useState("");

  // tabs
  const [tab, setTab] = React.useState("approval"); // default

  // filter only for the Approval List
  const filteredApproval = React.useMemo(() => {
    const nameQuery = searchUserName.trim().toLowerCase();
    const emailQuery = searchEmail.trim().toLowerCase();
    const uniQuery = searchUniversity.trim().toLowerCase();

    return approvalCandidates.filter((item) => {
      const p = item.profile || {};
      const byName =
        !nameQuery ||
        (p.name && p.name.toLowerCase().includes(nameQuery)) ||
        (p.username && p.username.toLowerCase().includes(nameQuery));
      const byEmail = !emailQuery || (p.email && p.email.toLowerCase().includes(emailQuery));
      const byUni = !uniQuery || (p.university && p.university.toLowerCase().includes(uniQuery));
      return byName && byEmail && byUni;
    });
  }, [searchUserName, searchEmail, searchUniversity]);

  return (
    <div className="relative isolate min-h-screen">
      <BackgroundFX />

      <div className="mx-auto px-10 relative z-10 max-h-[100dvh] max-w-full overflow-auto ">
        <HoverEffect items={projects} />

        <hr className="my-10 h-px border-0 bg-gray-200 dark:bg-gray-300" />

        {/* Tab buttons */}
        <div className="mb-6 flex items-center gap-2">
          <button
            onClick={() => setTab("approval")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition
              ${
                tab === "approval"
                  ? "bg-white text-black shadow"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
          >
            Approval List
          </button>
          <button
            onClick={() => setTab("stored")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition
              ${
                tab === "stored"
                  ? "bg-white text-black shadow"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
          >
            Stored List
          </button>
        </div>

        {/* Search controls (apply to Approval List only) */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ">
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
        </div>

        {/* Panels */}
        {tab === "approval" ? (
          <ApprovalList profiles={filteredApproval} />
        ) : (
          <Storedthelist 
            profiles={DIRECTORY}
  searchUserName={searchUserName}
  onSearchUserNameChange={setSearchUserName}
  searchEmail={searchEmail}
  onSearchEmailChange={setSearchEmail}
  searchUniversity={searchUniversity}
  onSearchUniversityChange={setSearchUniversity}/>
        )}
      </div>
    </div>
  );
}
