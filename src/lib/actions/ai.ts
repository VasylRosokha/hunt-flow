"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import openai from "@/lib/openai";

export type AnalysisResult = {
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  key_requirements: string[];
  recommendation: string;
  seniority_level: "junior" | "mid" | "senior";
  parsed_company?: string;
  parsed_position?: string;
};

export async function analyzeJobDescription(jobDescription: string): Promise<
  { success: true; data: AnalysisResult } | { success: false; error: string }
> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { skills: true },
  });

  const candidateSkills = user?.skills?.length
    ? user.skills.join(", ")
    : "No skills listed";

  const completion = await openai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a career advisor AI. Given the following job description and the candidate's skills, provide:

1. match_score: 0-100 percentage match
2. matching_skills: array of candidate skills that match requirements
3. missing_skills: array of required skills the candidate lacks
4. key_requirements: top 5 requirements from the job description
5. recommendation: 2-3 sentence advice on whether to apply and what to highlight
6. seniority_level: "junior", "mid", or "senior" based on job description
7. parsed_company: company name extracted from the job description (if found, otherwise null)
8. parsed_position: job title/position extracted from the job description (if found, otherwise null)

Candidate skills: ${candidateSkills}

Respond in JSON format only.`,
      },
      {
        role: "user",
        content: jobDescription,
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) return { success: false, error: "No response from AI" };

  try {
    const data = JSON.parse(content) as AnalysisResult;
    return { success: true, data };
  } catch {
    return { success: false, error: "Failed to parse AI response" };
  }
}

export async function saveAnalysisAsApplication(
  jobDescription: string,
  analysis: AnalysisResult,
  company: string,
  position: string
) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const application = await prisma.application.create({
    data: {
      userId: session.user.id,
      company,
      position,
      jobDescription,
      aiMatchScore: analysis.match_score,
      aiAnalysis: JSON.stringify(analysis),
    },
  });

  return { success: true, id: application.id };
}

export async function generateCoverLetter(
  jobDescription: string,
  tone: "professional" | "casual" | "confident"
): Promise<
  { success: true; content: string } | { success: false; error: string }
> {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, skills: true },
  });

  const candidateName = user?.name ?? "Candidate";
  const candidateSkills = user?.skills?.length
    ? user.skills.join(", ")
    : "Not specified";

  const completion = await openai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `Write a cover letter for this job application.

Candidate name: ${candidateName}
Candidate skills: ${candidateSkills}

Tone: ${tone}

Rules:
- Keep it to 3-4 paragraphs
- Mention specific skills that match the job requirements
- Be specific, not generic
- Don't use cliches like "I'm a passionate developer"
- Mention genuine interest in the company's work
- Keep it under 300 words`,
      },
      {
        role: "user",
        content: jobDescription,
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) return { success: false, error: "No response from AI" };

  return { success: true, content };
}