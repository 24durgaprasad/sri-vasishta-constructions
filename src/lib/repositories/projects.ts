import { isMongoConfigured } from "@/lib/env";
import { connectDB } from "@/lib/db";
import { ProjectModel } from "@/lib/models/project.model";
import { projects as staticProjects } from "@/data/projects";
import { getProjectWithDetail, getProjectDetail } from "@/data/projectDetails";
import { readStore, writeStore } from "@/lib/store";
import { revalidateTag } from "next/cache";
import type { Project, ProjectCollection, ProjectDetail } from "@/data/types";

/** Serialisable project shape used by the repository layer */
export interface RepoProject {
  id: string;
  slug: string;
  name: string;
  developer: string;
  propertyType: string;
  status: string;
  collections: string[];
  badge?: string;
  locality: string;
  city: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  description: string;
  highlights: string[];
  configurations: Array<{ label: string; areaSqft: number; priceMin: number; priceMax: number }>;
  amenities: Array<{ category: string; items: string[] }>;
  specifications?: Array<{ category: string; rows: Array<{ label: string; value: string }> }>;
  faqs: Array<{ question: string; answer: string }>;
  nearby: Array<{ name: string; distance: string }>;
  priceMin: number;
  priceMax: number;
  pricePerSqft?: number;
  carpetMin?: number;
  carpetMax?: number;
  landAreaAcres?: number;
  towers?: number;
  totalUnits?: number;
  launchDate?: string;
  possessionDate?: string;
  reraId?: string;
  brochureUrl?: string;
  brochurePreview?: string[];
  tourUrl?: string;
  images: string[];
  seo?: { title?: string; description?: string; keywords?: string[] };
  published: boolean;
  localityPricePerSqft?: number;
  localityPriceTrend?: number;
  bhks?: string[];
}

/** Convert static Project+detail into RepoProject */
function staticToRepo(p: Project): RepoProject {
  let detail: ReturnType<typeof getProjectWithDetail>["detail"] | undefined;
  try {
    detail = getProjectWithDetail(p).detail;
  } catch {
    detail = undefined;
  }

  return {
    id: p.id,
    slug: p.id,
    name: p.name,
    developer: detail?.developer ?? "Sri Vasishta Constructions",
    propertyType: "flats",
    status: p.id === "vc-10" ? "completed" : "under-construction",
    collections: [p.collection],
    badge: p.badge,
    locality: p.locality,
    city: p.city,
    description: detail?.about ?? "",
    highlights: detail?.highlights ?? [],
    configurations: detail?.configurations ?? [],
    amenities: detail?.amenities ?? [],
    specifications: detail?.specifications,
    faqs: detail?.faq ?? [],
    nearby: detail?.nearby ?? [],
    priceMin: p.priceMin,
    priceMax: p.priceMax,
    pricePerSqft: detail?.pricePerSqft,
    carpetMin: detail?.carpetMin,
    carpetMax: detail?.carpetMax,
    landAreaAcres: detail?.landAreaAcres,
    towers: detail?.towers,
    totalUnits: detail?.totalUnits,
    launchDate: detail?.launchDate,
    possessionDate: detail?.possessionDate,
    reraId: detail?.reraId,
    brochureUrl: detail?.brochureUrl,
    brochurePreview: detail?.brochurePreview,
    images: p.images,
    published: true,
    localityPricePerSqft: detail?.localityPricePerSqft,
    localityPriceTrend: detail?.localityPriceTrend,
    bhks: p.bhks,
  };
}

