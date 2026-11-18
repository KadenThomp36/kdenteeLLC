import type { CSSProperties, ReactNode } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import TextLink from "@/components/ui/TextLink";
import LedgerRows, { LedgerRow } from "@/components/ui/LedgerRows";
import BrowserShot from "@/components/ui/BrowserShot";
import ConstructionShot from "@/components/ui/ConstructionShot";
import Quote from "@/components/ui/Quote";
import ScrollRegion from "@/components/ui/ScrollRegion";
import { mailto, site, testimonial } from "@/lib/site";
import heroPortrait from "@/public/img/kaden-hero.jpg";
import heroPortraitMobile from "@/public/img/kaden-hero-mobile.jpg";
import koanBanner from "@/public/img/koan-banner.png";

const workShotSizes = "(min-width: 1200px) 540px, (min-width: 768px) 45vw, 80vw";

// Staggered delay for the hero entrance (see .hero-enter in globals.css).
const delay = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="recent-work" heading="Recent work">
        {/* Below md a swipe row (CSS scroll snap, see .workrow in globals.css): one item in view,
            the next peeking in from the screen edge. From md the two-column grid. ScrollRegion
            makes the row keyboard-scrollable only while it actually scrolls. */}
        <ScrollRegion label="Projects" className="workrow">
          {/* role="list": Safari drops list semantics from unstyled lists */}
          <ul role="list" className="workrow-list">
            <li className="workrow-item">
              <WorkItem
                shot={
                  <Link href="/work#lincoln" className="block rounded-image">
                    <BrowserShot
                      src="/img/work/lincoln-home.jpg"
                      alt="The home page of Lincoln Township’s website"
                      sizes={workShotSizes}
                    />
                  </Link>
                }
                title="Lincoln Township"
                href="/work#lincoln"
                line="Midland County, live since 2025"
              >
                I’ve looked after Lincoln’s website since 2022. In 2025 they chose me in a competitive bid
                to rebuild it, and in 2026 it moved to the township’s own .gov address. Daily visits
                roughly doubled in the first year.
              </WorkItem>
            </li>
            <li className="workrow-item">
              <WorkItem
                shot={<ConstructionShot sizes={workShotSizes} />}
                title="Hope Township"
                href="/work#hope"
                line="Midland County, in progress"
              >
                Hope’s new site is being built now, with online booking for the township hall and park
                pavilions.
              </WorkItem>
            </li>
          </ul>
        </ScrollRegion>
        <Quote {...testimonial} className="mt-16 md:mt-20" />
      </Section>

      <Section id="what-i-do" heading="What I do">
        <LedgerRows>
          <LedgerRow label="Design and build">
            <p>
              Sites designed around what your visitors come to do, built in modern code that loads
              fast on a phone.
            </p>
          </LedgerRow>
          <LedgerRow label="Editing without me">
            <p>
              Pages, events, notices and photos are changed in a simple admin, so updating your hours
              never needs a phone call.
            </p>
          </LedgerRow>
          <LedgerRow label="Hosting and upkeep">
            <p>
              I host what I build and handle anything technical: domains, security, backups,
              monitoring and fixes.
            </p>
          </LedgerRow>
          <LedgerRow label="Yours to keep">
            <p>
              Your domain, content and hosting account are registered to you, and you get a written
              runbook for how the site works, so any developer could pick it up later.
            </p>
          </LedgerRow>
        </LedgerRows>
        <p className="mt-8">
          <TextLink href="/services" standalone>See services and prices</TextLink>
        </p>
      </Section>

      <Section
        id="own-projects"
        heading="Things I build for myself"
        intro="Most evenings I’m working on something of my own. A few of them:"
      >
        <div className="overflow-hidden rounded-image border border-rule">
          <Image
            src={koanBanner}
            alt="Koan, a quiet browser for the Mac"
            sizes="(min-width: 1200px) 1120px, 100vw"
            className="block h-auto w-full"
          />
        </div>
        <LedgerRows compact className="mt-8 md:mt-10">
          <LedgerRow label="Koan">
            <p>A native web browser for the Mac, with vertical tabs and workspaces.</p>
          </LedgerRow>
          <LedgerRow label="Marquee">
            <p>The TV and movie tracker my household uses, running on my own server.</p>
          </LedgerRow>
          <LedgerRow label="Crate">
            <p>An inventory system for physical things, down to which box is on which shelf.</p>
          </LedgerRow>
        </LedgerRows>
        <p className="mt-8">
          <TextLink href="/work#own" standalone>More on the work page</TextLink>
        </p>
      </Section>

      <Section
        id="get-in-touch"
        heading="Get in touch"
        intro="Tell me a little about your organization and what you need. I reply by the next business day."
      >
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Button href="/contact">Send a message</Button>
          <TextLink href={mailto} standalone>
            {site.email}
          </TextLink>
        </div>
      </Section>
    </>
  );
}

