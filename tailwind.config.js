/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        dsa: {
          yellow: "#ECEBC7",
          yellowDark: "#DDDD61",
          eucalyptus: "#6E8C7C",
          eucalyptusDark: "#617D6E",
          green: "#336341",
          greenDark: "#02331B",
          purple: "#40327E",
          purpleDark: "#301F60",
          neutralGray: "#D9D9D9",
          neutralGrayDark: "#8C8C8C",
          flurry: "#F1F5F7",
          flurryDark: "#D8DCDD",
          greenBlack: "#5D6762",
          base: "#000C05", // Background
        }
      }
    }
  },
  plugins: [],
};