# Kdentee redesign brief (2026)

The single source of truth for the redesign on branch `redesign-2026`. Builders: read this
whole file, then `.claude/skills/frontend-design/SKILL.md` and
`.claude/skills/emil-design-eng/SKILL.md`, before writing code. The copy below is final.
Use it verbatim. Do not add sections, stats, testimonials, badges or claims that are not here.

## What this site is

The company site of Kdentee LLC, a one-person web studio run by Kaden Thompson in Waterford,
Michigan. It should read as a company site, not a sales pitch aimed at one kind of client.
The previous site was rejected by its owner as "AI vibe-coded". The approved direction is
quiet, typographic, light, and built from real things: his portrait, real client screenshots,
his own side projects.

Subject, audience, job: a small organization (a township office, a community group, a shop)
deciding whether to trust one person with its website. The page's job is to show who he is,
what he has built, what he does, and how to reach him.

## Design system

### Colour (exactly these; no others, no gradients except the two noted)

Every colour is a CSS variable (RGB channels, defined in `app/globals.css`) with a light and a
dark value, exposed to Tailwind in `tailwind.config.ts`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `paper` | `#F4F4F4` | `#17141A` | Page background. The light value must stay exactly this: the light hero portraits are flattened onto it. |
| `surface` | `#FFFFFF` | `#1F1B23` | Form fields, image frames |
| `ink` | `#201A23` | `#F2EFF3` | Headings and primary text |
| `graphite` | `#5E5763` | `#A9A1AE` | Secondary text |
| `rule` | `#E1DEE2` | `#332D38` | 1px dividers and borders |
| `pink` | `#D81B60` | same | The one brand colour: primary buttons, link underlines, the dot in the wordmark, focus rings, `::selection` |
| `pink-deep` | `#AD1457` | same | Hover/active of pink buttons only |
| `pink-text` | `#AD1457` | `#F06A99` | Pink text or borders on the page background (form errors, invalid fields) |
| `tape` | `#F7C600` | same | Only the "under construction" tape |
| `white` | `#FFFFFF` | same | Text on the pink button |

**Themes.** Three choices: Auto (the default, follows the system), Light, Dark. An explicit
choice sets `data-theme` on `<html>` and is stored in `localStorage` under `theme`; a small
script in `<head>` applies it before first paint. The control is a radio group in the footer,
on its own line under the footer row, styled like the text navigation ("Theme" then Auto,
Light, Dark; the selected option has the pink underline). No icons, and no colour transition
when the theme switches. Use the `dark:` Tailwind variant only where a token is not enough.
Screenshots of client sites, the Koan banner and the About portrait are pictures of light
things and stay as they are in dark.

Pink is rare. On any screen it should appear on one button, link underlines, and nothing else.
The one exception is the drawn underline beneath "Kdentee" in the home hero (`DrawnUnderline`):
a single hand-made-looking stroke, never a scribble and never repeated elsewhere. Two versions
are kept and chosen with the `variant` prop: `brush` (in use: an ink-brush sweep like one stroke
of an enso, solid where it lands and breaking into dry streaks as it lifts) and `marker` (one
pass of a thick felt-tip pen: even width, round ends).
No pink headings, no pink words inside headings, no tinted backgrounds, no glows, no shadows on
cards or buttons. The only gradients allowed are the mask fade on the hero portrait and the
sheen on the construction tape.

### Type

- **Onest** (Google, via `next/font/google`, weights 400, 500, 600) for everything.
- **M PLUS Rounded 1c 800** (already in `public/fonts/`, load only that file via
  `next/font/local`) for the wordmark only: `kdentee` in ink followed by a pink `.`.
