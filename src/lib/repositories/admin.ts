import bcrypt from "bcryptjs";
import { isMongoConfigured } from "@/lib/env";
import { connectDB } from "@/lib/db";
import { AdminModel } from "@/lib/models/admin.model";
import { readStore, writeStore } from "@/lib/store";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/lib/env";

export interface RepoAdmin {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "owner" | "editor" | "sales";
  active: boolean;
}

async function ensureDefaultAdmin(): Promise<RepoAdmin[]> {
  const stored = await readStore<RepoAdmin[]>("admins", []);
  if (stored.length > 0) return stored;
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  const admin: RepoAdmin = {
    id: "admin-default",
    name: "Admin",
    email: ADMIN_EMAIL,
    passwordHash,
    role: "owner",
    active: true,
  };
  await writeStore("admins", [admin]);
  return [admin];
}

export async function findAdminByEmail(email: string): Promise<RepoAdmin | null> {
  if (isMongoConfigured) {
    await connectDB();
    const doc = await AdminModel.findOne({ email, active: true });
    if (!doc) return null;
    return {
      id: String(doc._id),
      name: doc.name,
      email: doc.email,
      passwordHash: doc.passwordHash,
      role: doc.role,
      active: doc.active,
    };
  }
  const admins = await ensureDefaultAdmin();
  return admins.find((a) => a.email === email && a.active) ?? null;
}

export async function verifyAdminPassword(
  admin: RepoAdmin,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, admin.passwordHash);
}

export async function ensureAdminExists(): Promise<void> {
  if (isMongoConfigured) {
    await connectDB();
    const count = await AdminModel.countDocuments({});
    if (count === 0) {
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
      await AdminModel.create({
        name: "Admin",
        email: ADMIN_EMAIL,
        passwordHash,
        role: "owner",
        active: true,
      });
    }
    return;
  }
  await ensureDefaultAdmin();
}
