import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Github, Mail } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0c101a] text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-2xl font-semibold tracking-tight text-white"
          >
            <CalendarDays className="text-lime-200" />
            Eventify
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7">
            For the curious, the creators, and the community. Find your next
            campus experience.
          </p>
        </div>
        <nav
          aria-label="Explore"
          className="flex flex-col items-start gap-3 text-sm"
        >
          <h2 className="mb-2 text-xs uppercase tracking-widest text-white">
            Explore
          </h2>
          <Link to="/events">Event calendar</Link>
          <Link to="/club">University clubs</Link>
          <Link to="/signup">Bring your club</Link>
          <Link to="/aboutus">About Eventify</Link>
        </nav>
        <nav
          aria-label="Help and details"
          className="flex flex-col items-start gap-3 text-sm"
        >
          <h2 className="mb-2 text-xs uppercase tracking-widest text-white">
            Help & details
          </h2>
          <Link to="/help">How it works</Link>
          <Link to="/privacy">Privacy & data</Link>
          <Link to="/terms">Demo use</Link>
          <a
            href="mailto:hi@tahmidkhan.com.bd"
            className="inline-flex items-center gap-2"
          >
            <Mail size={14} />
            Contact maintainer
          </a>
          <a
            href="https://github.com/tahmidkhanshuvo/Eventify"
            className="inline-flex items-center gap-2"
          >
            <Github size={14} />
            Source
            <ArrowUpRight size={14} />
          </a>
        </nav>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 border-t border-white/10 px-6 py-6 text-xs">
        <span>© {new Date().getFullYear()} Eventify</span>
        <span>Make your campus moment.</span>
      </div>
    </footer>
  );
}