- Headings are weight 500, never bolder. Letter-spacing `-0.03em` on h1, `-0.02em` on h2, `0` below.
  `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Scale (desktop / mobile px): h1 60 / 36, line-height 1.05. h2 36 / 28, line-height 1.15.
  h3 17 / 16, weight 600, line-height 1.4. Lede 20 / 17, line-height 1.5. Body 17 / 16,
  line-height 1.6. Small 14. Nothing below 13.
- Body text max width 62ch. Headings max about 18em.
- Sentence case everywhere. No all-caps labels, no letter-spaced eyebrow labels above headings,
  no decorative 01/02/03 numbering, no icons next to headings or list items, no emoji.
  (The construction tape is the single all-caps exception because it is a picture of tape.)
- Do not append arrows (→) to links or buttons.

### Layout

- One container: max-width 1120px, gutters 24px mobile / 40px from 768px up.
- Everything is left-aligned. Nothing is centred.
- Sections are separated by a full-container 1px `rule` line, with 96px vertical padding
  desktop / 56px mobile. More space above a heading than below it.
- **The one repeated layout idea: ledger rows.** A row is a two-column grid: a short label or
  h3 on the left (about 240px), text on the right, with a 1px rule between rows. On mobile the
  row stacks, label above text. Use ledger rows for services, facts, project lists and plan
  details. Do not use cards, card grids, bento grids, icon tiles or pills.
- Radius: 8px on buttons and inputs, 12px on images. No other radii.
- No sticky header. No hamburger: the four nav links fit beside the wordmark at 360px wide.
- **Phone layout (below 768px) avoids a plain stack of full-width blocks:**
  - Home hero: the portrait sits left with a byline to its right (name over "Software engineer and
    owner"), and the h1 pulls up so its first line overlaps the portrait's faded lower edge. No
    scrim or shadow behind the text: the first line must keep at least 7:1 contrast against the
    darkest pixel behind it, which comes from the mobile portrait file and the overlap amount.
    The signature line under the actions is shown only from 768px up.
  - Home "Recent work" is a swipe row (CSS scroll snap, `ScrollRegion`): one item in view, the
    next peeking in from the screen edge. From 768px it is the two-column grid.
  - Ledger rows with short labels keep the label in a left column (`LedgerRows compact`): the
    home side-project list and the Lincoln facts on the Work page. Lists with long labels stack.

### Motion and interaction

- One designed moment only: on first load of the home page the portrait fades in (400ms) and
  the hero text rises 8px and fades in with a short stagger (each under 300ms, whole sequence
  under 700ms), easing `cubic-bezier(0.23, 1, 0.32, 1)`, CSS only. Wrap it in
  `@media (prefers-reduced-motion: no-preference)`.
- As part of that same moment, the underline beneath "Kdentee" is wiped on from the left once
  the headline has landed (900ms, `cubic-bezier(0.3, 0, 0.1, 1)`, 380ms delay): quick through
  the body of the stroke, slow as it finishes. It is fully visible when motion is reduced.
- No scroll-triggered animation, no fade-up on sections, no hover lift on images.
- Buttons: `transform: scale(0.97)` on `:active`, colour change on hover, transitions on
  `background-color, transform` only, 150ms ease-out. Never `transition: all`.
- Text links: underlined with `text-decoration-color: pink`, `text-underline-offset: 4px`,
  thickness 1.5px, going to 2.5px on hover (transition `text-decoration-thickness` 150ms).
- Hover styles go inside `@media (hover: hover)`.
- Remove `framer-motion` entirely (uninstall it once nothing imports it).

### Details that must be right

- Visible `:focus-visible` ring on every interactive element: 2px pink, 2px offset.
- A "Skip to content" link as the first focusable element.
- `::selection` pink background with white text; `caret-color` pink; `accent-color` pink.
- `font-variant-numeric: tabular-nums` on prices.
- Use real typographic characters in copy: curly quotes and apostrophes (’ “ ”), and
  non-breaking spaces where a number and its unit would split.
- All images through `next/image` with real `alt` text, `sizes`, and `priority` on the hero
  portrait only.
- Semantic HTML: one `h1` per page, landmarks (`header`, `nav`, `main`, `footer`), lists for
  lists, a real `<table>` for the price table (with a scrollable wrapper on mobile if needed).
- Current page in the nav gets `aria-current="page"` and a pink underline.
- Works from 360px to 1600px+. Check 390, 768, 1024, 1440.
- Server components by default. Only the contact form (and anything that truly needs state)
  is a client component.

## Shared pieces (built by the foundation builder; page builders import, never restyle)

Put these in `components/ui/` unless noted:

- `Container`, `Section` (handles the rule line and vertical padding; accepts an optional `id`)
- `Button` (renders `<a>`/`Link` or `<button>`; variants `primary` only for now) and `TextLink`
- `LedgerRows` + `LedgerRow` (label/heading left, children right)
- `Wordmark`
- `BrowserShot` (a screenshot in a 12px-radius frame with a 1px rule border, 16:10, `object-fit: cover`,
  `object-position: top`)
- `ConstructionShot` (the same frame holding `/img/work/hope-blurred.jpg` with a further 3px CSS
  blur, a 40% paper veil, and two strips of yellow caution tape crossing at slight opposite
  angles: the front strip repeats the words "UNDER CONSTRUCTION" separated by small black
  diamonds, the back strip is black and yellow diagonal stripes. Skeuomorphic: a top-light
  sheen, faint fold lines, 1px darker edges and a soft drop shadow under the tape. Decorative:
  the tape gets `aria-hidden`, the figure gets a text alternative "Hope Township's new website,
  still being built". Reference implementation: `/tmp/kd-mock/home-v5.html`, classes `.wip`
  and `.tape`.)
- `Quote` (the testimonial: attribution left, quote right, like a ledger row)
- `components/layout/Header.tsx`, `components/layout/Footer.tsx`
- Site-wide facts in `lib/site.ts` (name, email, location, nav items, external URLs) and the
  plan prices in `lib/plans.ts`, so nothing is hard-coded twice.

Header: wordmark (links home) left; nav right: Work, Services, About, Contact.

Footer, one quiet row (stacks on mobile): "Kdentee LLC, Waterford, Michigan" · the email as a
link · "GitHub" linking to https://github.com/KadenThomp36 · "© {year}". Below the row, the Theme line (Auto, Light, Dark).

## Assets (already in place; do not regenerate)

| File | What |
|---|---|
| `public/img/kaden-hero.jpg` (1067×1130) | Black-and-white portrait as a vignetted bust: the backdrop is exactly `#F4F4F4` and the chest dissolves into it with an eased, grain-dithered falloff baked into the file by `docs/portrait-vignette.py`. Hero only. Always show it whole and unoptimized, with no frame, crop or CSS mask. He looks toward the right, so the photo sits LEFT of the headline on desktop. |
| `public/img/kaden-hero-mobile.jpg` (1067×950) | The same portrait with an earlier, shorter dissolve (`docs/portrait-vignette.py --mobile`), served below 768px so the headline can overlap its faded lower edge and stay legible. Same rules: whole, unoptimized, no mask. |
| `public/img/kaden-hero-dark.webp` (1067×1130), `kaden-hero-mobile-dark.webp` (1067×950) | The same two portraits for the dark theme: transparent cut-outs made with `docs/portrait-vignette.py --dark` (alpha matting, then foreground estimation, so hair keeps its detail and carries no white halo). Shown with the `dark:` variant; only the visible theme's file is downloaded. On phones the headline must keep at least 7:1 contrast against the LIGHTEST pixel behind its first line. |
| `public/img/kaden-about.jpg` (1067×1600) | Smiling portrait. Its backdrop does not match the page, so show it framed (12px radius). About page only. |
| `public/img/work/lincoln-home.jpg`, `lincoln-meeting.jpg` (2000×1250) | Live Lincoln Township site |
| `public/img/work/hope-blurred.jpg` | Pre-blurred Hope screenshot. The sharp one must never be added to the repo: the site is not launched. |
| `public/img/koan-banner.png` (1760×520) | Koan's banner |

