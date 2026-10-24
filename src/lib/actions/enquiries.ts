"use server";

import { requireAdmin } from "@/lib/auth";
import { updateEnquiryStatus } from "@/lib/repositories/enquiries";

type ActionResult<T = void> = { ok: true; data: T } | { ok: false; error: string };

export async function updateEnquiryStatusAction(
  id: string,
  status: "new" | "contacted" | "closed",
  notes?: string
): Promise<ActionResult> {
  await requireAdmin();
  const ok = await updateEnquiryStatus(id, status, notes);
  if (!ok) return { ok: false, error: "Enquiry not found." };
  return { ok: true, data: undefined };
}
