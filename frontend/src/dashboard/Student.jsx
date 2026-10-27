import React from "react";
import { Outlet } from "react-router-dom";
import SidebarDemo from "../components/sidebardemo.jsx";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

export default function Student() {
  const links = [
    {
      label: "My Events",
      href: "/student/myevents",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0" />,
    },
    {
      label: "All Events",
      href: "/student/allevents",
      icon: <IconUserBolt className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Profile",
      href: "/student/myprofile",
      icon: <IconSettings className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Logout",
      href: "/logout",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0" />,
    },
  ];

  return (
    <SidebarDemo links={links} defaultOpen={true}>
      {/* Nested routes render here */}
      <Outlet />
    </SidebarDemo>
  );
}
