// Light/dark theme. Three choices: "auto" (default, follow the system), "light", "dark".
// An explicit choice is stored in localStorage under `theme` and set as data-theme on <html>;
// "auto" removes both, and the CSS falls back to prefers-color-scheme (app/globals.css), which is
// also what happens with JavaScript off. themeInitScript runs in <head> before first paint so an
// explicit choice never flashes the wrong theme.

export type ThemeChoice = "auto" | "light" | "dark";

export const THEME_KEY = "theme";

/** The page's paper colour per theme, for <meta name="theme-color">. Keep in step with globals.css. */
export const themeColors = { light: "#F4F4F4", dark: "#17141A" } as const;

// Browser UI colour. The root layout renders two theme-color metas, one per system scheme, which
// is all "auto" needs. An explicit choice retargets their `media` so its colour always matches and
// the other never does. Only `media` is touched: React matches these metas by `content` and owns
// the nodes, so changing content or adding/removing metas makes it duplicate or crash.
export const SYSTEM_MEDIA = {
  light: "(prefers-color-scheme: light)",
  dark: "(prefers-color-scheme: dark)",
} as const;

const syncThemeColor = (choice: ThemeChoice) => {
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    const scheme = meta.content.toUpperCase() === themeColors.dark.toUpperCase() ? "dark" : "light";
    const media = choice === "auto" ? SYSTEM_MEDIA[scheme] : choice === scheme ? "all" : "not all";
    if (meta.media !== media) meta.media = media; // unchanged: no write, so observers settle
  });
};

/** Re-assert the theme-color metas for the stored choice (e.g. after client navigation). */
export const resyncThemeColor = () => syncThemeColor(readThemeChoice());

export function readThemeChoice(): ThemeChoice {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : "auto";
  } catch {
    return "auto";
  }
}

/** Show a choice on the page (attribute + theme-color) without storing it. */
export function applyThemeChoice(choice: ThemeChoice) {
  const root = document.documentElement;
  // The switch is instant: pause transitions (nav links and fields fade colour on hover, and
  // would otherwise fade into the new theme) until the new colours have been computed.
  const pause = document.createElement("style");
  pause.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(pause);
  if (choice === "auto") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", choice);
  syncThemeColor(choice);
  void getComputedStyle(root).color; // apply the new styles while transitions are off
  requestAnimationFrame(() => requestAnimationFrame(() => pause.remove()));
}

/** Store and apply a choice. */
export function setThemeChoice(choice: ThemeChoice) {
  try {
    if (choice === "auto") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, choice);
  } catch {
    // Storage blocked: the choice still applies to this page.
  }
  applyThemeChoice(choice);
}

// Inline in <head>, so it must be tiny and standalone: the same as applyThemeChoice for a stored
// choice, minus the transition pause (nothing has painted yet). The metas are retargeted again
// once the document is parsed in case they come after this script.
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t!=="light"&&t!=="dark")return;document.documentElement.setAttribute("data-theme",t);var d=${JSON.stringify(themeColors.dark.toUpperCase())},s=function(){document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.media=(m.content.toUpperCase()===d)===(t==="dark")?"all":"not all"})};s();document.addEventListener("DOMContentLoaded",s)}catch(e){}})();`;