// Mobile hero geometry (below md). The portrait is W = min(57%, 15rem) of the content width. The
// h1 pulls up over its foot by 0.123 W (percentage margins resolve against the content width, so
// -7% = 0.123 x 57%; -1.84rem = 0.123 x 15rem), less 4px for the space above the glyphs. That is
// as far as the mobile file's dissolve stays pale enough for ink to keep >= 9:1 (7:1 required):
// re-measure if either number or the image changes. The byline's foot sits 0.18 W above the
// image's foot (10.26% = 0.18 x 57%).
function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <Container>
        <div className="grid md:grid-cols-[minmax(0,41fr)_minmax(0,59fr)] md:gap-x-8 lg:gap-x-12 xl:gap-x-16">
          {/* Positioned so it paints over the portrait where the h1 overlaps it on mobile. */}
          <div className="relative z-[1] mt-[calc(max(-7%,-1.84rem)+4px)] pb-10 md:order-2 md:mt-0 md:self-center md:py-8">
            <h1 id="hero-heading" className="hero-enter max-w-[15em] text-h1-hero" style={delay(60)}>
              Kdentee is a <span className="whitespace-nowrap">one-person</span> web studio in Waterford, Michigan.
            </h1>
            <p
              className="hero-enter mt-5 max-w-[34em] text-lede text-graphite md:mt-6"
              style={delay(130)}
            >
              I design and build websites for local governments, community groups and small
              businesses, then host them and keep them running.
            </p>
            <div
              className="hero-enter mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 md:mt-8"
              style={delay(200)}
            >
              <Button href="/contact">Get in touch</Button>
              <TextLink href="/work" standalone>
                See recent work
              </TextLink>
            </div>
            {/* From md up the signature sits under the actions; on mobile the byline beside the
                portrait replaces it (display:none, so it is never read twice). */}
            <p className="hero-enter mt-10 hidden text-small text-graphite md:block" style={delay(270)}>
              <span className="font-semibold text-ink">{site.owner}</span>, {site.ownerRole}
            </p>
          </div>
          <div className="order-first flex items-end pt-2 md:order-1 md:block md:self-center md:pt-0">
            {/* The dissolve is baked into the image (docs/portrait-vignette.py), so it is always
                shown whole: never crop it or add a CSS mask. The bleed past the gutter puts his
                hair, not the empty paper beside it, on the page edge. */}
            <figure className="-ml-3 w-[min(57%,15rem)] shrink-0 md:ml-0 md:w-auto">
              <HeroPortrait />
            </figure>
            <p
              className="hero-enter mb-[min(10.26%,2.7rem)] ml-[max(-3%,-0.8rem)] min-w-0 text-small text-graphite md:hidden"
              style={delay(270)}
            >
              <span className="block font-semibold text-ink">{site.owner}</span>
              {sentenceCase(site.ownerRole)}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

const sentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Art-directed portrait: a shorter bust below 768px (kaden-hero-mobile.jpg), the full one from
// 768px up. A <picture> means the browser downloads only the file that matches. Both are served
// as-is (unoptimized): re-encoding shifts the #F4F4F4 backdrop by a level and a seam shows.
// getImageProps does not emit a preload, so nothing fetches the unused file.
function HeroPortrait() {
  const common = { alt: "Kaden Thompson", unoptimized: true, priority: true } as const;
  const { props: desktop } = getImageProps({ ...common, src: heroPortrait });
  const { props: mobile } = getImageProps({ ...common, src: heroPortraitMobile });
  return (
    <picture className="block">
      <source media="(min-width: 768px)" srcSet={desktop.src} width={desktop.width} height={desktop.height} />
      {/* eslint-disable-next-line @next/next/no-img-element -- props come from getImageProps */}
      <img {...mobile} alt={common.alt} className="hero-enter-portrait block h-auto w-full" />
    </picture>
  );
}

function WorkItem({
  shot,
  title,
  href,
  line,
  children,
}: {
  shot: ReactNode;
  title: string;
  href: string;
  line: string;
  children: ReactNode;
}) {
  return (
    <article>
      {shot}
      <h3 className="mt-5 text-h3 md:mt-6">
        <Link
          href={href}
          className="tap-target decoration-pink decoration-[1.5px] underline-offset-4 hover:underline"
        >
          {title}
        </Link>
      </h3>
      <p className="mt-0.5 text-small text-graphite">{line}</p>
      <p className="mt-3 max-w-prose text-graphite">{children}</p>
    </article>
  );
}
