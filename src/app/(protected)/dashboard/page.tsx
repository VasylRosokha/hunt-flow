import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/status-badge";
import type { ApplicationStatus } from "@/generated/prisma/enums";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const userId = session.user.id;
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 86_400_000);

  const [applications, recentChanges, thisWeekCount] = await Promise.all([
    prisma.application.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.statusChange.findMany({
      where: { application: { userId } },
      include: { application: { select: { company: true, position: true } } },
      orderBy: { changedAt: "desc" },
      take: 5,
    }),
    prisma.application.count({
      where: { userId, createdAt: { gte: weekAgo } },
    }),
  ]);

  const total = applications.length;
  const pastApplied = applications.filter((a) => a.status !== "SAVED").length;
  const responded = applications.filter((a) =>
    ["SCREENING", "INTERVIEW", "TECHNICAL", "OFFER", "ACCEPTED", "REJECTED"].includes(a.status)
  ).length;
  const responseRate = pastApplied > 0 ? Math.round((responded / pastApplied) * 100) : 0;

  const respondedApps = applications.filter(
    (a) => a.appliedAt && a.respondedAt
  );
  const avgDaysToResponse =
    respondedApps.length > 0
      ? Math.round(
          respondedApps.reduce(
            (sum, a) =>
              sum +
              (a.respondedAt!.getTime() - a.appliedAt!.getTime()) / 86_400_000,
            0
          ) / respondedApps.length
        )
      : null;

  const statusCounts: Partial<Record<ApplicationStatus, number>> = {};
  for (const app of applications) {
    statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2">
          <Link
            href="/applications/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Add application
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Applications" value={total} />
        <StatCard label="Response Rate" value={`${responseRate}%`} />
        <StatCard label="This Week" value={thisWeekCount} />
        <StatCard
          label="Avg. Days to Response"
          value={avgDaysToResponse ?? "—"}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Status Breakdown
          </h2>
          {total === 0 ? (
            <p className="mt-4 text-sm text-gray-400">No applications yet.</p>
          ) : (
            <div className="mt-4 space-y-2">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="flex items-center gap-3">
                  <StatusBadge status={status as ApplicationStatus} />
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${(count / total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="font-mono text-xs text-gray-500">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Recent Activity
          </h2>
          {recentChanges.length === 0 ? (
            <p className="mt-4 text-sm text-gray-400">No activity yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {recentChanges.map((change) => {
                const daysAgo = Math.floor(
                  (now.getTime() - change.changedAt.getTime()) / 86_400_000
                );
                return (
                  <li key={change.id} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                    <div className="text-sm">
                      <p className="text-gray-700">
                        <span className="font-medium">
                          {change.application.position}
                        </span>{" "}
                        at {change.application.company}
                      </p>
                      <p className="text-xs text-gray-400">
                        {change.fromStatus.charAt(0) +
                          change.fromStatus.slice(1).toLowerCase()}{" "}
                        &rarr;{" "}
                        {change.toStatus.charAt(0) +
                          change.toStatus.slice(1).toLowerCase()}{" "}
                        &middot;{" "}
                        {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}