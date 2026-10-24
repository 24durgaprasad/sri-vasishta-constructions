"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod/v4";
import { requireAdmin } from "@/lib/auth";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/lib/repositories/projects";
import type { RepoProject } from "@/lib/repositories/projects";

const ConfigSchema = z.object({
  label: z.string(),
  areaSqft: z.number(),
  priceMin: z.number(),
  priceMax: z.number(),
});

const ProjectSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Slug must be lowercase, numbers, hyphens only"),
  name: z.string().min(1),
  developer: z.string().default("Sri Vasishta Constructions"),
  propertyType: z.enum(["flats", "houses", "villas", "plots", "commercial"]),
  status: z.enum(["upcoming", "under-construction", "ready", "completed", "sold-out"]),
  collections: z.array(z.enum(["topPicks", "highlighted", "highDemand"])).default([]),
  badge: z.string().optional(),
  locality: z.string().min(1),
  city: z.string().min(1),
  address: z.string().optional(),
  description: z.string().default(""),
  highlights: z.array(z.string()).default([]),
  configurations: z.array(ConfigSchema).default([]),
  priceMin: z.number().min(0),
  priceMax: z.number().min(0),
  pricePerSqft: z.number().optional(),
  carpetMin: z.number().optional(),
  carpetMax: z.number().optional(),
  landAreaAcres: z.number().optional(),
  towers: z.number().optional(),
  totalUnits: z.number().optional(),
  launchDate: z.string().optional(),
  possessionDate: z.string().optional(),
  reraId: z.string().optional(),
  brochureUrl: z.string().optional(),
  tourUrl: z.string().optional(),
  images: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  localityPricePerSqft: z.number().optional(),
  localityPriceTrend: z.number().optional(),
});

type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export async function createProjectAction(
  formData: Record<string, unknown>
): Promise<ActionResult<RepoProject>> {
  await requireAdmin();
  const parsed = ProjectSchema.safeParse(formData);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map((i) => i.message).join(", ") };
  }
  try {
    const project = await createProject({ ...parsed.data, amenities: [], faqs: [], nearby: [] });
    return { ok: true, data: project };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to create project." };
  }
}

export async function updateProjectAction(
  id: string,
  formData: Partial<Record<string, unknown>>
): Promise<ActionResult<RepoProject>> {
  await requireAdmin();
  try {
    const project = await updateProject(id, formData as Partial<RepoProject>);
    if (!project) return { ok: false, error: "Project not found." };
    revalidateTag("projects");
    revalidateTag(`project:${project.slug}`);
    return { ok: true, data: project };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to update project." };
  }
}

export async function publishProjectAction(id: string, published: boolean): Promise<ActionResult> {
  await requireAdmin();
  const project = await updateProject(id, { published });
  if (!project) return { ok: false, error: "Project not found." };
  revalidateTag("projects");
  revalidateTag(`project:${project.slug}`);
  return { ok: true, data: undefined };
}

export async function deleteProjectAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  const deleted = await deleteProject(id);
  if (!deleted) return { ok: false, error: "Project not found." };
  revalidateTag("projects");
  return { ok: true, data: undefined };
}
