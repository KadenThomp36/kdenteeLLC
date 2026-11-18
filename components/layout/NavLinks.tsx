"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { navItems } from "@/lib/site";
import { trackNavigation } from "@/lib/analytics";
import { KEEP_TRANSITION_ATTR } from "@/lib/theme";

// The bar's untransformed width in px (.slide-bar in app/globals.css).
const BAR_WIDTH = 100;

// Main nav. Client-only because it marks the current page (aria-current) and moves one pink
// bar: it rests under the current page's link, slides under whichever link is hovered or
// focused, and slides back. On pages with no current link (home, 404) it fades in under the
// hovered link and fades out again.
export default function NavLinks() {
  const pathname = usePathname();
  const currentHref =
    navItems.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.href ?? null;

  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const textRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const currentRef = useRef(currentHref);
  const activeRef = useRef<string | null>(null); // hovered or focused link
  const shownRef = useRef(false);
  // Until measured, the current link draws the same line in CSS (.nav-underline).
  const [measured, setMeasured] = useState(false);

  /** Put the bar under a link's text (sliding or placed instantly), or hide it. */
  const place = useCallback((href: string | null, slide: boolean) => {
    const wrap = wrapRef.current;
    const bar = barRef.current;
    if (!wrap || !bar) return;
    const text = href ? textRefs.current[href] : null;
    if (!text) {
      bar.style.opacity = "0";
      shownRef.current = false;
      return;
    }
    const wrapBox = wrap.getBoundingClientRect();
    const box = text.getBoundingClientRect();
    if (!box.width) return; // not laid out
    // Where a link underline sits: the baseline plus the 4px offset (same sum as .nav-underline).
    const fontSize = parseFloat(getComputedStyle(text).fontSize) || 14;
    bar.style.top = `${box.top - wrapBox.top + fontSize * (15 / 14) + 4}px`;
    const transform = `translateX(${box.left - wrapBox.left}px) scaleX(${box.width / BAR_WIDTH})`;
    if (slide && shownRef.current) {
      bar.style.transform = transform;
    } else {
      // Appearing from nothing (or re-measuring): no slide from wherever it last was.
      bar.style.transition = "opacity 150ms ease-out";
      bar.style.transform = transform;
      void bar.offsetWidth; // commit the jump before the slide transition comes back
      bar.style.transition = "";
    }
    bar.style.opacity = "1";
    shownRef.current = true;
  }, []);

  // Follow the current page; the first run measures and takes over from the CSS underline.
  useLayoutEffect(() => {
    currentRef.current = currentHref;
    place(activeRef.current ?? currentHref, true);
    setMeasured(true);
  }, [currentHref, place]);

  // Re-measure when the text changes size (web fonts arriving, zoom, breakpoints), without sliding.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const remeasure = () => place(activeRef.current ?? currentRef.current, false);
    const observer = new ResizeObserver(remeasure);
    observer.observe(wrap);
    window.addEventListener("resize", remeasure);
    let live = true;
    document.fonts?.ready.then(() => live && remeasure());
    return () => {
      live = false;
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, [place]);

  const activate = (href: string | null) => {
    activeRef.current = href;
    place(href ?? currentRef.current, true);
  };
  // Hover only for pointers that can hover; a tap just follows the link.
  const hover = (href: string | null) => (event: React.PointerEvent) => {
    if (event.pointerType !== "touch") activate(href);
  };

  return (
    <nav aria-label="Main">
      {/* The bar is positioned against this wrapper, outside the list, so the list holds only links. */}
      <div ref={wrapRef} onPointerLeave={hover(null)} className="relative">
        <ul className="-mr-1.5 flex items-center text-small min-[400px]:-mr-2 sm:-mr-3 md:-mr-4 md:text-[0.9375rem]">
        {navItems.map((item) => {
          const current = item.href === currentHref;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={() => trackNavigation(item.label)}
                onPointerEnter={hover(item.href)}
                onFocus={() => activate(item.href)}
                onBlur={() => activate(null)}
                className={`-my-3 block rounded-control px-1.5 py-3 min-[400px]:px-2 sm:px-3 md:px-4 ${
                  current ? "text-ink" : "text-graphite transition-colors duration-150 ease-out hover:text-ink"
                }`}
              >
                <span
                  ref={(node) => {
                    textRefs.current[item.href] = node;
                  }}
                  className={`relative inline-block ${current && !measured ? "nav-underline" : ""}`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
        </ul>
        <span ref={barRef} aria-hidden="true" {...{ [KEEP_TRANSITION_ATTR]: "" }} className="slide-bar opacity-0" />
      </div>
    </nav>
  );
}
