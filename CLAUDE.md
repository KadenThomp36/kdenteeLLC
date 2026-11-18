# kdentee-llc — Kdentee LLC business website

Marketing site for Kaden's web-dev LLC (kdenteellc.com). Next.js 14 App Router, TypeScript,
Tailwind 3, Framer Motion. Pages: `/`, `/services`, `/portfolio`, `/about`, `/contact`.

## Running here (CT 129 dev)
- Dev server: `npx next dev -H 0.0.0.0 -p 3410` (T3 "Dev server" script).
  Preview at http://dev.tail2c61c0.ts.net:3410. Port 3410 is this project's; 3000 is used by the
  other Next projects, so leave it alone.
- `npm run build` must pass (it also runs lint + type check) before pushing.

## Deploying
- GitHub `KadenThomp36/kdenteeLLC` (public repo) → Vercel (kdentee-llc.vercel.app).
  **Pushing to `main` deploys to production.** Work on a branch and push only when Kaden asks.

## Conventions
- "Cosmic noir" look: dark surface (`surface` colors), pink `primary` (#E91E63) + violet accents,
  gradient glows, Framer Motion entrance animations. New sections should match.
- Theme tokens live in `tailwind.config.ts`; global styles in `app/globals.css`.
- Contact form posts to Web3Forms from the client (`app/contact/page.tsx`). That access key is
  public by design. Any real secret goes in `.env.local` (gitignored), never in code.
- Google Analytics ID `G-7X2J418LQ8` is set in two places: `components/GoogleAnalytics.tsx` and
  `lib/analytics.ts`. The site also uses `@vercel/analytics`.
