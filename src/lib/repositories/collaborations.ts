import { isMongoConfigured } from "@/lib/env";
import { connectDB } from "@/lib/db";
import { CollaborationModel } from "@/lib/models/collaboration.model";
import { readStore, writeStore } from "@/lib/store";

export interface RepoCollaboration {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  url?: string;
  order: number;
}

function docToRepo(d: any): RepoCollaboration {
  return {
    id: String(d._id ?? d.id ?? ""),
    name: String(d.name ?? ""),
    logo: d.logo as string | undefined,
    description: d.description as string | undefined,
    url: d.url as string | undefined,
    order: Number(d.order ?? 0),
  };
}

export async function getAllCollaborations(): Promise<RepoCollaboration[]> {
  if (isMongoConfigured) {
    await connectDB();
    const docs = await CollaborationModel.find({}).sort({ order: 1 }).lean();
    return docs.map((d) => docToRepo(d));
  }
  return readStore<RepoCollaboration[]>("collaborations", []);
}

export async function createCollaboration(
  data: Omit<RepoCollaboration, "id">
): Promise<RepoCollaboration> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await CollaborationModel.create(data);
    return docToRepo(doc.toObject());
  }
  const items = await readStore<RepoCollaboration[]>("collaborations", []);
  const newItem: RepoCollaboration = { ...data, id: `collab-${Date.now()}` };
  await writeStore("collaborations", [...items, newItem]);
  return newItem;
}

export async function updateCollaboration(
  id: string,
  data: Partial<RepoCollaboration>
): Promise<RepoCollaboration | null> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await CollaborationModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    return docToRepo(doc.toObject());
  }
  const items = await readStore<RepoCollaboration[]>("collaborations", []);
  const idx = items.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  await writeStore("collaborations", items);
  return items[idx];
}

export async function deleteCollaboration(id: string): Promise<boolean> {
  if (isMongoConfigured) {
    await connectDB();
    const result = await CollaborationModel.findByIdAndDelete(id);
    return Boolean(result);
  }
  const items = await readStore<RepoCollaboration[]>("collaborations", []);
  const next = items.filter((c) => c.id !== id);
  if (next.length === items.length) return false;
  await writeStore("collaborations", next);
  return true;
}
