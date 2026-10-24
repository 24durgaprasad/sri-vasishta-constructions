import { NextResponse } from "next/server";
import { saveSubmission } from "@/lib/submissions";
import { getProjectBySlug, getAllProjects } from "@/lib/repositories/projects";
import { slugify } from "@/lib/format";

const clean = (value: unknown, maxLength: number): string =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const question = clean(body.question, 500);
  const projectSlug = clean(body.project, 60);

  let match = await getProjectBySlug(projectSlug);
  if (!match) {
    const all = await getAllProjects();
    match = all.find((item) => item.id === projectSlug || slugify(item.name) === projectSlug) ?? null;
  }

  const errors: string[] = [];
  if (question.length < 10) {
    errors.push("Please ask a slightly longer question (at least 10 characters).");
  }
  if (!match) errors.push("Unknown project.");

  if (errors.length > 0) {
    return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 400 });
  }

  const stored = await saveSubmission("questions.jsonl", {
    projectId: match!.id,
    projectName: match!.name,
    locality: match!.locality,
    question,
    status: "pending",
  });

  return NextResponse.json({ ok: true, stored });
}
