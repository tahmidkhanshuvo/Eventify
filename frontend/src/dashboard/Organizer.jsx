import React from "react";
import { Outlet } from "react-router-dom";
import SidebarDemo from "@/components/SidebarDemo.jsx";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

export default function Organizer() {
  // Use absolute paths that live under /organizers
  const links = [
    { label: "My Events",     href: "/organizers/myevents",   icon: <IconBrandTabler className="h-5 w-5 shrink-0" /> },
    { label: "All Events",    href: "/organizers/allevents",  icon: <IconUserBolt className="h-5 w-5 shrink-0" /> },
    { label: "Create Event",  href: "/organizers/create-event", icon: <IconUserBolt className="h-5 w-5 shrink-0" /> },
    { label: "Profile",       href: "/organizers/myprofile",  icon: <IconSettings className="h-5 w-5 shrink-0" /> },
    { label: "Logout",        href: "/",                      icon: <IconArrowLeft className="h-5 w-5 shrink-0" /> },
  ];

  const user = {
    label: "Manu Arora",
    href: "/organizers/me",
    icon: (
      <img
        src="https://assets.aceternity.com/manu.png"
        className="h-7 w-7 shrink-0 rounded-full"
        alt="Avatar"
      />
    ),
  };

  return (
    <SidebarDemo links={links}  user={user} defaultOpen={true}>
      {/* Nested routes will render here */}
      <Outlet />
    </SidebarDemo>
  );
}