import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import TextLink from "@/components/ui/TextLink";
import LedgerRows, { LedgerRow } from "@/components/ui/LedgerRows";
import BrowserShot from "@/components/ui/BrowserShot";
import ConstructionShot from "@/components/ui/ConstructionShot";
import Quote from "@/components/ui/Quote";
import { mailto, site, testimonial } from "@/lib/site";
import heroPortrait from "@/public/img/kaden-hero.jpg";
import koanBanner from "@/public/img/koan-banner.png";

const workShotSizes = "(min-width: 1200px) 540px, (min-width: 768px) 45vw, 100vw";

// Staggered delay for the hero entrance (see .hero-enter in globals.css).
const delay = (ms: number) => ({ "--hero-delay": `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="recent-work" heading="Recent work">
        <div className="grid gap-y-14 md:grid-cols-2 md:gap-x-10 lg:gap-x-14">
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
          <WorkItem
            shot={<ConstructionShot sizes={workShotSizes} />}
            title="Hope Township"
            href="/work#hope"
            line="Midland County, in progress"
          >
            Hope’s new site is being built now, with online booking for the township hall and park
            pavilions.
          </WorkItem>
        </div>
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
        <LedgerRows className="mt-8 md:mt-10">
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

function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <Container>
        <div className="grid md:grid-cols-[minmax(0,41fr)_minmax(0,59fr)] md:gap-x-8 lg:gap-x-12 xl:gap-x-16">
          <div className="pb-10 pt-6 md:order-2 md:self-center md:py-8">
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
            <p className="hero-enter mt-8 text-small text-graphite md:mt-10" style={delay(270)}>
              <span className="font-semibold text-ink">{site.owner}</span>, {site.ownerRole}
            </p>
          </div>
          {/* The dissolve is baked into the image (docs/portrait-vignette.py), so it is always shown
              whole: never crop it or add a CSS mask. */}
          <figure className="md:order-1 md:self-center">
            <Image
              src={heroPortrait}
              alt="Kaden Thompson"
              priority
              // Served as-is: re-encoding shifts the #F4F4F4 backdrop by a level and a seam shows.
              unoptimized
              sizes="(min-width: 1200px) 460px, (min-width: 768px) 40vw, 82vw"
              className="hero-enter-portrait block h-auto w-[82%] max-w-[23rem] md:w-full md:max-w-none"
            />
          </figure>
        </div>
      </Container>
    </section>
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
