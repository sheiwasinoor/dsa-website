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
  },

  // 🔥 Allow the server to send cookies to the client
  runtimeConfig: {
    public: {
      apiBase: "/", // same-origin
    },
  },
});