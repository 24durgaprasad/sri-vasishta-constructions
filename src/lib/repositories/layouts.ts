import { isMongoConfigured } from "@/lib/env";
import { connectDB } from "@/lib/db";
import { LayoutModel } from "@/lib/models/layout.model";
import { readStore, writeStore } from "@/lib/store";

export interface RepoLayout {
  id: string;
  projectId: string;
  name: string;
  image: string;
  plots: Array<{ plotNumber: string; polygon: Array<{ x: number; y: number }> }>;
}

function docToRepo(d: any): RepoLayout {
  return {
    id: String(d._id ?? d.id ?? ""),
    projectId: String(d.projectId ?? ""),
    name: String(d.name ?? ""),
    image: String(d.image ?? ""),
    plots: (d.plots as RepoLayout["plots"]) ?? [],
  };
}

export async function getLayoutsByProject(projectId: string): Promise<RepoLayout[]> {
  if (isMongoConfigured) {
    await connectDB();
    const docs = await LayoutModel.find({ projectId }).lean();
    return docs.map((d) => docToRepo(d));
  }
  const all = await readStore<RepoLayout[]>("layouts", []);
  return all.filter((l) => l.projectId === projectId);
}

export async function createLayout(data: Omit<RepoLayout, "id">): Promise<RepoLayout> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await LayoutModel.create(data);
    return docToRepo(doc.toObject());
  }
  const items = await readStore<RepoLayout[]>("layouts", []);
  const newItem: RepoLayout = { ...data, id: `layout-${Date.now()}` };
  await writeStore("layouts", [...items, newItem]);
  return newItem;
}

export async function updateLayout(
  id: string,
  data: Partial<RepoLayout>
): Promise<RepoLayout | null> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await LayoutModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return docToRepo(doc.toObject());
  }
  const items = await readStore<RepoLayout[]>("layouts", []);
  const idx = items.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  await writeStore("layouts", items);
  return items[idx];
}

export async function deleteLayout(id: string): Promise<boolean> {
  if (isMongoConfigured) {
    await connectDB();
    const result = await LayoutModel.findByIdAndDelete(id);
    return Boolean(result);
  }
  const items = await readStore<RepoLayout[]>("layouts", []);
  const next = items.filter((l) => l.id !== id);
  if (next.length === items.length) return false;
  await writeStore("layouts", next);
  return true;
}
