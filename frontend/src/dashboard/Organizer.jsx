// Example usage (React Router or plain anchors both work)
import React from "react";
import SidebarDemo from "@/components/SidebarDemo";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

export default function Organizer() {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const user = {
    label: "Manu Arora",
    href: "/me",
    icon: (
      <img
        src="https://assets.aceternity.com/manu.png"
        className="h-7 w-7 shrink-0 rounded-full"
        width={50}
        height={50}
        alt="Avatar"
      />
    ),
  };

  return (
    <SidebarDemo links={links} user={user} defaultOpen={true}>
      {/* your routed content or any JSX */}
      <div className="prose">
        <h2>Welcome!</h2>
        <p>Render your page content here.</p>
      </div>
    </SidebarDemo>
  );
}
