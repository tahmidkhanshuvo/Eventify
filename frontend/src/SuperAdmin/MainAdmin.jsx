// src/SuperAdmin/MainAdmin.jsx
import React, { useMemo, useState } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
import ExpandableProfiles from "../cards/ExpendableProfiles";
import BackgroundFX from "../components/BackgroundFX";
// Demo stats (unchanged)
export const projects = [
  { id: 1, name: "Working", description: "Events That Running", count: 10 },
  { id: 2, name: "Upcoming", description: "Events Are Upcoming", count: 5 },
  { id: 3, name: "Done", description: "Events are Fully Finished", count: 8 },
];

// Dummy directory with roles + universities
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

const MainAdmin = () => {
  // text inputs
  const [searchUserName, setSearchUserName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchUniversity, setSearchUniversity] = useState("");

  // role toggle: ON => Students, OFF => Organizers
  const [showStudents, setShowStudents] = useState(true);

  // === filtering logic ===
  const filtered = useMemo(() => {
    const uname = searchUserName.trim().toLowerCase();
    const email = searchEmail.trim().toLowerCase();
    const univ = searchUniversity.trim().toLowerCase();

    return DIRECTORY.filter((item) => {
      const p = item.profile;

      // role filter
      const roleOk = showStudents ? p.role === "Student" : p.role === "Organizer";

      // OR logic across username/email/university (blank inputs are ignored)
      const matchesUser =
        !uname || p.username.toLowerCase().includes(uname) || p.name.toLowerCase().includes(uname);
      const matchesEmail = !email || p.email.toLowerCase().includes(email);
      const matchesUniv = !univ || (p.university || "").toLowerCase().includes(univ);

      // overall: role must match AND any of the text filters must match
      // If all three inputs are blank, the OR block becomes true by default because each matcher returns true when its input is blank.
      const textOk = matchesUser || matchesEmail || matchesUniv;

      return roleOk && textOk;
    });
  }, [showStudents, searchUserName, searchEmail, searchUniversity]);

  return (
    <div >
      <BackgroundFX/>
    <div className="max-w-7xl mx-auto p-4">
      <HoverEffect items={projects} />

      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-300 my-10" />

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Switch + labels */}
        <div className="flex items-center gap-3">
          <Switch
            slotProps={{ input: { "aria-label": "filter by role" } }}
            sx={{
              // track always grey
              "--Switch-trackBackground": "var(--color-gray-300)",
              "--Switch-trackColor": "#fff",
              "--Switch-trackBorderWidth": "2px",
              "--Switch-trackBorderColor": "var(--color-gray-400)",
              // thumb color shows active role
              "--Switch-thumbBackground": showStudents ? "var(--color-accent)" : "var(--color-primary)",
              "--Switch-thumbSize": "16px",
              borderRadius: "9999px",
            }}
            checked={showStudents}
            onChange={(e) => setShowStudents(e.target.checked)}
            startDecorator={
              <Typography
                level="body-sm"
                sx={{
                  fontWeight: "bold",
                  color: showStudents ? "var(--color-accent)" : "var(--joy-palette-text-tertiary)",
                }}
              >
                Organizer
              </Typography>
            }
            endDecorator={
              <Typography
                level="body-sm"
                sx={{
                  fontWeight: "bold",
                  color: !showStudents ? "var(--color-primary)" : "var(--joy-palette-text-tertiary)",
                }}
              >Student
                
              </Typography>
            }
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:justify-end">
          <input
            type="text"
            placeholder="Username or Name…"
            className="w-full sm:w-64 px-3 py-1.5 rounded-md bg-white placeholder-black text-black text-sm"
            value={searchUserName}
            onChange={(e) => setSearchUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email…"
            className="w-full sm:w-64 px-3 py-1.5 rounded-md bg-neutral-200 placeholder-gray-600 text-black text-sm"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="University…"
            className="w-full sm:w-64 px-3 py-1.5 rounded-md bg-neutral-200 placeholder-gray-600 text-black text-sm"
            value={searchUniversity}
            onChange={(e) => setSearchUniversity(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      <section className="mt-6">
        <ExpandableProfiles profiles={filtered} />
      </section>
    </div>
    </div>
  );
};

export default MainAdmin;
