import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
export default function Club() {
  const [clubs, setClubs] = useState([]),
    [query, setQuery] = useState(""),
    [state, setState] = useState("loading"),
    [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    setState("loading");
    fetch("/api/users/clubs")
      .then(async (response) => {
        if (!response.ok) throw Error();
        return response.json();
      })
      .then((data) => {
        if (active) {
          setClubs(Array.isArray(data) ? data : []);
          setState("ready");
        }
      })
      .catch(() => {
        if (active) setState("error");
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  const filtered = clubs.filter((club) =>
    [club.clubName, club.university].some((value) =>
      String(value || "")
        .toLowerCase()
        .includes(query.toLowerCase()),
    ),
  );
  return (
    <Layout>
      <main className="mx-auto min-h-[65vh] max-w-7xl px-6 py-16 text-white">
        <p className="text-xs uppercase tracking-[.2em] text-sky-200">
          Campus life, connected
        </p>
        <h1 className="mt-5 text-4xl font-medium tracking-tight sm:text-6xl">
          Find your community.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
          Explore clubs with approved organizer profiles on Eventify. Open a
          club to discover its upcoming events.
        </p>
        <label className="mt-10 block max-w-md text-xs text-slate-400">
          Search clubs or universities
          <input
            className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 p-4 text-sm text-white outline-none focus:border-indigo-300"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a club…"
          />
        </label>
        {state === "loading" ? (
          <p role="status" className="py-12 text-slate-400">
            Loading university clubs…
          </p>
        ) : state === "error" ? (
          <div role="alert" className="py-12 text-slate-400">
            We couldn't load clubs.{" "}
            <button
              className="ml-3 text-sky-200 underline"
              onClick={() => setAttempt((value) => value + 1)}
            >
              Try again
            </button>
          </div>
        ) : filtered.length ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((club) => (
              <Link
                key={club._id}
                to={"/events?q=" + encodeURIComponent(club.clubName)}
                className="group rounded-2xl border border-white/10 bg-white/[.035] p-6 transition-colors hover:border-indigo-300/50"
              >
                <div className="mb-7 flex items-center justify-between">
                  {club.clubLogoUrl ? (
                    <img
                      src={club.clubLogoUrl}
                      alt=""
                      className="h-16 w-16 rounded-xl bg-white/5 object-contain"
                    />
                  ) : (
                    <Building2 className="text-sky-200" size={32} />
                  )}
                  <ArrowUpRight
                    size={20}
                    className="text-slate-500 group-hover:text-sky-200"
                  />
                </div>
                <h2 className="text-lg">{club.clubName}</h2>
                <p className="mt-2 text-xs text-slate-400">{club.university}</p>
                <span className="mt-6 block text-xs text-sky-200">
                  Explore events ↗
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="my-12 rounded-2xl border border-dashed border-white/15 p-10 text-center text-slate-400">
            <p>
              {query
                ? "No clubs match your search."
                : "Clubs will appear here once their organizer applications are approved."}
            </p>
            <Link
              className="mt-5 inline-block text-sm text-sky-200"
              to="/signup"
            >
              Register your club ↗
            </Link>
          </div>
        )}
      </main>
    </Layout>
  );
}
