"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { ApplicationStatus } from "@/generated/prisma/enums";

export async function createApplication(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const data = extractFormFields(formData);

  const application = await prisma.application.create({
    data: {
      userId: session.user.id,
      ...data,
    },
  });

  redirect(`/applications/${application.id}`);
}

export async function updateApplication(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.application.findFirstOrThrow({
    where: { id, userId: session.user.id },
  });

  const data = extractFormFields(formData);

  await prisma.application.update({
    where: { id },
    data,
  });

  redirect(`/applications/${id}`);
}

export async function updateApplicationStatus(
  id: string,
  newStatus: ApplicationStatus
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const application = await prisma.application.findFirstOrThrow({
    where: { id, userId: session.user.id },
  });

  await prisma.$transaction([
    prisma.application.update({
      where: { id },
      data: {
        status: newStatus,
        ...(newStatus === "APPLIED" && !application.appliedAt
          ? { appliedAt: new Date() }
          : {}),
      },
    }),
    prisma.statusChange.create({
      data: {
        applicationId: id,
        fromStatus: application.status,
        toStatus: newStatus,
      },
    }),
  ]);

  redirect(`/applications/${id}`);
}

export async function deleteApplication(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.application.findFirstOrThrow({
    where: { id, userId: session.user.id },
  });

  await prisma.application.delete({ where: { id } });

  redirect("/applications");
}

function extractFormFields(formData: FormData) {
  return {
    company: formData.get("company") as string,
    position: formData.get("position") as string,
    url: (formData.get("url") as string) || null,
    platform: (formData.get("platform") as string) || null,
    location: (formData.get("location") as string) || null,
    salary: (formData.get("salary") as string) || null,
    jobDescription: (formData.get("jobDescription") as string) || null,
    notes: (formData.get("notes") as string) || null,
    contactName: (formData.get("contactName") as string) || null,
    contactEmail: (formData.get("contactEmail") as string) || null,
    status: (formData.get("status") as ApplicationStatus) || "SAVED",
  };
}