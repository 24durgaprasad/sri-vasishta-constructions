import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { findAdminByEmail, verifyAdminPassword, ensureAdminExists } from "@/lib/repositories/admin";
import { createSession, setSessionCookie } from "@/lib/auth";

// Simple in-memory rate limiter (5 attempts per 15 min per IP)
const attempts = new Map<string, { count: number; resetAt: number }>();

function getRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false; // not limited
  }
  if (entry.count >= 5) return true; // limited
  entry.count++;
  return false;
}

const schema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (getRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 400 });
  }

  await ensureAdminExists();
  const admin = await findAdminByEmail(parsed.data.email);
  if (!admin || !(await verifyAdminPassword(admin, parsed.data.password))) {
    return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
  }

  const token = await createSession({ id: admin.id, email: admin.email, name: admin.name, role: admin.role });
  await setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
