"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function saveCoverLetter(
  content: string,
  tone: string,
  applicationId?: string
) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  if (applicationId) {
    await prisma.application.findFirstOrThrow({
      where: { id: applicationId, userId: session.user.id },
    });
  }

  const coverLetter = await prisma.coverLetter.create({
    data: {
      userId: session.user.id,
      content,
      tone,
      applicationId: applicationId || null,
    },
  });

  return { success: true, id: coverLetter.id };
}

export async function deleteCoverLetter(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  await prisma.coverLetter.findFirstOrThrow({
    where: { id, userId: session.user.id },
  });

  await prisma.coverLetter.delete({ where: { id } });

  return { success: true };
}

export async function getApplicationsForSelect() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.application.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      company: true,
      position: true,
      jobDescription: true,
    },
    orderBy: { createdAt: "desc" },
  });
}