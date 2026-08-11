import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const HASH_FILE = path.join(process.cwd(), "data", "admin.hash");

function readHashFromFile(): string | null {
  try {
    if (!fs.existsSync(HASH_FILE)) return null;
    const hash = fs.readFileSync(HASH_FILE, "utf8").trim();
    return hash || null;
  } catch {
    return null;
  }
}

function readHashFromEnv(): string | null {
  const b64 = process.env.ADMIN_PASSWORD_HASH_B64;
  if (!b64) return null;
  try {
    return Buffer.from(b64, "base64").toString("utf8");
  } catch {
    return null;
  }
}

export function getAdminPasswordHash(): string | null {
  return readHashFromEnv() ?? readHashFromFile();
}

export async function validatePassword(password: string): Promise<boolean> {
  const hash = getAdminPasswordHash();
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}
