import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export default defineNitroPlugin(() => {
  // If an explicit DATABASE_URL is provided (e.g., production Postgres), respect it.
  if (process.env.DATABASE_URL) return;

  const pluginDir = dirname(fileURLToPath(import.meta.url));
  const dbFile = resolve(pluginDir, "../prisma/cms.db");

  // Provide a stable absolute SQLite URL for the bundled server asset.
  process.env.DATABASE_URL = pathToFileURL(dbFile).toString();
});
