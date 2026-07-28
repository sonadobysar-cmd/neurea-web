import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        rose: {
          ink: "var(--rose-ink)",
          deep: "var(--rose-deep)",
          soft: "var(--rose-soft)",
          mist: "var(--rose-mist)",
        },
        sage: {
          DEFAULT: "var(--sage)",
          soft: "var(--sage-soft)",
        },
        champagne: "var(--champagne)",
        ivory: "var(--ivory)",
        stone: "var(--stone)",
        ink: "var(--ink)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
