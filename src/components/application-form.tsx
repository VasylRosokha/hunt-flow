"use client";

import { ApplicationStatus } from "@/generated/prisma/enums";

const platforms = [
  "LinkedIn",
  "jobs.cz",
  "startupjobs.cz",
  "Company website",
  "Other",
];

type ApplicationData = {
  id: string;
  company: string;
  position: string;
  url: string | null;
  platform: string | null;
  location: string | null;
  salary: string | null;
  status: ApplicationStatus;
  jobDescription: string | null;
  notes: string | null;
  contactName: string | null;
  contactEmail: string | null;
};

export function ApplicationForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  defaultValues?: ApplicationData;
}) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Company name" name="company" required defaultValue={defaultValues?.company} />
        <Field label="Position" name="position" required defaultValue={defaultValues?.position} />
        <Field label="Job posting URL" name="url" type="url" defaultValue={defaultValues?.url ?? ""} />
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
            Platform
          </label>
          <select
            id="platform"
            name="platform"
            defaultValue={defaultValues?.platform ?? ""}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select platform</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <Field label="Location" name="location" defaultValue={defaultValues?.location ?? ""} />
        <Field label="Salary range" name="salary" defaultValue={defaultValues?.salary ?? ""} />
      </div>

      {defaultValues && (
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues.status}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:w-auto"
          >
            {Object.values(ApplicationStatus).map((s) => (
              <option key={s} value={s}>
                {s.charAt(0) + s.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
          Job description
        </label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          rows={6}
          defaultValue={defaultValues?.jobDescription ?? ""}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Paste the job description here for AI analysis..."
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Contact name" name="contactName" defaultValue={defaultValues?.contactName ?? ""} />
        <Field
          label="Contact email"
          name="contactEmail"
          type="email"
          defaultValue={defaultValues?.contactEmail ?? ""}
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={defaultValues?.notes ?? ""}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          {defaultValues ? "Save changes" : "Create application"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}