Everything in `public/png`, `public/jpg`, `public/svg`, the root `SCR-20251121-jbym.jpeg`, and
the unused font weights are old and should be deleted once nothing references them.
Keep `public/pdf/Resume2025.pdf` in place but link to it from nowhere.

## Site map

| Route | Notes |
|---|---|
| `/` | Home |
| `/work` | Replaces `/portfolio`. Add a permanent redirect `/portfolio` → `/work` in `next.config.js`. |
| `/services` | Includes plans and prices |
| `/about` | |
| `/contact` | Keeps the existing Web3Forms submission and analytics events |
| not-found | |

Keep `components/GoogleAnalytics.tsx`, `lib/analytics.ts` and `@vercel/analytics` working as they are.

Metadata (root): title template `%s | Kdentee LLC`, default title
`Kdentee LLC | Websites designed, built and hosted in Michigan`, description
`Kdentee is a one-person web studio in Waterford, Michigan. Kaden Thompson designs, builds and hosts websites for local governments, community groups and small businesses.`
Give every page its own title and description, and set Open Graph title/description.

---

# Copy

`[link: …]` marks a link target. Text in straight quotes here should be typeset with curly ones.

## Home (`/`)

**Hero**

- h1: Kdentee is a one-person web studio in Waterford, Michigan.
- Lede: I design and build websites for local governments, community groups and small businesses, then host them and keep them running.
- Primary button: Get in touch [link: /contact]
- Text link: See recent work [link: /work]
- Signature line under the actions (small, graphite; the name in ink, weight 600): **Kaden Thompson**, software engineer and owner
- Portrait alt: Kaden Thompson

