import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./schema.prisma",        // now relative to /prisma
  migrations: {
    path: "./migrations",           // migrations folder will live here
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});