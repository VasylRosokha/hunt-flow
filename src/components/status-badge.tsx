import type { ApplicationStatus } from "@/generated/prisma/enums";

const statusStyles: Record<ApplicationStatus, string> = {
  SAVED: "bg-gray-100 text-gray-700",
  APPLIED: "bg-blue-100 text-blue-700",
  SCREENING: "bg-cyan-100 text-cyan-700",
  INTERVIEW: "bg-purple-100 text-purple-700",
  TECHNICAL: "bg-indigo-100 text-indigo-700",
  OFFER: "bg-green-100 text-green-700",
  ACCEPTED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-red-100 text-red-700",
  WITHDRAWN: "bg-gray-100 text-gray-400 line-through",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}