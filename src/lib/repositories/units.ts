import { isMongoConfigured } from "@/lib/env";
import { connectDB } from "@/lib/db";
import { UnitModel } from "@/lib/models/unit.model";
import { readStore, writeStore } from "@/lib/store";
import { revalidateTag } from "next/cache";

export interface RepoUnit {
  id: string;
  projectId: string;
  tower?: string;
  floor?: number;
  unitNumber: string;
  configuration: string;
  carpetArea?: number;
  builtUpArea?: number;
  facing?: string;
  price: number;
  status: "available" | "held" | "booked" | "sold";
  features?: string[];
  floorPlanId?: string;
  createdAt?: string;
}

function docToRepo(d: any): RepoUnit {
  return {
    id: String(d._id ?? d.id ?? ""),
    projectId: String(d.projectId ?? ""),
    tower: d.tower as string | undefined,
    floor: d.floor as number | undefined,
    unitNumber: String(d.unitNumber ?? ""),
    configuration: String(d.configuration ?? ""),
    carpetArea: d.carpetArea as number | undefined,
    builtUpArea: d.builtUpArea as number | undefined,
    facing: d.facing as string | undefined,
    price: Number(d.price ?? 0),
    status: (d.status as RepoUnit["status"]) ?? "available",
    features: d.features as string[] | undefined,
    floorPlanId: d.floorPlanId as string | undefined,
  };
}

export async function getUnitsByProject(projectId: string): Promise<RepoUnit[]> {
  if (isMongoConfigured) {
    await connectDB();
    const docs = await UnitModel.find({ projectId }).lean();
    return docs.map((d) => docToRepo(d));
  }
  const all = await readStore<RepoUnit[]>("units", []);
  return all.filter((u) => u.projectId === projectId);
}

export async function createUnit(data: Omit<RepoUnit, "id">): Promise<RepoUnit> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await UnitModel.create(data);
    revalidateTag(`inventory:${data.projectId}`);
    return docToRepo(doc.toObject());
  }
  const items = await readStore<RepoUnit[]>("units", []);
  const newItem: RepoUnit = { ...data, id: `u-${Date.now()}` };
  await writeStore("units", [...items, newItem]);
  revalidateTag(`inventory:${data.projectId}`);
  return newItem;
}

export async function updateUnit(id: string, data: Partial<RepoUnit>): Promise<RepoUnit | null> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await UnitModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    revalidateTag(`inventory:${doc.projectId}`);
    return docToRepo(doc.toObject());
  }
  const items = await readStore<RepoUnit[]>("units", []);
  const idx = items.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  await writeStore("units", items);
  revalidateTag(`inventory:${items[idx].projectId}`);
  return items[idx];
}

export async function deleteUnit(id: string): Promise<boolean> {
  if (isMongoConfigured) {
    await connectDB();
    const result = await UnitModel.findByIdAndDelete(id);
    if (result) revalidateTag(`inventory:${result.projectId}`);
    return Boolean(result);
  }
  const items = await readStore<RepoUnit[]>("units", []);
  const next = items.filter((u) => u.id !== id);
  if (next.length === items.length) return false;
  await writeStore("units", next);
  return true;
}

export async function countUnits(): Promise<number> {
  if (isMongoConfigured) {
    await connectDB();
    return UnitModel.countDocuments({});
  }
  const items = await readStore<RepoUnit[]>("units", []);
  return items.length;
}
