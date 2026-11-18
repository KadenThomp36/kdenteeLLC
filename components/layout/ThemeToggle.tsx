"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  applyThemeChoice,
  readThemeChoice,
  resyncThemeColor,
  setThemeChoice,
  THEME_KEY,
  type ThemeChoice,
} from "@/lib/theme";

const options: { value: ThemeChoice; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

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

// Server render (and hydration) always shows "Auto"; the stored choice is read right after. The
// three options have the same structure in every state, so only colour and underline move.
const serverSnapshot = (): ThemeChoice => "auto";

// The footer's theme control: a real radio group styled as text links, like the main nav.
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const choice = useSyncExternalStore(subscribe, readThemeChoice, serverSnapshot);

  // On client navigation Next re-renders the <head> metas and resets their media; put the
  // explicit choice's theme-color back whenever that happens.
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
    setThemeChoice(value);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <fieldset className={`theme-toggle min-w-0 ${className}`}>
      <legend className="sr-only">Theme</legend>
      <div className="flex flex-wrap items-baseline gap-x-6">
        {/* The legend is the accessible name; this is its visible twin, laid out in the row. */}
        <span aria-hidden="true">Theme</span>
        {options.map(({ value, label }) => {
          const selected = choice === value;
          return (
            <label
              key={value}
              className={`tap-target cursor-pointer select-none underline decoration-[1.5px] underline-offset-4 after:-left-3 after:-right-3 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-pink ${
                selected
                  ? "text-ink decoration-pink"
                  : // Same pink underline as the selected option, faded in on hover (as in the nav).
                    "decoration-transparent transition-[color,text-decoration-color] duration-150 ease-out hover:text-ink hover:decoration-pink"
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
      </div>
    </fieldset>
  );
}
