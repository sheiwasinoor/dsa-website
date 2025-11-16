// nuxt.config.ts
export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],

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
        cors: true,
      },
    },
  },

  // 🔥 Allow the server to send cookies to the client
  runtimeConfig: {
    public: {
      apiBase: "/", // same-origin
    },
  },

  // 🔥 THIS WAS MISSING — safe to add
  experimental: {
    fetch: {
      credentials: "include",
    },
  },
});