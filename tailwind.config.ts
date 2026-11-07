import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#D42430", dark: "#B01C26", soft: "#FCECEC" },
        navy: { DEFAULT: "#1F2266", deep: "#14163F", soft: "#ECEDF7" },
        ink: "#15172E",
        muted: "#5A5F78",
        line: "#DDE0EA",
        mist: "#F5F6FA",
      },
      fontFamily: {
        display: ["Syne", "Arial", "sans-serif"],
        sans: ["Montserrat", "Arial", "sans-serif"],
      },
      maxWidth: { site: "1280px" },
    },
  },
  plugins: [],
} satisfies Config;
