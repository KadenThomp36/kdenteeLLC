import type { Config } from "tailwindcss";

// A theme colour: the RGB channels live in a CSS variable (light and dark values are set in
// app/globals.css), so opacity modifiers such as `border-graphite/50` keep working.
const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

// Design tokens from docs/redesign-brief.md. Colours and radii replace Tailwind's defaults
// on purpose, so nothing off-palette can creep in.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // `dark:` matches the same rule as the colour variables: an explicit dark choice, or a dark
  // system setting unless light was chosen explicitly (lib/theme.ts, app/globals.css).
  darkMode: [
    "variant",
    [
      "@media (prefers-color-scheme: dark) { &:not([data-theme=light] *) }",
      "&:is([data-theme=dark] *)",
    ],
  ],
  future: {
    // `hover:` only applies on devices that can actually hover.
    hoverOnlyWhenSupported: true,
  },
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: token("white"),
      paper: token("paper"),
      surface: token("surface"),
      ink: token("ink"),
      graphite: token("graphite"),
      rule: token("rule"),
      pink: {
        DEFAULT: token("pink"),
        // Hover/active background of the pink button only.
        deep: token("pink-deep"),
        // Pink text or borders on the page background (lighter in dark, for contrast).
        text: token("pink-text"),
      },
      tape: token("tape"),
    },
    borderRadius: {
      none: "0",
      control: "8px", // buttons and inputs
      image: "12px", // image frames
    },
    fontFamily: {
      sans: ["var(--font-onest)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      wordmark: ["var(--font-wordmark)", "var(--font-onest)", "system-ui", "sans-serif"],
    },
    // Fluid between the brief's mobile (360px) and desktop (1200px) sizes.
    fontSize: {
      h1: ["clamp(2.25rem, 1.607rem + 2.857vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "500" }],
      h2: ["clamp(1.75rem, 1.536rem + 0.952vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "500" }],
      h3: ["clamp(1rem, 0.973rem + 0.119vw, 1.0625rem)", { lineHeight: "1.4", letterSpacing: "0", fontWeight: "600" }],
      lede: ["clamp(1.0625rem, 0.982rem + 0.357vw, 1.25rem)", { lineHeight: "1.5" }],
      body: ["clamp(1rem, 0.973rem + 0.119vw, 1.0625rem)", { lineHeight: "1.6" }],
      small: ["0.875rem", { lineHeight: "1.5" }],
    },
    extend: {
      maxWidth: {
        container: "1120px",
        prose: "62ch",
        heading: "18em",
      },
      transitionTimingFunction: {
        "out-strong": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },
  plugins: [],
};

// CommonJS on purpose. Node 24 loads a .ts file natively, and one written with `export` is cached
// as an ES module that Tailwind cannot evict, so the running dev server would never see edits to
// this file. With module.exports it is a plain CommonJS module and reloads on change.
module.exports = config;
