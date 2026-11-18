"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// A horizontally scrollable strip. While it actually overflows (the phone layout) it becomes a
// labelled, focusable region so it can be scrolled with the arrow keys; when its content fits
// (the desktop grid) it is a plain div with no extra tab stop.
export default function ScrollRegion({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setScrollable(el.scrollWidth > el.clientWidth + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      {...(scrollable ? { role: "region", "aria-label": label, tabIndex: 0 } : {})}
    >
      {children}
    </div>
  );
}
