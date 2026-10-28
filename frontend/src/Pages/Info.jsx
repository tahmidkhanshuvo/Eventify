import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const pages = {
  help: [
    "A little help, before your next moment.",
    [
      [
        "Discover and register",
        "Browse upcoming events without an account. Sign up as a student, open an event, and choose Register. Your registrations appear in My Events, where you can cancel while registration is open.",
      ],
      [
        "Organize an event",
        "Create an organizer account with your university and club details. A Super Admin reviews the application. Once approved, use your chosen password to sign in, publish events, set capacity, upload a banner, and view attendees.",
      ],
      [
        "Participation certificates",
        "After an event has ended, registered students can download a participation certificate from the event page or My Events. Registration is required.",
      ],
      [
        "Need more help?",
        "Contact the maintainer at hi@tahmidkhan.com.bd or open an issue in the project repository. Include the page and steps to reproduce the problem; keep passwords and private details out of the report.",
      ],
    ],
  ],
  privacy: [
    "Your information, explained.",
    [
      [
        "Account and registration data",
        "Eventify stores the profile details you submit and the events you register for. Organizers can view attendee information for events they manage. Public club cards show the approved club name, university and optional logo.",
      ],
      [
        "Sign-in and files",
        "The application uses a sign-in token and session cookie. Images are stored with the configured ImageKit account. Certificates are generated when requested. Do not upload confidential material to a public demo.",
      ],
      [
        "Questions and requests",
        "For questions about data associated with this project, contact hi@tahmidkhan.com.bd. Include enough information to identify your account without sending your password.",
      ],
    ],
  ],
  terms: [
    "Before you join in.",
    [
      [
        "About this demonstration",
        "Eventify is a university software project. Event information is submitted by organizers. Confirm dates, locations and participation arrangements with the organizer before making plans.",
      ],
      [
        "Responsible use",
        "Use your own account, publish accurate event details, and upload material you have permission to share. Do not use the demo to submit confidential information or disrupt other users.",
      ],
      [
        "Availability",
        "Free hosting can sleep after inactivity. The first request may take a moment. If a page fails to load, use its retry control and report persistent problems to the maintainer.",
      ],
    ],
  ],
};
export default function Info({ page = "help" }) {
  const [title, sections] = pages[page] || pages.help;
  return (
    <Layout>
      <main className="mx-auto max-w-3xl px-6 py-16 text-white">
        <p className="text-xs uppercase tracking-[.2em] text-sky-200">
          Eventify / {page}
        </p>
        <h1 className="mt-6 text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        <div className="mt-12 space-y-10">
          {sections.map(([heading, text]) => (
            <section key={heading}>
              <h2 className="text-xl">{heading}</h2>
              <p className="mt-4 text-sm leading-8 text-slate-400">{text}</p>
            </section>
          ))}
        </div>
        <Link className="mt-12 inline-block text-sm text-sky-200" to="/events">
          Explore upcoming events ↗
        </Link>
      </main>
    </Layout>
  );
}
