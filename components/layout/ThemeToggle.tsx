"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  applyThemeChoice,
  KEEP_TRANSITION_ATTR,
  readThemeChoice,
  resyncThemeColor,
  setThemeChoice,
  THEME_KEY,
  type ThemeChoice,
} from "@/lib/theme";

const options: { value: ThemeChoice; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "auto", label: "Auto" },
];

// The bar's untransformed width in px (.theme-bar in app/globals.css).
const BAR_WIDTH = 100;

// Fired on this page when the choice changes (the storage event only reaches other tabs).
const CHANGE_EVENT = "kd-themechange";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

// Server render (and hydration) always shows "Light", the default; the stored choice is read
// right after. The options have the same structure in every state, so only colour moves.
const serverSnapshot = (): ThemeChoice => "light";

// The footer's theme control: a real radio group styled as text links, like the main nav, with
// one pink bar that slides to whichever option is hovered, and back to the selected one.
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const choice = useSyncExternalStore(subscribe, readThemeChoice, serverSnapshot);

  const rowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const labelRefs = useRef<Partial<Record<ThemeChoice, HTMLLabelElement | null>>>({});
  const choiceRef = useRef(choice);
  const hoveredRef = useRef<ThemeChoice | null>(null);
  // Set by a user action so the next choice change slides; a change from elsewhere (the stored
  // choice replacing the server's "Light" on load, another tab) just places the bar.
  const slideNextRef = useRef(false);
  // Until measured, the selected option draws a plain CSS underline in the bar's place.
  const [measured, setMeasured] = useState(false);
  const measuredRef = useRef(false);

  /** Move the bar under an option: sliding (the CSS transition) or placed instantly. */
  const place = useCallback((value: ThemeChoice, slide: boolean) => {
    const row = rowRef.current;
    const bar = barRef.current;
    const label = labelRefs.current[value];
    if (!row || !bar || !label) return;
    const rowBox = row.getBoundingClientRect();
    const box = label.getBoundingClientRect();
    const underlineY = parseFloat(getComputedStyle(row).getPropertyValue("--underline-y")) || 0;
    // Vertical position is layout (`top`), which the browser snaps to whole pixels, so the line
    // stays crisp; only the horizontal move and the width are a transform.
    bar.style.top = `${box.top - rowBox.top + underlineY}px`;
    const transform = `translateX(${box.left - rowBox.left}px) scaleX(${box.width / BAR_WIDTH})`;
    if (slide) {
      bar.style.transform = transform;
    } else {
      bar.style.transition = "none";
      bar.style.transform = transform;
      void bar.offsetWidth; // commit the jump before the transition comes back
      bar.style.transition = "";
    }
  }, []);

  // Follow the choice. The first run (hydration) measures and hands over from the CSS underline.
  useLayoutEffect(() => {
    choiceRef.current = choice;
    place(hoveredRef.current ?? choice, slideNextRef.current && measuredRef.current);
    slideNextRef.current = false;
    if (!measuredRef.current) {
      measuredRef.current = true;
      setMeasured(true);
    }
  }, [choice, place]);

  // Re-measure when the text changes size (web fonts arriving, zoom, wrapping), without sliding.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const remeasure = () => place(hoveredRef.current ?? choiceRef.current, false);
    const observer = new ResizeObserver(remeasure);
    observer.observe(row);
    Object.values(labelRefs.current).forEach((label) => label && observer.observe(label));
    window.addEventListener("resize", remeasure);
    let live = true;
    document.fonts?.ready.then(() => live && remeasure());
    return () => {
      live = false;
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, [place]);

  // On client navigation Next re-renders the <head> metas and resets their media; put the
  // choice's theme-color back whenever that happens.
  useEffect(() => {
    resyncThemeColor();
    const observer = new MutationObserver(resyncThemeColor);
    observer.observe(document.head, { subtree: true, childList: true, attributeFilter: ["media"] });
    return () => observer.disconnect();
  }, []);

  // Another tab changed the choice: follow it.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_KEY || event.key === null) applyThemeChoice(readThemeChoice());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const choose = (value: ThemeChoice) => {
    // Keyboard selection while the pointer rests on another option: the bar follows the keyboard.
    if (hoveredRef.current !== value) hoveredRef.current = null;
    slideNextRef.current = true;
    setThemeChoice(value);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  // Hover only for pointers that can hover; a tap just selects (and the bar slides from the old
  // selection to the new one).
  const hover = (value: ThemeChoice | null) => (event: React.PointerEvent) => {
    if (event.pointerType === "touch") return;
    hoveredRef.current = value;
    place(value ?? choiceRef.current, true);
  };

  return (
    <fieldset className={`theme-toggle min-w-0 ${className}`}>
      <legend className="sr-only">Theme</legend>
      <div className="flex flex-wrap items-baseline gap-x-6">
        {/* The legend is the accessible name; this is its visible twin, laid out in the row. */}
        <span aria-hidden="true">Theme</span>
        <div ref={rowRef} onPointerLeave={hover(null)} className="relative flex flex-wrap items-baseline gap-x-6">
          {options.map(({ value, label }) => {
            const selected = choice === value;
            return (
              <label
                key={value}
                ref={(node) => {
                  labelRefs.current[value] = node;
                }}
                onPointerEnter={hover(value)}
                className={`tap-target cursor-pointer select-none after:-left-3 after:-right-3 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pink ${
                  selected
                    ? `text-ink ${measured ? "" : "theme-underline"}`
                    : "transition-colors duration-150 ease-out hover:text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="theme"
                  value={value}
                  checked={selected}
                  onChange={() => choose(value)}
                  className="sr-only"
                />
                {label}
              </label>
            );
          })}
          <span
            ref={barRef}
            aria-hidden="true"
            {...{ [KEEP_TRANSITION_ATTR]: "" }}
            className={`theme-bar ${measured ? "" : "invisible"}`}
          />
        </div>
      </div>
    </fieldset>
  );
}
