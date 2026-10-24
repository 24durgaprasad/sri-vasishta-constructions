import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { isCloudinaryConfigured, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "@/lib/env";

export async function POST(req: Request) {
  await requireAdmin();

  if (!isCloudinaryConfigured) {
    return NextResponse.json({ ok: false, error: "Cloudinary is not configured." }, { status: 503 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "vasishta";

  if (!file) {
    return NextResponse.json({ ok: false, error: "No file provided." }, { status: 400 });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

  // Create Cloudinary SHA1 signature
  const { createHash } = await import("node:crypto");
  const signature = createHash("sha1")
    .update(`${paramsToSign}${CLOUDINARY_API_SECRET}`)
    .digest("hex");

  const uploadFormData = new FormData();
  uploadFormData.set("file", file);
  uploadFormData.set("api_key", CLOUDINARY_API_KEY);
  uploadFormData.set("timestamp", String(timestamp));
  uploadFormData.set("signature", signature);
  uploadFormData.set("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: uploadFormData }
  );

  const json = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    return NextResponse.json(
      { ok: false, error: (json.error as { message: string })?.message ?? "Upload failed." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, url: json.secure_url, publicId: json.public_id });
}
