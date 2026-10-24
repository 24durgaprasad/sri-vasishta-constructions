"use server";

import { z } from "zod/v4";
import { requireAdmin } from "@/lib/auth";
import { createPlot, updatePlot, deletePlot } from "@/lib/repositories/plots";
import { revalidateTag } from "next/cache";
import type { RepoPlot } from "@/lib/repositories/plots";

const PlotSchema = z.object({
  projectId: z.string().min(1),
  plotNumber: z.string().min(1),
  areaSqYards: z.number().min(1),
  price: z.number().min(0),
  status: z.enum(["available", "held", "booked", "sold"]),
  layoutId: z.string().optional(),
  dimensions: z.string().optional(),
  facing: z.string().optional(),
  corner: z.boolean().optional(),
  roadFacing: z.boolean().optional(),
  commercialFacing: z.boolean().optional(),
  notes: z.string().optional(),
});

type ActionResult<T = void> = { ok: true; data: T } | { ok: false; error: string };

export async function createPlotAction(data: unknown): Promise<ActionResult<RepoPlot>> {
  await requireAdmin();
  const parsed = PlotSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues.map((i) => i.message).join(", ") };
  const plot = await createPlot(parsed.data);
  revalidateTag(`inventory:${parsed.data.projectId}`);
  return { ok: true, data: plot };
}

export async function updatePlotAction(id: string, data: Partial<RepoPlot>): Promise<ActionResult<RepoPlot>> {
  await requireAdmin();
  const plot = await updatePlot(id, data);
  if (!plot) return { ok: false, error: "Plot not found." };
  revalidateTag(`inventory:${plot.projectId}`);
  return { ok: true, data: plot };
}

export async function deletePlotAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  const deleted = await deletePlot(id);
  if (!deleted) return { ok: false, error: "Plot not found." };
  return { ok: true, data: undefined };
}
