import React from "react";
import { Outlet } from "react-router-dom";
import SidebarDemo from "@/components/SidebarDemo";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

export default function Student() {
  const links = [
    { label: "My Events",  href: "/student/myevents",  icon: <IconBrandTabler className="h-5 w-5 shrink-0" /> },
    { label: "All Events", href: "/student/allevents", icon: <IconUserBolt className="h-5 w-5 shrink-0" /> },
    { label: "Profile",    href: "/student/myprofile", icon: <IconSettings className="h-5 w-5 shrink-0" /> },
    { label: "Logout",     href: "/",                   icon: <IconArrowLeft className="h-5 w-5 shrink-0" /> },
  ];

  const user = {
    label: "Manu Arora",
    href: "/student/me",
    icon: (
      <img
        src="https://assets.aceternity.com/manu.png"
        className="h-7 w-7 shrink-0 rounded-full"
        alt="Avatar"
      />
    ),
  };

  return (
    <SidebarDemo links={links} defaultOpen={true}>
      {/* Nested routes render here */}
      <Outlet />
    </SidebarDemo>
  );
}