function mongoToRepo(doc: unknown): RepoProject {
  const obj = (doc && typeof (doc as { toObject?: unknown }).toObject === "function"
    ? (doc as { toObject: (opts?: unknown) => Record<string, unknown> }).toObject({ virtuals: false })
    : doc) as Record<string, unknown>;

  return {
    id: String(obj._id ?? obj.slug ?? ""),
    slug: String(obj.slug ?? ""),
    name: String(obj.name ?? ""),
    developer: String(obj.developer ?? "Sri Vasishta Constructions"),
    propertyType: String(obj.propertyType ?? "flats"),
    status: String(obj.status ?? "under-construction"),
    collections: (obj.collections as string[]) ?? [],
    badge: obj.badge as string | undefined,
    locality: String(obj.locality ?? ""),
    city: String(obj.city ?? ""),
    address: obj.address as string | undefined,
    coordinates: obj.coordinates as { lat: number; lng: number } | undefined,
    description: String(obj.description ?? ""),
    highlights: (obj.highlights as string[]) ?? [],
    configurations: (obj.configurations as RepoProject["configurations"]) ?? [],
    amenities: (obj.amenities as RepoProject["amenities"]) ?? [],
    specifications: obj.specifications as RepoProject["specifications"],
    faqs: (obj.faqs as RepoProject["faqs"]) ?? [],
    nearby: (obj.nearby as RepoProject["nearby"]) ?? [],
    priceMin: Number(obj.priceMin ?? 0),
    priceMax: Number(obj.priceMax ?? 0),
    pricePerSqft: obj.pricePerSqft as number | undefined,
    carpetMin: obj.carpetMin as number | undefined,
    carpetMax: obj.carpetMax as number | undefined,
    landAreaAcres: obj.landAreaAcres as number | undefined,
    towers: obj.towers as number | undefined,
    totalUnits: obj.totalUnits as number | undefined,
    launchDate: obj.launchDate as string | undefined,
    possessionDate: obj.possessionDate as string | undefined,
    reraId: obj.reraId as string | undefined,
    brochureUrl: obj.brochureUrl as string | undefined,
    brochurePreview: obj.brochurePreview as string[] | undefined,
    tourUrl: obj.tourUrl as string | undefined,
    images: (obj.images as string[]) ?? [],
    seo: obj.seo as RepoProject["seo"],
    published: Boolean(obj.published ?? true),
    localityPricePerSqft: obj.localityPricePerSqft as number | undefined,
    localityPriceTrend: obj.localityPriceTrend as number | undefined,
    bhks: (obj.bhks as string[]) ?? (obj.configurations as Array<{ label: string }>)?.map((c) => c.label) ?? [],
  };
}

export async function getAllProjects(): Promise<RepoProject[]> {
  if (isMongoConfigured) {
    await connectDB();
    const docs = await ProjectModel.find({ published: true }).lean();
    return docs.map((d) => mongoToRepo(d));
  }
  // Local store fallback — if store has data, use it; otherwise use static seed
  const stored = await readStore<RepoProject[]>("projects", []);
  if (stored.length > 0) return stored.filter((p) => p.published);
  return staticProjects.map(staticToRepo);
}

export async function getAllProjectsAdmin(): Promise<RepoProject[]> {
  if (isMongoConfigured) {
    await connectDB();
    const docs = await ProjectModel.find({}).lean();
    return docs.map((d) => mongoToRepo(d));
  }
  const stored = await readStore<RepoProject[]>("projects", []);
  if (stored.length > 0) return stored;
  return staticProjects.map(staticToRepo);
}

export async function getProjectBySlug(slug: string): Promise<RepoProject | null> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await ProjectModel.findOne({ slug, published: true });
    if (!doc) return null;
    return mongoToRepo(doc);
  }
  const all = await getAllProjects();
  return all.find((p) => p.slug === slug || p.id === slug) ?? null;
}

export async function getProjectBySlugAdmin(slug: string): Promise<RepoProject | null> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await ProjectModel.findOne({ slug });
    if (!doc) return null;
    return mongoToRepo(doc);
  }
  const all = await getAllProjectsAdmin();
  return all.find((p) => p.slug === slug || p.id === slug) ?? null;
}

export async function createProject(data: Omit<RepoProject, "id">): Promise<RepoProject> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await ProjectModel.create(data as any);
    revalidateTag("projects");
    return mongoToRepo(doc);
  }
  const items = await readStore<RepoProject[]>("projects", []);
  const newItem: RepoProject = { ...data, id: `local-${Date.now()}` };
  await writeStore("projects", [...items, newItem]);
  revalidateTag("projects");
  return newItem;
}

export async function updateProject(
  id: string,
  data: Partial<RepoProject>
): Promise<RepoProject | null> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await ProjectModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    revalidateTag("projects");
    revalidateTag(`project:${doc.slug}`);
    return mongoToRepo(doc);
  }
  const items = await readStore<RepoProject[]>("projects", []);
  const idx = items.findIndex((p) => p.id === id || p.slug === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  await writeStore("projects", items);
  revalidateTag("projects");
  revalidateTag(`project:${items[idx].slug}`);
  return items[idx];
}

