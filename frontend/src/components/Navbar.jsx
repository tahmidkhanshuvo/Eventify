import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CalendarDays, Menu, X, ArrowUpRight } from "lucide-react";
export default function Navbar({ user, onLogout = () => {} }) {
  const [open, setOpen] = useState(false),
    { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const dashboard =
    user?.role === "Organizer"
      ? "/organizers"
      : user?.role === "Super Admin"
        ? "/admin"
        : "/student";
  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-xs transition-colors ${isActive ? "text-lime-200" : "text-slate-400 hover:text-white"}`;
  const links = (
    <>
      <NavLink className={navClass} to="/events">
        Event calendar
      </NavLink>
      <NavLink className={navClass} to="/club">
        Clubs
      </NavLink>
      <NavLink className={navClass} to="/aboutus">
        About
      </NavLink>
      {user ? (
        <>
          <Link
            to={dashboard}
            className="inline-flex items-center gap-2 rounded-lg bg-lime-200 px-4 py-3 text-xs font-medium text-[#121820]"
          >
            Dashboard
            <ArrowUpRight size={14} />
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="px-3 py-2 text-xs text-slate-400 hover:text-white"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="px-3 py-2 text-xs text-slate-300">
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-lime-200 px-4 py-3 text-xs font-medium text-[#121820]"
          >
            Join the community ↗
          </Link>
        </>
      )}
    </>
  );
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c101a]/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-8 px-6">
        <Link
          to="/"
          aria-label="Eventify home"
          className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-lime-200 text-[#121820]">
            <CalendarDays size={20} />
          </span>
          Eventify
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-4 md:flex"
        >
          {links}
        </nav>
        <button
          className="rounded-lg border border-white/15 p-2 md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="eventify-mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav
          id="eventify-mobile-menu"
          aria-label="Mobile navigation"
          className="flex flex-col items-start gap-3 border-t border-white/10 px-6 py-5 md:hidden"
        >
          {links}
        </nav>
      )}
    </header>
  );
}
