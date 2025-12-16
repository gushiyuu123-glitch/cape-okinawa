/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        jp: ['"Shippori Mincho B1"', "serif"],     // 日本語見出し
        en: ['"Cormorant Garamond"', "serif"],    // 英字・ロゴ
        ui: ["Inter", "system-ui", "sans-serif"], // 本文/UI
      },
    },
  },
  plugins: [],
};
