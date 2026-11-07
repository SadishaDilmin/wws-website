import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#D42430", dark: "#B01C26", soft: "#FCECEC", light: "#FF6B73" },
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
      // Crisper, more architectural corners across the whole site.
      borderRadius: { xl: "0.625rem", "2xl": "0.75rem" },
      keyframes: {
        ring: { "0%": { transform: "scale(1)", opacity: "0.55" }, "80%, 100%": { transform: "scale(1.7)", opacity: "0" } },
        caret: { "0%, 45%": { opacity: "1" }, "50%, 95%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      // Pulses three times after the button appears, then stays still.
      animation: {
        ring: "ring 1.8s cubic-bezier(0,0,0.2,1) 2s 3 both",
        caret: "caret 1s step-end infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
