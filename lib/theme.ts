// Light/dark theme. Three choices: "light" (the default), "dark", and "auto" (follow the system).
// A non-default choice is stored in localStorage under `theme` and set as data-theme on <html>;
// "light" removes both, so a missing (or unknown, or legacy) value always means light, and so does
// JavaScript being off. The colours per state live in app/globals.css. themeInitScript runs in
// <head> before first paint so a stored choice never flashes the wrong theme.

export type ThemeChoice = "light" | "dark" | "auto";

export const THEME_KEY = "theme";

/** The page's paper colour per theme, for <meta name="theme-color">. Keep in step with globals.css. */
export const themeColors = { light: "#F4F4F4", dark: "#17141A" } as const;

// Browser UI colour. The root layout renders two theme-color metas, the light one on (media
// "all") and the dark one off ("not all"), which is the default. Dark swaps them; auto gives each
// its prefers-color-scheme query. Only `media` is touched: React matches these metas by `content`
// and owns the nodes, so changing content or adding/removing metas makes it duplicate or crash.
export const SYSTEM_MEDIA = {
  light: "(prefers-color-scheme: light)",
  dark: "(prefers-color-scheme: dark)",
} as const;
export const META_ON = "all";
export const META_OFF = "not all";

const syncThemeColor = (choice: ThemeChoice) => {
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    const scheme = meta.content.toUpperCase() === themeColors.dark.toUpperCase() ? "dark" : "light";
    const media = choice === "auto" ? SYSTEM_MEDIA[scheme] : choice === scheme ? META_ON : META_OFF;
    if (meta.media !== media) meta.media = media; // unchanged: no write, so observers settle
  });
};

/** Re-assert the theme-color metas for the stored choice (e.g. after client navigation). */
export const resyncThemeColor = () => syncThemeColor(readThemeChoice());

export function readThemeChoice(): ThemeChoice {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "dark" || value === "auto" ? value : "light";
  } catch {
    return "light";
  }
}

/** Elements marked with this attribute keep their transitions through a theme switch. */
export const KEEP_TRANSITION_ATTR = "data-keep-transition";

/** Show a choice on the page (attribute + theme-color) without storing it. */
export function applyThemeChoice(choice: ThemeChoice) {
  const root = document.documentElement;
  // The switch is instant: pause transitions (nav links and fields fade colour on hover, and
  // would otherwise fade into the new theme) until the new colours have been computed. The theme
  // control's sliding bar is exempt, so a click can still slide it to the new option.
  const pause = document.createElement("style");
  pause.textContent = `*:not([${KEEP_TRANSITION_ATTR}]),*::before,*::after{transition:none!important}`;
  document.head.appendChild(pause);
  if (choice === "light") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", choice);
  syncThemeColor(choice);
  void getComputedStyle(root).color; // apply the new styles while transitions are off
  requestAnimationFrame(() => requestAnimationFrame(() => pause.remove()));
}

/** Store and apply a choice. */
export function setThemeChoice(choice: ThemeChoice) {
  try {
    if (choice === "light") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, choice);
  } catch {
    // Storage blocked: the choice still applies to this page.
  }
  applyThemeChoice(choice);
}

// Inline in <head>, so it must be tiny and standalone: the same as applyThemeChoice for a stored
// choice, minus the transition pause (nothing has painted yet). Light needs nothing. The metas are
// retargeted again once the document is parsed in case they come after this script.
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t!=="dark"&&t!=="auto")return;document.documentElement.setAttribute("data-theme",t);var d=${JSON.stringify(themeColors.dark.toUpperCase())},s=function(){document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){var k=m.content.toUpperCase()===d;m.media=t==="auto"?(k?${JSON.stringify(SYSTEM_MEDIA.dark)}:${JSON.stringify(SYSTEM_MEDIA.light)}):k?${JSON.stringify(META_ON)}:${JSON.stringify(META_OFF)}})};s();document.addEventListener("DOMContentLoaded",s)}catch(e){}})();`;
