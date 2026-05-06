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
          50:  "#EEF3FF",
          100: "#DDEAFF",
          200: "#BBCFFF",
          300: "#88AAFF",
          400: "#5B8FFF",
          500: "#3B6FFF",
          600: "#1B5FFF",
          700: "#1445D4",
          800: "#0F35A8",
          900: "#18181E",
        },
        gray: {
          50:  "#F0F2F8",
          900: "#18181E",
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
