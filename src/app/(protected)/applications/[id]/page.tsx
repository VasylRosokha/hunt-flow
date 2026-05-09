import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/status-badge";
import { StatusActions } from "@/components/status-actions";
import { DeleteButton } from "@/components/delete-button";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) notFound();

  const { id } = await params;

  const application = await prisma.application.findFirst({
    where: { id, userId: session.user.id },
    include: {
      statusHistory: { orderBy: { changedAt: "asc" } },
      coverLetters: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!application) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{application.position}</h1>
          <p className="mt-1 text-lg text-gray-500">{application.company}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/applications/${id}/edit`}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Edit
          </Link>
          <DeleteButton id={id} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Details
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <InfoItem label="Status">
                <StatusBadge status={application.status} />
              </InfoItem>
              {application.location && (
                <InfoItem label="Location">{application.location}</InfoItem>
              )}
              {application.salary && (
                <InfoItem label="Salary">{application.salary}</InfoItem>
              )}
              {application.platform && (
                <InfoItem label="Platform">{application.platform}</InfoItem>
              )}
              {application.url && (
                <InfoItem label="Job URL">
                  <a
                    href={application.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 truncate"
                  >
                    {application.url}
                  </a>
                </InfoItem>
              )}
              {application.aiMatchScore != null && (
                <InfoItem label="AI Match Score">
                  <span className="font-mono text-sm">
                    {application.aiMatchScore}%
                  </span>
                </InfoItem>
              )}
              {application.appliedAt && (
                <InfoItem label="Applied">
                  {application.appliedAt.toLocaleDateString()}
                </InfoItem>
              )}
              <InfoItem label="Added">
                {application.createdAt.toLocaleDateString()}
              </InfoItem>
            </dl>
          </div>

          <StatusActions
            applicationId={id}
            currentStatus={application.status}
          />

          {application.jobDescription && (
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Job Description
              </h2>
              <p className="mt-3 whitespace-pre-wrap text-sm text-gray-700">
                {application.jobDescription}
              </p>
            </div>
          )}

          {application.aiAnalysis && (
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                AI Analysis
              </h2>
              <p className="mt-3 whitespace-pre-wrap text-sm text-gray-700">
                {application.aiAnalysis}
              </p>
            </div>
          )}

          {(application.contactName || application.contactEmail) && (
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Contact
              </h2>
              <div className="mt-3 text-sm text-gray-700">
                {application.contactName && <p>{application.contactName}</p>}
                {application.contactEmail && (
                  <a
                    href={`mailto:${application.contactEmail}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {application.contactEmail}
                  </a>
                )}
              </div>
            </div>
          )}

          {application.notes && (
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Notes
              </h2>
              <p className="mt-3 whitespace-pre-wrap text-sm text-gray-700">
                {application.notes}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Status History
            </h2>
            {application.statusHistory.length === 0 ? (
              <p className="mt-3 text-sm text-gray-400">No status changes yet.</p>
            ) : (
              <ol className="mt-4 space-y-4">
                {application.statusHistory.map((change) => (
                  <li key={change.id} className="relative pl-6">
                    <div className="absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-blue-600 bg-white" />
                    <p className="text-sm font-medium text-gray-900">
                      {change.fromStatus.charAt(0) +
                        change.fromStatus.slice(1).toLowerCase()}{" "}
                      &rarr;{" "}
                      {change.toStatus.charAt(0) +
                        change.toStatus.slice(1).toLowerCase()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {change.changedAt.toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {application.coverLetters.length > 0 && (
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Cover Letters
              </h2>
              <ul className="mt-4 space-y-3">
                {application.coverLetters.map((cl) => (
                  <li
                    key={cl.id}
                    className="rounded-lg border border-gray-200 p-3"
                  >
                    <p className="text-xs text-gray-400">
                      {cl.createdAt.toLocaleDateString()} &middot; {cl.tone}
                    </p>
                    <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                      {cl.content}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-medium text-gray-400">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{children}</dd>
    </div>
  );
}