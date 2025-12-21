import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

// nuxt.config.ts
export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css", "~/assets/css/themes.css", "~/assets/css/fonts.css"],

  modules: ["@nuxt/content"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // 🔥 VERY IMPORTANT FOR AUTH COOKIES
  nitro: {
    routeRules: {
      "/api/**": {
        cors: false,
      },
    },
    serverAssets: [
      {
        baseURL: "/db",
        dir: "./prisma/prisma", // ships the SQLite file with the server bundle
      },
    ],
    hooks: {
      "nitro:build:after": (nitro) => {
        const source = resolve(nitro.options.srcDir, "prisma/prisma/cms.db");
        if (!existsSync(source)) return;

        const destDir = resolve(nitro.options.output.serverDir, "prisma");
        mkdirSync(destDir, { recursive: true });
        cpSync(source, resolve(destDir, "cms.db"));
      },
    },
  },

  // 🔥 Allow the server to send cookies to the client
  runtimeConfig: {
    public: {
      apiBase: "/", // same-origin
    },
  },
});
