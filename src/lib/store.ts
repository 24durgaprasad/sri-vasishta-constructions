import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const storeDir = path.join(process.cwd(), "data");

async function ensureDir() {
  if (!existsSync(storeDir)) await mkdir(storeDir, { recursive: true });
}

export async function readStore<T>(name: string, fallback: T): Promise<T> {
  try {
    await ensureDir();
    const file = path.join(storeDir, `${name}.json`);
    if (!existsSync(file)) return fallback;
    const raw = await readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeStore<T>(name: string, data: T): Promise<void> {
  await ensureDir();
  const file = path.join(storeDir, `${name}.json`);
  await writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export async function updateStore<T extends { id: string }>(
  name: string,
  id: string,
  patch: Partial<T>,
  fallback: T[]
): Promise<T | null> {
  const items = await readStore<T[]>(name, fallback);
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...patch, id };
  await writeStore(name, items);
  return items[idx];
}

export async function deleteFromStore<T extends { id: string }>(
  name: string,
  id: string,
  fallback: T[]
): Promise<boolean> {
  const items = await readStore<T[]>(name, fallback);
  const next = items.filter((i) => i.id !== id);
  if (next.length === items.length) return false;
  await writeStore(name, next);
  return true;
}
