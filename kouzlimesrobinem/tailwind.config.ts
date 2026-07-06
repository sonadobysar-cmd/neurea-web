import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        "robin-display": ["var(--font-robin-display)", "system-ui", "sans-serif"],
        "robin-sans": ["var(--font-robin-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
