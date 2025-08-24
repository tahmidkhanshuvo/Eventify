import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function SidebarDemo({
  links = [],
  user = null,
  defaultOpen = false,
  className = "",
  children, // we will render <Outlet /> from the parent here
}) {
  const [open, setOpen] = useState(defaultOpen);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const fallbackLinks = [
    { label: "My Events", href: "/student/myevents", icon: <span className="h-5 w-5 shrink-0 rounded bg-white" /> },
    { label: "All Events", href: "/student/allevents", icon: <span className="h-5 w-5 shrink-0 rounded bg-white" /> },
    { label: "Profile", href: "/student/myprofile", icon: <span className="h-5 w-5 shrink-0 rounded bg-white" /> },
    { label: "Logout", href: "/", icon: <span className="h-5 w-5 shrink-0 rounded bg-white" /> },
  ];
  const finalLinks = links.length ? links : fallbackLinks;

  return (
    <div
      className={cn(
        "fixed inset-0 flex h-dvh w-screen overflow-hidden md:flex-row", 
        "bg-transparent", 
        className
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="min-h-0 justify-between gap-10 bg-black">
          <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <div className="mt-8 flex flex-col gap-2">
              {finalLinks.map((link, idx) => {
                const active = pathname === link.href || pathname.startsWith(link.href);
                return (
                  <SidebarLink
                    key={link.href || idx}
                    link={link}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.href); // route change
                    }}
                    className="rounded-md px-2 bg-transparent hover:bg-transparent focus:bg-transparent"
                    labelClassName={cn("!text-white", active && "font-semibold")}
                    iconClassName="!text-white"
                    aria-current={active ? "page" : undefined}
                  />
                );
              })}
            </div>
          </div>

          {user ? (
            <div>
              <SidebarLink
                link={user}
                className="bg-transparent hover:bg-transparent"
                labelClassName="!text-white"
                iconClassName="!text-white"
              />
            </div>
          ) : null}
        </SidebarBody>
      </Sidebar>

      {/* Right content area (renders <Outlet /> that the parent passes as children) */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="min-h-0 flex w-full flex-1 flex-col gap-4 overflow-y-auto bg-transparent p-4 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export const Logo = () => (
  <a href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-pre font-medium text-black dark:text-white">
      Acet Labs
    </motion.span>
  </a>
);

export const LogoIcon = () => (
  <a href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
  </a>
);

function PlaceholderDashboard({ className }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 w-full rounded-lg bg-transparent ring-1 ring-white/10 animate-pulse" />
        ))}
      </div>
      <div className="flex flex-1 gap-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-64 w-full rounded-lg bg-transparent ring-1 ring-white/10 animate-pulse" />
        ))}
      </div>
    </div>
  );
}