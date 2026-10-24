import { isMongoConfigured } from "@/lib/env";
import { connectDB } from "@/lib/db";
import { PlotModel } from "@/lib/models/plot.model";
import { readStore, writeStore } from "@/lib/store";
import { revalidateTag } from "next/cache";

export interface RepoPlot {
  id: string;
  projectId: string;
  layoutId?: string;
  plotNumber: string;
  areaSqYards: number;
  dimensions?: string;
  facing?: string;
  corner?: boolean;
  roadFacing?: boolean;
  commercialFacing?: boolean;
  price: number;
  status: "available" | "held" | "booked" | "sold";
  polygon?: Array<{ x: number; y: number }>;
  notes?: string;
}

function docToRepo(d: any): RepoPlot {
  return {
    id: String(d._id ?? d.id ?? ""),
    projectId: String(d.projectId ?? ""),
    layoutId: d.layoutId as string | undefined,
    plotNumber: String(d.plotNumber ?? ""),
    areaSqYards: Number(d.areaSqYards ?? 0),
    dimensions: d.dimensions as string | undefined,
    facing: d.facing as string | undefined,
    corner: Boolean(d.corner),
    roadFacing: Boolean(d.roadFacing),
    commercialFacing: Boolean(d.commercialFacing),
    price: Number(d.price ?? 0),
    status: (d.status as RepoPlot["status"]) ?? "available",
    polygon: d.polygon as Array<{ x: number; y: number }> | undefined,
    notes: d.notes as string | undefined,
  };
}

export async function getPlotsByProject(projectId: string): Promise<RepoPlot[]> {
  if (isMongoConfigured) {
    await connectDB();
    const docs = await PlotModel.find({ projectId }).lean();
    return docs.map((d) => docToRepo(d));
  }
  const all = await readStore<RepoPlot[]>("plots", []);
  return all.filter((p) => p.projectId === projectId);
}

export async function createPlot(data: Omit<RepoPlot, "id">): Promise<RepoPlot> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await PlotModel.create(data);
    revalidateTag(`inventory:${data.projectId}`);
    return docToRepo(doc.toObject());
  }
  const items = await readStore<RepoPlot[]>("plots", []);
  const newItem: RepoPlot = { ...data, id: `plot-${Date.now()}` };
  await writeStore("plots", [...items, newItem]);
  revalidateTag(`inventory:${data.projectId}`);
  return newItem;
}

export async function updatePlot(id: string, data: Partial<RepoPlot>): Promise<RepoPlot | null> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await PlotModel.findByIdAndUpdate(id, data, { new: true });
    if (!doc) return null;
    revalidateTag(`inventory:${doc.projectId}`);
    return docToRepo(doc.toObject());
  }
  const items = await readStore<RepoPlot[]>("plots", []);
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  await writeStore("plots", items);
  revalidateTag(`inventory:${items[idx].projectId}`);
  return items[idx];
}

export async function deletePlot(id: string): Promise<boolean> {
  if (isMongoConfigured) {
    await connectDB();
    const result = await PlotModel.findByIdAndDelete(id);
    if (result) revalidateTag(`inventory:${result.projectId}`);
    return Boolean(result);
  }
  const items = await readStore<RepoPlot[]>("plots", []);
  const next = items.filter((p) => p.id !== id);
  if (next.length === items.length) return false;
  await writeStore("plots", next);
  return true;
}

export async function countPlots(): Promise<number> {
  if (isMongoConfigured) {
    await connectDB();
    return PlotModel.countDocuments({});
  }
  const items = await readStore<RepoPlot[]>("plots", []);
  return items.length;
}
