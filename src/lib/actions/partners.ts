"use server";

import { z } from "zod/v4";
import { requireAdmin } from "@/lib/auth";
import { createPartner, updatePartner, deletePartner } from "@/lib/repositories/partners";
import type { RepoPartner } from "@/lib/repositories/partners";

const PartnerSchema = z.object({
  name: z.string().min(1),
  category: z.enum(["bank", "interiors", "flooring-civil", "leasing"]),
  logo: z.string().optional(),
  logoSrc: z.string().optional(),
  url: z.string().optional(),
  description: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

type ActionResult<T = void> = { ok: true; data: T } | { ok: false; error: string };

export async function createPartnerAction(data: unknown): Promise<ActionResult<RepoPartner>> {
  await requireAdmin();
  const parsed = PartnerSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues.map((i) => i.message).join(", ") };
  const partner = await createPartner(parsed.data);
  return { ok: true, data: partner };
}

export async function updatePartnerAction(id: string, data: Partial<RepoPartner>): Promise<ActionResult<RepoPartner>> {
  await requireAdmin();
  const partner = await updatePartner(id, data);
  if (!partner) return { ok: false, error: "Partner not found." };
  return { ok: true, data: partner };
}

export async function deletePartnerAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  const deleted = await deletePartner(id);
  if (!deleted) return { ok: false, error: "Partner not found." };
  return { ok: true, data: undefined };
}
