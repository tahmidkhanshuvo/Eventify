"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

/**
 * Navbar (auth-aware)
 * - Shows Log in / Sign up when logged out
 * - Shows Dashboard + Logout when logged in
 * - Mobile drawer includes the same actions
 */
export default function Navbar({ user, onLogout = () => {} }) {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Events", link: "/events" },
    { name: "Clubs", link: "/clubs" },
    { name: "About Us", link: "/aboutus" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Updated: Student -> /student, Organizer -> /organizers, else /
  const dashboardLink =
    user?.role === "Student"
      ? "/student"
      : user?.role === "Organizer"
      ? "/organizers"
      : "/";

  return (
    <div className="relative w-full">
      <ResizableNavbar>
        {/* Desktop */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <NavbarButton
                  variant="secondary"
                  href="/login"
                  className="!text-white hover:!text-black transition-colors"
                >
                  Log in
                </NavbarButton>
                <NavbarButton variant="primary" href="/signup">
                  Sign up
                </NavbarButton>
              </>
            ) : (
              <>
                <NavbarButton
                  variant="secondary"
                  href={dashboardLink}
                  className="!text-white hover:!text-black transition-colors"
                >
                  Dashboard
                </NavbarButton>
                <NavbarButton as="button" onClick={onLogout} variant="primary">
                  Logout
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-700 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            <div className="flex w-full flex-col gap-3 pt-2">
              {!user ? (
                <>
                  <NavbarButton
                    variant="secondary"
                    className="w-full"
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log in
                  </NavbarButton>
                  <NavbarButton
                    variant="primary"
                    className="w-full"
                    href="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </NavbarButton>
                </>
              ) : (
                <>
                  <NavbarButton
                    variant="secondary"
                    className="w-full"
                    href={dashboardLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavbarButton>
                  <NavbarButton
                    as="button"
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                  >
                    Logout
                  </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}

/* ---------- Building blocks ---------- */

function ResizableNavbar({ children, className }) {
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div ref={ref} className={cn("sticky top-10 z-40 mt-16 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { visible }) : child
      )}
    </motion.div>
  );
}

function NavBody({ children, className, visible }) {
  return (
    <motion.div
      animate={{
        backdropFilter: "blur(16px)",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-4xl flex-row items-center justify-between self-start px-6 py-2 lg:flex",
        "rounded-full border border-white/15 bg-white/10 backdrop-blur-xl",
        "dark:border-white/10 dark:bg-neutral-900/40",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#7d9dd2]/10 to-[#3fc3b1]/10" />
      {children}
    </motion.div>
  );
}

function NavItems({ items = [], className, onItemClick }) {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-white hover:text-black dark:text-white dark:hover:text-black transition-colors"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div layoutId="hovered" className="absolute inset-0 h-full w-full rounded-full bg-white/80" />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
}

function MobileNav({ children, className, visible }) {
  return (
    <motion.div
      animate={{
        backdropFilter: "blur(16px)",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: "9999px",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-0 py-2 lg:hidden",
        "rounded-full border border-white/15 bg-white/10 backdrop-blur-xl",
        "dark:border-white/10 dark:bg-neutral-900/40",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#7d9dd2]/10 to-[#3fc3b1]/10" />
      {children}
    </motion.div>
  );
}

function MobileNavHeader({ children, className }) {
  return <div className={cn("flex w-full flex-row items-center justify-between", className)}>{children}</div>;
}

function MobileNavMenu({ children, className, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-white/90 px-4 py-8 backdrop-blur-xl border border-white/20 shadow-none dark:bg-neutral-950/90 dark:border-white/10",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileNavToggle({ isOpen, onClick }) {
  return isOpen ? (
    <IconX className="text-black dark:text-white cursor-pointer" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white cursor-pointer" onClick={onClick} />
  );
}

/* Logo */
function NavbarLogo() {
  return (
    <a
      href="/"
      className="relative z-20 mr-2 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
    >
      <img
        src="https://ik.imagekit.io/qlaegzdb2/Eventify-white.png?updatedAt=1756038031417"
        alt="Eventify logo"
        width={150}
        height={50}
        className="object-contain"
      />
    </a>
  );
}

function NavbarButton({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}) {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary:
      "bg-transparent shadow-none dark:text:white border border-white/20 hover:bg-white/20 hover:backdrop-blur-xl",
    dark:
      "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={Tag === "a" ? href : undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
