import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const submissionsDir = path.join(process.cwd(), "submissions");

/**
 * Appends a submission as one JSON line so nothing is ever overwritten.
 * Returns false when the filesystem is read-only (e.g. serverless); the
 * caller can then rely on the server log instead.
 */
export const saveSubmission = async (
  file: string,
  record: Record<string, unknown>,
): Promise<boolean> => {
  const line = `${JSON.stringify({ receivedAt: new Date().toISOString(), ...record })}\n`;

  try {
    await mkdir(submissionsDir, { recursive: true });
    await appendFile(path.join(submissionsDir, file), line, "utf8");
    return true;
  } catch (error) {
    console.error(`[submissions] could not persist ${file}`, error);
    console.error(`[submissions] payload: ${line.trim()}`);
    return false;
  }
};
