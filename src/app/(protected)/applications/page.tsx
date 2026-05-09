import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/status-badge";
import { ApplicationStatus } from "@/generated/prisma/enums";
import { DeleteButton } from "@/components/delete-button";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    platform?: string;
    q?: string;
    sort?: string;
  }>;
}) {
  const session = await auth();
  if (!session?.user?.id) return null;

  const { status, platform, q, sort } = await searchParams;

  const where: Record<string, unknown> = { userId: session.user.id };

  if (status) {
    where.status = { in: status.split(",") };
  }
  if (platform) {
    where.platform = platform;
  }
  if (q) {
    where.OR = [
      { company: { contains: q, mode: "insensitive" } },
      { position: { contains: q, mode: "insensitive" } },
    ];
  }

  const orderBy =
    sort === "oldest"
      ? { createdAt: "asc" as const }
      : sort === "score"
        ? { aiMatchScore: { sort: "desc" as const, nulls: "last" as const } }
        : { createdAt: "desc" as const };

  const applications = await prisma.application.findMany({
    where,
    orderBy,
  });

  const now = new Date();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Applications</h1>
        <Link
          href="/applications/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Add application
        </Link>
      </div>

      <div className="mt-6">
        <form className="flex flex-wrap items-center gap-3">
          <input
            name="q"
            type="search"
            placeholder="Search company or position..."
            defaultValue={q}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <select
            name="status"
            defaultValue={status}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
          >
            <option value="">All statuses</option>
            {Object.values(ApplicationStatus).map((s) => (
              <option key={s} value={s}>
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <select
            name="sort"
            defaultValue={sort}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="score">Match score</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            Filter
          </button>
        </form>
      </div>

      {applications.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-gray-500">No applications found.</p>
          <Link
            href="/applications/new"
            className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Add your first application
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs font-medium uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Position</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3">Platform</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => {
                  const daysSinceUpdate = Math.floor(
                    (now.getTime() - app.updatedAt.getTime()) / 86_400_000
                  );
                  const needsFollowUp =
                    app.status === "APPLIED" && daysSinceUpdate >= 7;

                  return (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">
                        <Link
                          href={`/applications/${app.id}`}
                          className="text-gray-900 hover:text-blue-600"
                        >
                          {app.company}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {app.position}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={app.status} />
                          {needsFollowUp && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                              Follow up?
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">
                        {app.aiMatchScore != null ? `${app.aiMatchScore}%` : "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {app.platform ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {daysSinceUpdate === 0
                          ? "Today"
                          : `${daysSinceUpdate}d ago`}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/applications/${app.id}/edit`}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            Edit
                          </Link>
                          <DeleteButton id={app.id} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-3 md:hidden">
            {applications.map((app) => {
              const daysSinceUpdate = Math.floor(
                (now.getTime() - app.updatedAt.getTime()) / 86_400_000
              );
              const needsFollowUp =
                app.status === "APPLIED" && daysSinceUpdate >= 7;

              return (
                <Link
                  key={app.id}
                  href={`/applications/${app.id}`}
                  className="block rounded-xl bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{app.company}</p>
                      <p className="text-sm text-gray-500">{app.position}</p>
                    </div>
                    <StatusBadge status={app.status} />
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                    {app.platform && <span>{app.platform}</span>}
                    <span>
                      {daysSinceUpdate === 0
                        ? "Today"
                        : `${daysSinceUpdate}d ago`}
                    </span>
                    {needsFollowUp && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-700">
                        Follow up?
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}