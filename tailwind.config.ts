import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50:  "#e6f7fd",
          100: "#b3e5f9",
          200: "#80d3f5",
          300: "#4dc1f1",
          400: "#26b3ed",
          500: "#00A1E0",
          600: "#00A1E0",
          700: "#0090ca",
          800: "#007ab0",
          900: "#0B1F3B",
        },
        gray: {
          50:  "#F5F7FA",
          900: "#0B1F3B",
        },
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        sans:    ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
