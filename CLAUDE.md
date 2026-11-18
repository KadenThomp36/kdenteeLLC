# kdentee-llc — Kdentee LLC business website

Marketing site for Kaden's web-dev LLC (kdenteellc.com). Next.js 14 App Router, TypeScript,
Tailwind 3. Pages: `/`, `/work`, `/services`, `/about`, `/contact` (`/portfolio` redirects to `/work`).

## Running here (CT 129 dev)
- Dev server: `npx next dev -H 0.0.0.0 -p 3410` (T3 "Dev server" script).
  Preview at http://dev.tail2c61c0.ts.net:3410. Port 3410 is this project's; 3000 is used by the
  other Next projects, so leave it alone.
- `npm run build` must pass (it also runs lint + type check) before pushing.

## Deploying
- GitHub `KadenThomp36/kdenteeLLC` (public repo) → Vercel (kdentee-llc.vercel.app).
  **Pushing to `main` deploys to production.** Work on a branch and push only when Kaden asks.

## Conventions
- Design system (2026 redesign): quiet, light, typographic. `docs/redesign-brief.md` is the source of
  truth for tokens, layout, motion rules and final copy. Paper `#F4F4F4` page, ink text, one pink
  (`#D81B60`) used only for the primary button, link underlines and focus rings. Onest everywhere;
  M PLUS Rounded 1c 800 for the wordmark only. No cards, gradients, glows or scroll animations.
- Light and dark themes: every colour is a CSS variable with a light and a dark value in
  `app/globals.css`. Light is the default (no `data-theme` on `<html>`); visitors can pick Dark
  or Auto in the footer (`lib/theme.ts`, `components/layout/ThemeToggle.tsx`), which sets
  `data-theme="dark"` or `"auto"`. The `dark:` variant means explicit dark, or auto with a dark
  system. Elements with `data-keep-transition` keep their transitions during a theme switch.
  Check both themes when changing anything visual.
- `tailwind.config.ts` ends with `module.exports` on purpose: on Node 24 the dev server cannot
  reload it if it uses `export default`.
- Tokens live in `tailwind.config.ts` (colours, `text-h1/h2/h3/lede/body/small`, `rounded-control/image`,
  `max-w-container/prose/heading`); global styles, the hero entrance and the construction tape in
  `app/globals.css`. Build pages from `components/ui/` (Container, Section, PageIntro, Prose, Button,
  TextLink, LedgerRows, BrowserShot, ConstructionShot, Quote, Wordmark); site facts in `lib/site.ts`,
  township prices in `lib/plans.ts`.
- Contact form posts to Web3Forms from the client (`app/contact/page.tsx`). That access key is
  public by design. Any real secret goes in `.env.local` (gitignored), never in code.
- Google Analytics ID `G-7X2J418LQ8` is set in two places: `components/GoogleAnalytics.tsx` and
  `lib/analytics.ts`. The site also uses `@vercel/analytics`.
