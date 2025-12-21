import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export default defineNitroPlugin(() => {
  // We copy the DB to .output/server/prisma/cms.db during build (postbuild script).
  const bundledDbPath = resolve(process.cwd(), ".output/server/prisma/cms.db");
  const bundledDbUrl = pathToFileURL(bundledDbPath).toString();

  const useBundledDb = () => {
    process.env.DATABASE_URL = bundledDbUrl;
  };

  const current = process.env.DATABASE_URL;
  if (!current) {
    useBundledDb();
    return;
  }

  // If pointing to SQLite but the file doesn't exist, fall back to the bundled copy.
  try {
    const url = new URL(current);
    if (url.protocol === "file:") {
      const filePath = url.pathname;
      if (!existsSync(filePath)) {
        useBundledDb();
      }
      return;
    }
    // Any non-file URL (e.g., Postgres) is left intact.
  } catch {
    // Invalid URL string; fall back to bundled DB to stay online.
    useBundledDb();
  }
});
