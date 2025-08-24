import React from "react";

import ExpandableProfiles from "../cards/ExpendableProfiles";

export default function Storedthelist({
  profiles = [],



  searchUserName,
  onSearchUserNameChange,

  searchEmail,
  onSearchEmailChange,

  searchUniversity,
  onSearchUniversityChange,
}) {
  const filtered = React.useMemo(() => {
    const nameQuery = (searchUserName || "").trim().toLowerCase();
    const emailQuery = (searchEmail || "").trim().toLowerCase();
    const uniQuery = (searchUniversity || "").trim().toLowerCase();

    return (profiles || []).filter((item) => {
      const p = item.profile || {};

      const nameOk =
        !nameQuery ||
        (p.name && p.name.toLowerCase().includes(nameQuery)) ||
        (p.username && p.username.toLowerCase().includes(nameQuery));

      const emailOk = !emailQuery || (p.email && p.email.toLowerCase().includes(emailQuery));

      const uniOk = !uniQuery || (p.university && p.university.toLowerCase().includes(uniQuery));

      return  nameOk && emailOk && uniOk;
    });
  }, [profiles,  searchUserName, searchEmail, searchUniversity]);

  return (
    <div className="space-y-6">
    

      {/* Results */}
      <section className="mt-2">
        {filtered.length ? (
          <ExpandableProfiles profiles={filtered} />
        ) : (
          <p className="text-white/70">No matches found.</p>
        )}
      </section>
    </div>
  );
}


