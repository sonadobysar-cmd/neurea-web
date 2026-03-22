import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Sekundární pozadí sekcí */
        cream: "#F9F6F0",
        pearl: "#FFFFFF",
        sand: "#D9D4CC",
        fog: "#EBE8E3",
        canvas: "#E6E3DE",
        taupe: "#B8B3AB",
        silver: "#8E8A84",
        gold: "#B8963E",
        "gold-metallic": "#C9A24A",
        "gold-bright": "#D4B55C",
        ink: "#1A1A1A",
        /** Pouze jedna kontrastní sekce (např. statistiky) */
        "ink-deep": "#121110",
      },
      boxShadow: {
        luxury: "0 4px 24px rgba(26, 26, 26, 0.04), 0 1px 2px rgba(26, 26, 26, 0.02)",
        "luxury-lg": "0 24px 64px rgba(26, 26, 26, 0.06), 0 8px 16px rgba(26, 26, 26, 0.03)",
        "luxury-xl": "0 32px 80px rgba(26, 26, 26, 0.08), 0 12px 28px rgba(184, 150, 62, 0.08)",
        "card-hover": "0 20px 50px rgba(26, 26, 26, 0.06), 0 4px 12px rgba(184, 150, 62, 0.06)",
        glow: "0 0 80px rgba(201, 168, 76, 0.12)",
        "glow-gold": "0 0 60px rgba(212, 181, 92, 0.25), 0 0 120px rgba(184, 150, 62, 0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-sans)", "system-ui", "sans-serif"],
        /** Dekorativní skript (Great Vibes) — luxusní akcenty */
        script: ["var(--font-script)", "cursive"],
      },
      animation: {
        "logo-fade-in": "logoFadeIn 1.1s ease-out forwards",
        "logo-pulse-soft": "logoPulseSoft 5s ease-in-out infinite",
        "spin-slow": "spin 32s linear infinite",
        "logo-spin-y": "logoSpinY 48s linear infinite",
        "logo-float": "logoFloat 7s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s ease-out forwards",
      },
      keyframes: {
        logoFadeIn: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        logoPulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
        logoSpinY: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        logoFloat: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-8px) scale(1.01)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    /** Kovové zlato jako text — přebije plochou barvu `gold` z theme */
    function metallicGoldText({
      addUtilities,
    }: {
      addUtilities: (u: Record<string, Record<string, string>>, options?: { respectPrefix?: boolean }) => void;
    }) {
      addUtilities({
        ".text-gold": {
          "background-image": "var(--gold-metal) !important",
          "-webkit-background-clip": "text !important",
          "background-clip": "text !important",
          color: "transparent !important",
        },
      });
    },
  ],
};

export default config;
