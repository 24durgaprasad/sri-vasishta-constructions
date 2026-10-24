"use server";

import { z } from "zod/v4";
import { requireAdmin } from "@/lib/auth";
import { createUnit, updateUnit, deleteUnit } from "@/lib/repositories/units";
import { revalidateTag } from "next/cache";
import type { RepoUnit } from "@/lib/repositories/units";

const UnitSchema = z.object({
  projectId: z.string().min(1),
  unitNumber: z.string().min(1),
  configuration: z.string().min(1),
  price: z.number().min(0),
  status: z.enum(["available", "held", "booked", "sold"]),
  tower: z.string().optional(),
  floor: z.number().optional(),
  carpetArea: z.number().optional(),
  builtUpArea: z.number().optional(),
  facing: z.string().optional(),
  features: z.array(z.string()).optional(),
});

type ActionResult<T = void> = { ok: true; data: T } | { ok: false; error: string };

export async function createUnitAction(data: unknown): Promise<ActionResult<RepoUnit>> {
  await requireAdmin();
  const parsed = UnitSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues.map((i) => i.message).join(", ") };
  const unit = await createUnit(parsed.data);
  revalidateTag(`inventory:${parsed.data.projectId}`);
  return { ok: true, data: unit };
}

export async function updateUnitAction(id: string, data: Partial<RepoUnit>): Promise<ActionResult<RepoUnit>> {
  await requireAdmin();
  const unit = await updateUnit(id, data);
  if (!unit) return { ok: false, error: "Unit not found." };
  revalidateTag(`inventory:${unit.projectId}`);
  return { ok: true, data: unit };
}

export async function deleteUnitAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  const deleted = await deleteUnit(id);
  if (!deleted) return { ok: false, error: "Unit not found." };
  return { ok: true, data: undefined };
}
