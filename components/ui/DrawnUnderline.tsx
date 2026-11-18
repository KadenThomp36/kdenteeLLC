import type { ReactNode } from "react";

// The pink stroke drawn beneath "Kdentee" in the home hero: one filled, variable-width shape
// that lands with a little weight, swells, then tapers to a fine tail. It is revealed left to
// right by an animated clip (see .drawn-underline in globals.css). The path comes from
// docs/underline-path.py. Decorative, so it is hidden from assistive tech.
const SHAPE =
  "M2.01 5.27C3.93 5.24 9.68 5.16 13.51 5.06C17.35 4.96 21.18 4.78 25.02 4.68C28.85 4.58 32.68 4.53 36.51 4.48C40.35 4.43 44.18 4.40 48.01 4.38C51.84 4.36 55.67 4.36 59.50 4.36C63.33 4.37 67.17 4.38 71.00 4.40C74.83 4.41 78.66 4.44 82.49 4.47C86.32 4.49 90.15 4.53 93.98 4.56C97.82 4.59 101.65 4.63 105.48 4.66C109.31 4.69 113.14 4.72 116.98 4.75C120.81 4.78 124.64 4.81 128.48 4.83C132.31 4.85 136.14 4.87 139.98 4.87C143.81 4.88 147.65 4.88 151.48 4.87C155.31 4.86 159.15 4.85 162.98 4.82C166.82 4.79 170.65 4.75 174.49 4.69C178.32 4.63 182.16 4.56 185.99 4.48C189.83 4.39 193.66 4.29 197.50 4.17C201.33 4.05 207.08 3.82 209.00 3.75C207.08 3.83 201.33 4.08 197.50 4.26C193.67 4.44 189.84 4.62 186.01 4.81C182.17 5.00 178.34 5.19 174.51 5.37C170.68 5.56 166.85 5.75 163.02 5.94C159.18 6.13 155.35 6.31 151.52 6.49C147.69 6.67 143.86 6.85 140.02 7.02C136.19 7.19 132.36 7.35 128.52 7.51C124.69 7.67 120.86 7.81 117.02 7.95C113.19 8.09 109.35 8.22 105.52 8.33C101.69 8.45 97.85 8.55 94.02 8.64C90.18 8.73 86.34 8.81 82.51 8.87C78.67 8.93 74.84 8.97 71.00 9.00C67.17 9.03 63.33 9.04 59.50 9.03C55.66 9.03 51.83 9.00 47.99 8.95C44.16 8.90 40.32 8.84 36.49 8.74C32.65 8.65 28.82 8.53 24.98 8.37C21.15 8.21 17.32 7.95 13.49 7.78C9.65 7.61 3.90 7.40 1.99 7.33C0.62 7.33 0.64 5.27 2.01 5.27Z";

export default function DrawnUnderline({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        className="drawn-underline"
        viewBox="0 0 212 12"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={SHAPE} fill="currentColor" />
      </svg>
    </span>
  );
}
