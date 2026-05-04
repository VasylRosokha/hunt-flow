import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-sm font-bold text-white">H</span>
          </div>
          <span className="text-lg font-bold text-gray-900">HuntFlow</span>
        </div>
        <Link
          href={session ? "/dashboard" : "/login"}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          {session ? "Go to Dashboard" : "Sign in"}
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Track job applications with{" "}
          <span className="text-blue-600">AI-powered</span> insights
        </h1>
        <p className="mt-4 max-w-lg text-lg text-gray-500">
          Organize your job search, analyze match scores, and generate tailored
          cover letters — all in one place.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href={session ? "/dashboard" : "/login"}
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Get started
          </Link>
        </div>

        <div className="mt-20 grid max-w-4xl gap-8 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#2563EB"
                strokeWidth="1.5"
              >
                <rect x="2" y="6" width="16" height="11" rx="2" />
                <path d="M7 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Track Applications</h3>
            <p className="mt-1 text-sm text-gray-500">
              Keep every application organized with statuses, notes, and contact
              info.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#2563EB"
                strokeWidth="1.5"
              >
                <path d="M10 2l1.5 4.5L16 8l-4.5 1.5L10 14l-1.5-4.5L4 8l4.5-1.5L10 2z" />
                <path d="M15 12l.75 2.25L18 15l-2.25.75L15 18l-.75-2.25L12 15l2.25-.75L15 12z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">AI Match Analysis</h3>
            <p className="mt-1 text-sm text-gray-500">
              Paste a job description and get an instant skills match score.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#2563EB"
                strokeWidth="1.5"
              >
                <rect x="3" y="2" width="14" height="16" rx="2" />
                <path d="M7 6h6M7 10h6M7 14h3" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">Cover Letters</h3>
            <p className="mt-1 text-sm text-gray-500">
              Generate tailored cover letters that highlight your relevant
              experience.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-400">
        HuntFlow &mdash; your AI job search companion
      </footer>
    </div>
  );
}