**Recent work** (h2). Two columns on desktop, a swipe row on mobile. Each item is a shot, then h3, then a small graphite line, then a paragraph. Not cards: no border, background or padding around the item.

1. `BrowserShot` of `lincoln-home.jpg` (alt: The home page of Lincoln Township's website). The shot and the h3 link to `/work#lincoln`.
   - h3: Lincoln Township
   - Line: Midland County, live since 2025
   - Text: I've looked after Lincoln's website since 2022. In 2025 they chose me in a competitive bid to rebuild it, and in 2026 it moved to the township's own .gov address. Daily visits roughly doubled in the first year.
2. `ConstructionShot`. The h3 links to `/work#hope`.
   - h3: Hope Township
   - Line: Midland County, in progress
   - Text: Hope's new site is being built now, with online booking for the township hall and park pavilions.

Below both, the `Quote`:

> "They gave us all the features we requested in less time than expected. We are very pleased with the end product and have no reservations about our decision to hire them."

Attribution: Kimberly Oswald, Treasurer, Lincoln Township

**What I do** (h2). Ledger rows:

- Design and build: Sites designed around what your visitors come to do, built in modern code that loads fast on a phone.
- Editing without me: Pages, events, notices and photos are changed in a simple admin, so updating your hours never needs a phone call.
- Hosting and upkeep: I host what I build and handle anything technical: domains, security, backups, monitoring and fixes.
- Yours to keep: Your domain, content and hosting account are registered to you, and you get a written runbook for how the site works, so any developer could pick it up later.

Then a text link: See services and prices [link: /services]

**Things I build for myself** (h2)

- Intro: Most evenings I'm working on something of my own. A few of them:
- The Koan banner image, full container width, 12px radius, 1px rule border (alt: Koan, a quiet browser for the Mac)
- The full project list from `components/SideProjects.tsx`, the same component the Work page
  uses, so both pages always show every project and every project is linked (see the Work
  section below for the rows; Koan links to its public downloads repository because its source
  is private).
- Text link: Everything else is on GitHub [link: https://github.com/KadenThomp36]

**Get in touch** (h2)

- Text: Tell me a little about your organization and what you need. I reply by the next business day.
- Primary button: Send a message [link: /contact]
- Text link: kadenthompson@kdenteellc.com [link: mailto:kadenthompson@kdenteellc.com]

## Work (`/work`)

- h1: Work
- Lede: Client sites I've built and look after, and a few things I've made for myself.

**Lincoln Township** (h2, section id `lincoln`)

- Small line under the h2: Midland County, Michigan
- `BrowserShot` of `lincoln-home.jpg`, large (full container width on desktop).
- Ledger rows (facts):
  - Client: Lincoln Township, Midland County
  - Since: 2022. Rebuilt in 2025.
  - My part: Design, build, the move to .gov, hosting and day-to-day updates
  - Live at: www.lincolntwp-midland.gov [link: https://www.lincolntwp-midland.gov, opens in a new tab, `rel="noopener"`]
- Paragraphs:
  - I started by maintaining Lincoln's old website in 2022. In 2025 the township asked for bids on a rebuild and chose mine.
  - The new site is organized around what residents come for: paying property taxes, trash and recycling days, meeting dates, renting the hall. A search box on the home page covers everything else.
  - Every agenda and set of minutes is published as a web page with a short summary of what was decided, alongside the original PDF. That makes meeting records readable on a phone, findable in search, and usable with a screen reader.
- `BrowserShot` of `lincoln-meeting.jpg` (alt: A Lincoln Township Planning Commission meeting page showing the minutes as a web page), narrower than the first shot (about two thirds of the container), with a small graphite caption under it: A meeting page, with the minutes as text and the original PDF beside them.
- Paragraph: In 2026 the site moved to the township's own .gov address. I host it and keep it current, and daily visits roughly doubled in the first year after the rebuild.
- The `Quote` (same as home).

**Hope Township** (h2, section id `hope`)

- Small line: Midland County, Michigan. In progress.
- `ConstructionShot`, about two thirds of the container wide.
- Paragraphs:
  - Hope Township hired me in 2026 to replace its website. The new one is being built now on the same foundation as Lincoln's.
  - It adds online booking for the township hall and park pavilions, and staff accounts that give each official access to only the sections they look after.

**Things I build for myself** (h2, section id `own`)

- Intro: These are projects I built because I wanted them to exist.
- The Koan banner image.
- Ledger rows. Where a link is given, the project name is the link (new tab):
  - Koan [link: https://github.com/KadenThomp36/koan-updates]: A native web browser for the Mac, with vertical tabs and workspaces.
  - Marquee [link: https://github.com/KadenThomp36/marquee]: The TV and movie tracker my household uses, running on my own server.
  - Crate [link: https://github.com/KadenThomp36/crate]: An inventory system for physical things, down to which box is on which shelf.
  - Home Assistant cards: Open source dashboard cards for Home Assistant: a timeline [link: https://github.com/KadenThomp36/chronicle-card], an air quality monitor [link: https://github.com/KadenThomp36/air-quality-card] and a garage view [link: https://github.com/KadenThomp36/garage-card].
  - Ankh [link: https://github.com/KadenThomp36/ankh]: A flashcard app for the terminal, written in Rust.
- Text link: Everything else is on GitHub [link: https://github.com/KadenThomp36]

**Closing** (h2: Have a project in mind?)

- Text: Tell me a little about your organization and what you need.
- Primary button: Get in touch [link: /contact]

## Services (`/services`)

- h1: Services
- Lede: I take a website from the first conversation to launch, then host it and look after it. This page covers what that includes and what it costs.

**What's included** (h2). Ledger rows:

- Design and build: Each site is designed around what your visitors come to do, then built in modern code that loads fast on a phone.
- Moving your content: I bring over your existing pages, documents and photos, and rewrite the ones that need it.
- An admin for your staff: Each person gets their own account and sees only the sections they look after. Every change is logged.
- Accessibility: Sites are tested against WCAG 2.1 AA before launch, with automated tools and by hand. If something I built falls short later, I fix it at no charge.
- Hosting and upkeep: Hosting, your domain, security updates, backups and uptime monitoring are handled for you.
- Training: I show your staff how to use the admin before launch.
- Yours to keep: Your domain, content and hosting account are registered to you, and you get a written runbook for how the site works, so any developer could pick it up later.

**Plans for townships** (h2, section id `plans`)

- Intro: My township pricing is fixed and public. Price depends on population, because smaller townships have fewer meetings and less to post.

A real `<table>`, three columns. Prices use tabular numbers. Data lives in `lib/plans.ts`.

| | Under 2,000 residents | 2,000 to 5,000 residents |
|---|---|---|
| New site build | $3,500 | $5,500 |
| Essentials, per year | $780 | $1,500 |
| Managed, per year | $1,200 | $2,400 |
| Deposit at signing | $500 | $1,500 |

- Under the table (small, graphite): Population by the 2020 Census. Townships over 5,000 are quoted individually.

Then h3 "Essentials or Managed" with one paragraph: The two yearly plans differ in who does the posting. On Essentials, your staff post through the admin or by email, and I answer support requests by the next business day. On Managed, I do all the posting and keep your meeting calendar, so every agenda and set of minutes goes up on time. Meeting postings are handled the same business day, and the board gets a yearly traffic and accessibility report.

Then h3 "Both plans include" as a plain list (`<ul>`, no icons, no check marks; use ledger-style rules between items or a simple two-column list on desktop):

- Hosting, the .gov domain, security, backups and uptime monitoring
- Posted files turned into accessible web pages automatically
- Free fixes to anything I built that fails WCAG 2.1 AA
- Paper records made accessible, up to 500 pages a year
- A documented runbook, kept current

Then h3 "The build includes" as a plain list:

- Design on the township template
- Up to roughly 50 pages moved over and rewritten
- Your complete meeting archive, with every agenda and set of minutes turned into an accessible web page
- Staff accounts with roles and an activity log
- An email-to-post inbox
- Site search
- A contact form with spam filtering
- Facility rental booking with approval and a calendar
- .gov setup or migration
- Accessibility testing before launch
- Staff training

Then h3 "Terms" with one paragraph: A deposit is due at signing and the balance at launch. Yearly plans are billed in advance, and the first year starts the day the site goes live. Online payment setup is $500 to $750, with processing fees staying with the township. Other work outside the plan is $125 an hour, estimated first.

**Everyone else** (h2)

- Text: For community groups, nonprofits and small businesses, I quote each project after we've talked about what you need. Hosting and upkeep work the same way as above.
- Primary button: Ask for a quote [link: /contact]

## About (`/about`)

Two columns on desktop: the framed portrait `kaden-about.jpg` (about 360px wide, alt: Kaden Thompson) and the text. Stacked on mobile with the photo first at a modest size (max 280px wide).

- h1: About
- Paragraphs:
  - I'm Kaden Thompson. I'm a software engineer by trade, and Kdentee is the company I run on my own.
  - Building things is also what I do for fun. I run my own servers at home, wrote a web browser for my Mac, and publish open source dashboard cards for Home Assistant.
  - I fuss over details most people never notice: how a meeting agenda reads on an old phone, whether a screen reader can get through a form, how a page loads on slow rural internet.
  - When you hire Kdentee you work with me directly. I answer the email, write the code and fix what breaks.
  - I used to live in Midland and now live in Waterford, Michigan.

**How a project goes** (h2). This is a real sequence, so it is an ordered list (`<ol>`), styled as ledger rows whose left column is the step title. Do not show big decorative numerals; a plain "1." in the title is fine.

1. We talk: You tell me about your organization, your current site and what bothers you about it.
2. A written proposal: You get a fixed price and a clear list of what is included.
3. The build: You watch the site come together on a private preview link and tell me what to change.
4. Launch: I move your content over, train your staff and switch the domain.
5. After launch: I host the site, keep it updated and fix what breaks.

**Closing** (h2: Get in touch)

- Text: Tell me a little about your organization and what you need. I reply by the next business day.
- Primary button: Send a message [link: /contact]

## Contact (`/contact`)

- h1: Get in touch
- Lede: Tell me a little about your organization and what you need. I reply by the next business day.

Two columns on desktop (form left, about 60%; details right), stacked on mobile.

Form (client component; keep the existing Web3Forms request, access key, subject line, `from_name`, and the `trackFormSuccess` / `trackFormError` calls from the current `app/contact/page.tsx`; keep `react-hook-form`):

- Labels above fields, always visible (no placeholder-as-label): Name / Email / Message
- Fields: white `surface` background, 1px `rule` border (darker on hover, pink ring on focus), 8px radius, at least 44px tall, 16px text so iOS does not zoom. Message is a textarea, 6 rows, vertical resize only.
- `autocomplete` name / email; `type="email"`; `inputmode` where relevant.
- Validation messages, shown under the field on blur or submit, tied with `aria-describedby`, with `aria-invalid` set:
  - Name empty: Enter your name.
  - Email empty: Enter your email address.
  - Email malformed: That email address doesn't look right.
  - Message empty: Write a short message.
- Submit button: Send message. While sending: Sending… and disabled. No spinner needed.
- Success (replaces the form, `role="status"`, focus moves to it): heading "Message sent." and text "Thanks. I'll reply by the next business day."
- Failure (above the button, `role="alert"`): Your message didn't send. Email me at kadenthompson@kdenteellc.com instead. (the address is a mailto link; the typed message is kept)
- Add a hidden honeypot checkbox named `botcheck` as Web3Forms recommends.

Details column, as ledger rows or a simple definition list:

- Email: kadenthompson@kdenteellc.com [mailto link]
- Based in: Waterford, Michigan
- Reply time: By the next business day

## Not found

- h1: This page doesn't exist.
- Text: The address may be old or mistyped.
- Text link: Go to the home page [link: /]

---

# Rules for the copy and anything a builder must write (alt text, aria labels, errors)

- Plain, specific, first person singular ("I", never "we").
- Never: elevate, seamless, unlock, empower, cutting-edge, robust, bespoke, solutions, passionate,
  "take it to the next level", "not just X, it's Y", "no X, no Y, just Z", stacked two-word
  fragment sentences, rhetorical question followed by its own answer.
- No em dashes in headings, buttons or labels.
- Never mention internal business tools, photography services, a resume, prices other than those above,
  or any client other than Lincoln Township and Hope Township.
- Do not say Kaden is based in Midland. He lives in Waterford.
