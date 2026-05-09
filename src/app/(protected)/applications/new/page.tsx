import { ApplicationForm } from "@/components/application-form";
import { createApplication } from "@/lib/actions/applications";

export default function NewApplicationPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Add Application</h1>
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <ApplicationForm action={createApplication} />
      </div>
    </div>
  );
}