export async function deleteProject(id: string): Promise<boolean> {
  if (isMongoConfigured) {
    await connectDB();
    const result = await ProjectModel.findByIdAndDelete(id);
    if (result) {
      revalidateTag("projects");
      revalidateTag(`project:${result.slug}`);
    }
    return Boolean(result);
  }
  const items = await readStore<RepoProject[]>("projects", []);
  const next = items.filter((p) => p.id !== id);
  if (next.length === items.length) return false;
  await writeStore("projects", next);
  revalidateTag("projects");
  return true;
}

export async function countProjects(): Promise<number> {
  if (isMongoConfigured) {
    await connectDB();
    return ProjectModel.countDocuments({});
  }
  const items = await readStore<RepoProject[]>("projects", []);
  return items.length || staticProjects.length;
}

export function repoToProject(p: RepoProject): Project {
  return {
    id: p.slug || p.id,
    name: p.name,
    locality: p.locality,
    city: p.city || "Visakhapatnam",
    images:
      p.images && p.images.length > 0
        ? p.images
        : ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"],
    bhks:
      p.bhks && p.bhks.length > 0
        ? p.bhks
        : (p.configurations?.map((c) => c.label) ?? ["2 BHK", "3 BHK"]),
    priceMin: p.priceMin,
    priceMax: p.priceMax,
    collection: (p.collections?.[0] as ProjectCollection) || "topPicks",
    badge: p.badge,
  };
}

export function repoToDetail(repo: RepoProject): ProjectDetail {
  let staticDetail: ProjectDetail | undefined;
  try {
    staticDetail = getProjectDetail(repo.slug || repo.id);
  } catch {
    staticDetail = undefined;
  }

  return {
    about: repo.description || staticDetail?.about || "Premium residential project developed by Sri Vasishta Constructions.",
    developer: repo.developer || staticDetail?.developer || "Sri Vasishta Constructions",
    pricePerSqft: repo.pricePerSqft || staticDetail?.pricePerSqft || 5000,
    carpetMin: repo.carpetMin || staticDetail?.carpetMin || 1100,
    carpetMax: repo.carpetMax || staticDetail?.carpetMax || 2400,
    landAreaAcres: repo.landAreaAcres || staticDetail?.landAreaAcres || 2.5,
    towers: repo.towers || staticDetail?.towers || 2,
    totalUnits: repo.totalUnits || staticDetail?.totalUnits || 80,
    launchDate: repo.launchDate || staticDetail?.launchDate || "2024",
    possessionDate: repo.possessionDate || staticDetail?.possessionDate || "Ready to Move",
    reraId: repo.reraId || staticDetail?.reraId || "P03290010123",
    highlights: repo.highlights?.length ? repo.highlights : (staticDetail?.highlights ?? ["RERA & VMRDA Approved", "100% Vaastu Compliant", "Prime Location"]),
    configurations: repo.configurations?.length ? repo.configurations : (staticDetail?.configurations ?? []),
    floorPlans: staticDetail?.floorPlans ?? [],
    amenities: repo.amenities?.length ? repo.amenities : (staticDetail?.amenities ?? []),
    localityPricePerSqft: repo.localityPricePerSqft || staticDetail?.localityPricePerSqft || 5000,
    localityPriceTrend: repo.localityPriceTrend || staticDetail?.localityPriceTrend || 8.5,
    nearby: repo.nearby?.length ? repo.nearby : (staticDetail?.nearby ?? []),
    faq: repo.faqs?.length ? repo.faqs : (staticDetail?.faq ?? []),
    gallery: repo.images?.length > 1 ? repo.images : (staticDetail?.gallery ?? repo.images),
    brochureUrl: repo.brochureUrl || staticDetail?.brochureUrl,
    brochurePreview: repo.brochurePreview || staticDetail?.brochurePreview,
    specifications: repo.specifications?.length ? repo.specifications : staticDetail?.specifications,
    ratings: staticDetail?.ratings,
    reviews: staticDetail?.reviews,
    qa: staticDetail?.qa,
  };
}
