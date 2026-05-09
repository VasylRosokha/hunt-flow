"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  analyzeJobDescription,
  saveAnalysisAsApplication,
  type AnalysisResult,
} from "@/lib/actions/ai";

export default function AnalyzePage() {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleAnalyze() {
    if (!jobDescription.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const res = await analyzeJobDescription(jobDescription);
    setLoading(false);

    if (res.success) {
      setResult(res.data);
    } else {
      setError(res.error);
    }
  }

  async function handleSaveAsApplication() {
    if (!result) return;
    setSaving(true);

    const company = result.parsed_company || "Unknown Company";
    const position = result.parsed_position || "Unknown Position";

    const res = await saveAnalysisAsApplication(
      jobDescription,
      result,
      company,
      position
    );

    setSaving(false);

    if (res.success) {
      router.push(`/applications/${res.id}`);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Job Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">
          Paste a job description to see how well your skills match
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <label
          htmlFor="jobDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Job Description
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={10}
          placeholder="Paste the full job description here..."
          className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={loading || !jobDescription.trim()}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Match Score
              </h2>
              <span className="text-sm text-gray-400 capitalize">
                {result.seniority_level} level
              </span>
            </div>
            <MatchScoreMeter score={result.match_score} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <SkillsCard
              title="Matching Skills"
              items={result.matching_skills}
              variant="green"
            />
            <SkillsCard
              title="Missing Skills"
              items={result.missing_skills}
              variant="red"
            />
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Key Requirements
            </h2>
            <ul className="mt-3 space-y-2">
              {result.key_requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                    {i + 1}
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Recommendation
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              {result.recommendation}
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveAsApplication}
              disabled={saving}
              className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save as Application"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MatchScoreMeter({ score }: { score: number }) {
  const color =
    score >= 75
      ? "text-green-600"
      : score >= 50
        ? "text-yellow-500"
        : "text-red-500";

  const bgColor =
    score >= 75
      ? "bg-green-500"
      : score >= 50
        ? "bg-yellow-400"
        : "bg-red-500";

  return (
    <div className="mt-4 flex items-center gap-6">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${score}, 100`}
            strokeLinecap="round"
            className={color}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${color}`}>{score}%</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${bgColor}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {score >= 75
            ? "Strong match — you meet most requirements"
            : score >= 50
              ? "Moderate match — worth applying with preparation"
              : "Low match — consider upskilling first"}
        </p>
      </div>
    </div>
  );
}

function SkillsCard({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "green" | "red";
}) {
  const pillClasses =
    variant === "green"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-gray-400">None</p>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((skill) => (
            <span
              key={skill}
              className={`rounded-full px-3 py-1 text-xs font-medium ${pillClasses}`}
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}