// src/SuperAdmin/ApprovalList.jsx
import React from "react";
import ExpandableProfilesApproval from "../cards/ExpandableProfilesApproval";

export default function ApprovalList({ profiles = [] }) {
  // It just forwards the profiles to your expandable card list.
  // The Approve button (inside ExpandableProfiles) saves to localStorage and can navigate if you kept that logic.
  return (
    <section className="mt-2">
      <ExpandableProfilesApproval profiles={profiles} />
    </section>
  );
}
