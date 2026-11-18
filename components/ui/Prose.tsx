import type { ReactNode } from "react";

// A stack of body paragraphs at the 62ch measure. Put plain <p>s (or <ul>s) inside.
export default function Prose({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`max-w-prose text-ink [&>*+*]:mt-5 ${className}`}>{children}</div>;
}
