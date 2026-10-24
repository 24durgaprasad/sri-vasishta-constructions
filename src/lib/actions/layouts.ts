"use server";

import { z } from "zod/v4";
import { requireAdmin } from "@/lib/auth";
import { createLayout, updateLayout, deleteLayout } from "@/lib/repositories/layouts";
import type { RepoLayout } from "@/lib/repositories/layouts";

const LayoutSchema = z.object({
  projectId: z.string().min(1),
  name: z.string().min(1),
  image: z.string().min(1),
});

type ActionResult<T = void> = { ok: true; data: T } | { ok: false; error: string };

export async function createLayoutAction(data: unknown): Promise<ActionResult<RepoLayout>> {
  await requireAdmin();
  const parsed = LayoutSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues.map((i) => i.message).join(", ") };
  const layout = await createLayout({ ...parsed.data, plots: [] });
  return { ok: true, data: layout };
}

export async function updateLayoutAction(id: string, data: Partial<RepoLayout>): Promise<ActionResult<RepoLayout>> {
  await requireAdmin();
  const layout = await updateLayout(id, data);
  if (!layout) return { ok: false, error: "Layout not found." };
  return { ok: true, data: layout };
}

export async function deleteLayoutAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  const deleted = await deleteLayout(id);
  if (!deleted) return { ok: false, error: "Layout not found." };
  return { ok: true, data: undefined };
}
