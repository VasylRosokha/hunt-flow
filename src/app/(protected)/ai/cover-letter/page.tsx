"use client";

import { useState, useEffect } from "react";
import { generateCoverLetter } from "@/lib/actions/ai";
import { saveCoverLetter } from "@/lib/actions/cover-letters";
import { getApplicationsForSelect } from "@/lib/actions/cover-letters";

type Tone = "professional" | "casual" | "confident";

type ApplicationOption = {
  id: string;
  company: string;
  position: string;
  jobDescription: string | null;
};

const tones: { value: Tone; label: string; description: string }[] = [
  { value: "professional", label: "Professional", description: "Formal and polished" },
  { value: "casual", label: "Casual", description: "Friendly and approachable" },
  { value: "confident", label: "Confident", description: "Bold and assertive" },
];

export default function CoverLetterPage() {
  const [applications, setApplications] = useState<ApplicationOption[]>([]);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    getApplicationsForSelect().then(setApplications);
  }, []);

  function handleAppSelect(appId: string) {
    setSelectedAppId(appId);
    if (appId) {
      const app = applications.find((a) => a.id === appId);
      if (app?.jobDescription) {
        setJobDescription(app.jobDescription);
      }
    }
  }

  async function handleGenerate() {
    if (!jobDescription.trim()) return;
    setLoading(true);
    setError(null);

    const res = await generateCoverLetter(
      jobDescription,
      tone,
      selectedAppId || undefined
    );

    setLoading(false);

    if (res.success) {
      setContent(res.content);
    } else {
      setError(res.error);
    }
  }

  async function handleSave() {
    if (!content.trim()) return;
    setSaving(true);

    const res = await saveCoverLetter(
      content,
      tone,
      selectedAppId || undefined
    );

    setSaving(false);

    if (res.success) {
      setError(null);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Cover Letter</h1>
        <p className="mt-1 text-sm text-gray-500">
          Generate a tailored cover letter for any job
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="application"
              className="block text-sm font-medium text-gray-700"
            >
              Select Application (optional)
            </label>
            <select
              id="application"
              value={selectedAppId}
              onChange={(e) => handleAppSelect(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Paste job description manually</option>
              {applications.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.company} — {app.position}
                </option>
              ))}
            </select>
          </div>

          <div>
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
              rows={8}
              placeholder="Paste the job description here..."
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-700">Tone</span>
            <div className="mt-2 flex gap-3">
              {tones.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={`flex-1 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
                    tone === t.value
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span
                    className={`block text-sm font-medium ${
                      tone === t.value ? "text-blue-700" : "text-gray-900"
                    }`}
                  >
                    {t.label}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {t.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={loading || !jobDescription.trim()}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {content && (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Generated Cover Letter
            </h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 capitalize">
              {tone}
            </span>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            className="mt-4 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm leading-relaxed shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopy}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50 disabled:opacity-50"
            >
              {loading ? "Regenerating..." : "Regenerate"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}