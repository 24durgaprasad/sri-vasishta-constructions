import { isMongoConfigured } from "@/lib/env";
import { connectDB } from "@/lib/db";
import { EnquiryModel } from "@/lib/models/enquiry.model";
import { readStore, writeStore } from "@/lib/store";
import { saveSubmission } from "@/lib/submissions";

export interface RepoEnquiry {
  id: string;
  topic: string;
  name: string;
  phone: string;
  email?: string;
  project?: string;
  configuration?: string;
  message?: string;
  source?: string;
  status: string;
  assignedTo?: string;
  notes?: string;
  createdAt?: string;
}

export async function saveEnquiry(
  data: Omit<RepoEnquiry, "id" | "status" | "createdAt">
): Promise<RepoEnquiry> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await EnquiryModel.create({ ...data, status: "new" } as any);
    return {
      id: String((doc as any)._id),
      ...data,
      status: "new",
      createdAt: (doc as any).createdAt?.toISOString(),
    };
  }
  // Fallback: append to JSONL and store in local JSON
  await saveSubmission("enquiries.jsonl", data as Record<string, unknown>);
  const items = await readStore<RepoEnquiry[]>("enquiries", []);
  const newItem: RepoEnquiry = {
    id: `enq-${Date.now()}`,
    ...data,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  await writeStore("enquiries", [...items, newItem]);
  return newItem;
}

export async function getAllEnquiries(): Promise<RepoEnquiry[]> {
  if (isMongoConfigured) {
    await connectDB();
    const docs = await EnquiryModel.find({}).sort({ createdAt: -1 }).lean();
    return docs.map((d) => ({
      id: String(d._id),
      topic: d.topic ?? "enquiry",
      name: d.name ?? "",
      phone: d.phone ?? "",
      email: d.email,
      project: d.project,
      configuration: d.configuration,
      message: d.message,
      source: d.source,
      status: d.status ?? "new",
      assignedTo: d.assignedTo,
      notes: d.notes,
      createdAt: (d as unknown as { createdAt?: Date }).createdAt?.toISOString(),
    }));
  }
  return readStore<RepoEnquiry[]>("enquiries", []);
}

export async function updateEnquiryStatus(
  id: string,
  status: "new" | "contacted" | "closed",
  notes?: string
): Promise<boolean> {
  if (isMongoConfigured) {
    await connectDB();
    const result = await EnquiryModel.findByIdAndUpdate(id, { status, notes });
    return Boolean(result);
  }
  const items = await readStore<RepoEnquiry[]>("enquiries", []);
  const idx = items.findIndex((e) => e.id === id);
  if (idx === -1) return false;
  items[idx] = { ...items[idx], status, notes: notes ?? items[idx].notes };
  await writeStore("enquiries", items);
  return true;
}

export async function countEnquiries(): Promise<{ total: number; newCount: number }> {
  if (isMongoConfigured) {
    await connectDB();
    const [total, newCount] = await Promise.all([
      EnquiryModel.countDocuments({}),
      EnquiryModel.countDocuments({ status: "new" }),
    ]);
    return { total, newCount };
  }
  const items = await readStore<RepoEnquiry[]>("enquiries", []);
  return { total: items.length, newCount: items.filter((e) => e.status === "new").length };
}
