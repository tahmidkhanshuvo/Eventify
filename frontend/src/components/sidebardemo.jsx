import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Reusable sidebar that takes `links`, optional `user`, and renders `children` as the main area.
export default function SidebarDemo({
  links = [],
  user = null,
  defaultOpen = false,
  className = "",
  children,
}) {
  const [open, setOpen] = useState(defaultOpen);

  // Fallback example links if none are passed
  const fallbackLinks = [
    {
      label: "Dashboard",
      href: "#",
      icon: <span className="h-5 w-5 shrink-0 rounded bg-black/70" />,
    },
    {
      label: "Profile",
      href: "#",
      icon: <span className="h-5 w-5 shrink-0 rounded bg-black/70" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <span className="h-5 w-5 shrink-0 rounded bg-black/70" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <span className="h-5 w-5 shrink-0 rounded bg-black/70" />,
    },
  ];

  const finalLinks = links.length ? links : fallbackLinks;

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-[60vh]", // for your app, you can switch to `h-screen`
        className
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {finalLinks.map((link, idx) => (
                <SidebarLink key={link.href || idx} link={link} />
              ))}
            </div>
          </div>

          {user ? (
            <div>
              <SidebarLink link={user} />
            </div>
          ) : null}
        </SidebarBody>
      </Sidebar>

      {/* main content area */}
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          {children || <PlaceholderDashboard />}
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="whitespace-pre font-medium text-black dark:text-white"
      >
        Acet Labs
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

// Default placeholder content if no children are passed
const PlaceholderDashboard = () => {
  return (
    <>
      <div className="flex gap-2">
        {[...new Array(4)].map((_, idx) => (
          <div
            key={"first-array-demo-1" + idx}
            className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
          />
        ))}
      </div>
      <div className="flex flex-1 gap-2">
        {[...new Array(2)].map((_, idx) => (
          <div
            key={"second-array-demo-1" + idx}
            className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
          />
        ))}
      </div>
    </>
  );
};
