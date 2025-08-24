import React from "react";
import ExpandableProfilesApproval from "../cards/ExpandableProfilesApproval";

export default function ApprovalList({
  profiles = [],
  onApprove,
  onReject,
  busyId,
}) {
  return (
    <section className="mt-2">
      <ExpandableProfilesApproval
        profiles={profiles}
        onApprove={onApprove}
        onReject={onReject}
        busyId={busyId}
      />
    </section>
  );
}
