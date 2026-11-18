import type { ReactNode } from "react";

// The pink stroke drawn beneath "Kdentee" in the home hero: one filled, variable-width shape
// that lands with a little weight, swells, and arcs up into a fine tail. It is revealed left to
// right by an animated clip (see .drawn-underline in globals.css). The path comes from
// docs/underline-path.py. Decorative, so it is hidden from assistive tech.
const SHAPE =
  "M2.06 4.12C3.98 4.15 9.74 4.26 13.58 4.27C17.42 4.28 21.26 4.18 25.10 4.18C28.94 4.19 32.77 4.25 36.60 4.31C40.44 4.36 44.26 4.45 48.09 4.53C51.92 4.61 55.75 4.71 59.57 4.80C63.40 4.89 67.22 4.99 71.05 5.08C74.87 5.17 78.70 5.27 82.52 5.35C86.35 5.44 90.17 5.52 94.00 5.59C97.82 5.65 101.65 5.72 105.47 5.76C109.30 5.81 113.13 5.85 116.96 5.87C120.79 5.89 124.62 5.90 128.45 5.89C132.28 5.88 136.11 5.86 139.95 5.81C143.78 5.77 147.62 5.71 151.45 5.63C155.29 5.55 159.12 5.46 162.96 5.34C166.80 5.22 170.64 5.09 174.47 4.93C178.31 4.78 182.15 4.60 185.99 4.41C189.82 4.21 193.66 4.00 197.50 3.77C201.33 3.53 207.08 3.13 209.00 3.00C207.08 3.15 201.34 3.58 197.50 3.88C193.67 4.19 189.84 4.51 186.01 4.82C182.18 5.14 178.36 5.47 174.53 5.78C170.70 6.10 166.87 6.43 163.04 6.74C159.21 7.05 155.38 7.35 151.55 7.64C147.72 7.94 143.89 8.22 140.05 8.48C136.22 8.75 132.39 9.00 128.55 9.23C124.72 9.45 120.88 9.67 117.04 9.85C113.21 10.04 109.37 10.20 105.53 10.34C101.69 10.47 97.85 10.58 94.00 10.67C90.16 10.75 86.32 10.80 82.48 10.83C78.64 10.85 74.79 10.85 70.95 10.81C67.11 10.78 63.27 10.71 59.43 10.61C55.59 10.51 51.75 10.38 47.91 10.21C44.07 10.05 40.23 9.85 36.40 9.61C32.56 9.37 28.73 9.11 24.90 8.78C21.07 8.45 17.25 8.00 13.42 7.65C9.59 7.30 3.85 6.84 1.94 6.68C0.23 6.68 0.36 4.12 2.06 4.12Z";

export default function DrawnUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        className="drawn-underline"
        viewBox="0 0 212 14"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={SHAPE} fill="currentColor" />
      </svg>
    </span>
  );
}
