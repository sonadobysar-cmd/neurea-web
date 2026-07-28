import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        mist: "var(--mist)",
        stone: "var(--stone)",
        oak: "var(--oak)",
        moss: "var(--moss)",
        paper: "var(--paper)",
        copper: "var(--copper)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
