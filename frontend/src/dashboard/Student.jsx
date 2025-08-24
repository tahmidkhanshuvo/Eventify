// src/dashboard/Student.jsx
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
  // Use absolute nested paths so they always resolve correctly
  const links = [
    {
      label: "My Events",
      href: "/myevents",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0" />,
    },
    {
      label: "All Events",
      href: "/allevents",
      icon: <IconUserBolt className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Profile",
      href: "/myprofile",
      icon: <IconSettings className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Logout",
      href: "/",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0" />,
    },
  ];

  const user = {
    label: "Manu Arora",
    href: "/students/me",
    icon: (
      <img
        src="https://assets.aceternity.com/manu.png"
        className="h-7 w-7 shrink-0 rounded-full"
        alt="Avatar"
      />
    ),
  };

  return (
    <SidebarDemo links={links}  defaultOpen={true}>
      {/* This is where nested routes render */}
      <div className="bg-transparent">
        <Outlet />
      </div>
    </SidebarDemo>
  );
}
