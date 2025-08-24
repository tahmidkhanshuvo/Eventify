import React from "react";
import { Outlet } from "react-router-dom";
import SidebarDemo from "@/components/SidebarDemo";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";

export default function Organizer() {
  const links = [
    { label: "My Events",    href: "/organizers/myevents",     icon: <IconBrandTabler className="h-5 w-5 shrink-0" /> },
    { label: "All Events",   href: "/organizers/allevents",    icon: <IconUserBolt className="h-5 w-5 shrink-0" /> },
    { label: "Create Event", href: "/organizers/create-event", icon: <IconUserBolt className="h-5 w-5 shrink-0" /> },
    { label: "Profile",      href: "/organizers/profileorganizers", icon: <IconSettings className="h-5 w-5 shrink-0" /> },
    { label: "Logout",       href: "/",                        icon: <IconArrowLeft className="h-5 w-5 shrink-0" /> },
  ];

  return (
    <SidebarDemo links={links} defaultOpen={true}>
      <Outlet />
    </SidebarDemo>
  );
}
