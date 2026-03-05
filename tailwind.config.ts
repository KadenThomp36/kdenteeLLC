import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E91E63",
          50: "#FFF0F3",
          100: "#FFD9E2",
          200: "#FFB3C6",
          300: "#FF8FAB",
          400: "#EC407A",
          500: "#E91E63",
          600: "#D81B60",
          700: "#C2185B",
          800: "#AD1457",
          900: "#880E4F",
          950: "#4A0726",
        },
        surface: {
          DEFAULT: "#0a0a0f",
          50: "#18181f",
          100: "#1e1e28",
          200: "#252532",
          300: "#2d2d3d",
        },
        violet: {
          DEFAULT: "#8b5cf6",
          glow: "rgba(139, 92, 246, 0.15)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-rounded)",
          "system-ui",
          "ui-sans-serif",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        shimmer: "text-shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(233, 30, 99, 0.3)",
        "glow-lg": "0 0 80px -20px rgba(233, 30, 99, 0.4)",
        "glow-violet": "0 0 40px -10px rgba(139, 92, 246, 0.3)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
