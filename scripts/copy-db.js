import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve(process.cwd(), "prisma/prisma/cms.db");
const destDir = resolve(process.cwd(), ".output/server/prisma");

if (!existsSync(source)) {
  console.warn("[copy-db] prisma/prisma/cms.db not found, skipping copy.");
  process.exit(0);
}

mkdirSync(destDir, { recursive: true });
cpSync(source, resolve(destDir, "cms.db"));
console.log("[copy-db] copied prisma/prisma/cms.db -> .output/server/prisma/cms.db");
