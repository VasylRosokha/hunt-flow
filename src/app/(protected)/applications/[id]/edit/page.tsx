import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApplicationForm } from "@/components/application-form";
import { updateApplication } from "@/lib/actions/applications";

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) notFound();

  const { id } = await params;

  const application = await prisma.application.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!application) notFound();

  const action = updateApplication.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Application</h1>
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <ApplicationForm action={action} defaultValues={application} />
      </div>
    </div>
  );
}