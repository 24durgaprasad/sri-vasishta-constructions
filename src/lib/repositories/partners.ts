import { isMongoConfigured } from "@/lib/env";
import { connectDB } from "@/lib/db";
import { PartnerModel } from "@/lib/models/partner.model";
import { banks, interiorPartners } from "@/data/partners";
import { readStore, writeStore } from "@/lib/store";
import type { Partner } from "@/data/types";

export interface RepoPartner {
  id: string;
  name: string;
  category: string;
  logo?: string;
  logoSrc?: string;
  url?: string;
  description?: string;
  featured: boolean;
  order: number;
}

function staticPartnersToRepo(): RepoPartner[] {
  return [
    ...banks.map((b, i) => ({
      id: b.id,
      name: b.name,
      category: "bank" as const,
      logo: b.logo,
      logoSrc: b.logoSrc,
      featured: false,
      order: i,
    })),
    ...interiorPartners.map((p, i) => ({
      id: p.id,
      name: p.name,
      category: "interiors" as const,
      logo: p.logo,
      logoSrc: p.logoSrc,
      featured: false,
      order: i,
    })),
  ];
}

export async function getAllPartners(): Promise<RepoPartner[]> {
  if (isMongoConfigured) {
    await connectDB();
    const docs = await PartnerModel.find({}).sort({ order: 1 }).lean();
    return docs.map((d) => ({
      id: String(d._id),
      name: d.name ?? "",
      category: d.category ?? "bank",
      logo: d.logo,
      logoSrc: d.logoSrc,
      url: d.url,
      description: d.description,
      featured: Boolean(d.featured),
      order: Number(d.order ?? 0),
    }));
  }
  const stored = await readStore<RepoPartner[]>("partners", []);
  return stored.length > 0 ? stored : staticPartnersToRepo();
}

export async function getPartnersByCategory(category: string): Promise<RepoPartner[]> {
  const all = await getAllPartners();
  return all.filter((p) => p.category === category);
}

export async function createPartner(data: Omit<RepoPartner, "id">): Promise<RepoPartner> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await PartnerModel.create(data as any);
    return { id: String((doc as any)._id), ...data };
  }
  const items = await readStore<RepoPartner[]>("partners", staticPartnersToRepo());
  const newItem: RepoPartner = { ...data, id: `p-${Date.now()}` };
  await writeStore("partners", [...items, newItem]);
  return newItem;
}

export async function updatePartner(
  id: string,
  data: Partial<RepoPartner>
): Promise<RepoPartner | null> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await PartnerModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return {
      id: String(doc._id),
      name: doc.name,
      category: doc.category,
      logo: doc.logo,
      logoSrc: doc.logoSrc,
      url: doc.url,
      description: doc.description,
      featured: doc.featured,
      order: doc.order,
    };
  }
  const items = await readStore<RepoPartner[]>("partners", staticPartnersToRepo());
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  await writeStore("partners", items);
  return items[idx];
}

export async function deletePartner(id: string): Promise<boolean> {
  if (isMongoConfigured) {
    await connectDB();
    const result = await PartnerModel.findByIdAndDelete(id);
    return Boolean(result);
  }
  const items = await readStore<RepoPartner[]>("partners", staticPartnersToRepo());
  const next = items.filter((p) => p.id !== id);
  if (next.length === items.length) return false;
  await writeStore("partners", next);
  return true;
}

export function repoToPartner(p: RepoPartner): Partner {
  return {
    id: p.id,
    name: p.name,
    logo: p.logo || p.name,
    logoSrc: p.logoSrc,
  };
}
