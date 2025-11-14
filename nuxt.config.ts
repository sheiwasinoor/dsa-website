export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],

  modules: [
    '@nuxt/content'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});