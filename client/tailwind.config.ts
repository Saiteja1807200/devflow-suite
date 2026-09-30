import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211f",
        ocean: "#207a8a",
        mint: "#3dbb91",
        coral: "#ff7b72",
        amber: "#f6b443"
      },
      boxShadow: {
        panel: "0 18px 55px rgba(20, 32, 31, 0.12)"
      }
    }
  },
  plugins: []
} satisfies Config;