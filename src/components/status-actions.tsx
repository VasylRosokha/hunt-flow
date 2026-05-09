"use client";

import { updateApplicationStatus } from "@/lib/actions/applications";
import { ApplicationStatus } from "@/generated/prisma/enums";

const transitions: Record<ApplicationStatus, ApplicationStatus[]> = {
  SAVED: ["APPLIED", "WITHDRAWN"],
  APPLIED: ["SCREENING", "INTERVIEW", "REJECTED", "WITHDRAWN"],
  SCREENING: ["INTERVIEW", "TECHNICAL", "REJECTED", "WITHDRAWN"],
  INTERVIEW: ["TECHNICAL", "OFFER", "REJECTED", "WITHDRAWN"],
  TECHNICAL: ["OFFER", "REJECTED", "WITHDRAWN"],
  OFFER: ["ACCEPTED", "REJECTED", "WITHDRAWN"],
  ACCEPTED: [],
  REJECTED: [],
  WITHDRAWN: [],
};

export function StatusActions({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: ApplicationStatus;
}) {
  const nextStatuses = transitions[currentStatus];
  if (nextStatuses.length === 0) return null;

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
        Update Status
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {nextStatuses.map((status) => (
          <button
            key={status}
            onClick={() => updateApplicationStatus(applicationId, status)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
    </div>
  );
}