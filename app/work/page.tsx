import Image from "next/image";
import PageIntro from "@/components/ui/PageIntro";
import Section from "@/components/ui/Section";
import Prose from "@/components/ui/Prose";
import Button from "@/components/ui/Button";
import TextLink from "@/components/ui/TextLink";
import LedgerRows, { LedgerRow } from "@/components/ui/LedgerRows";
import BrowserShot from "@/components/ui/BrowserShot";
import ConstructionShot from "@/components/ui/ConstructionShot";
import Quote from "@/components/ui/Quote";
import { externalUrls, pageMetadata, testimonial } from "@/lib/site";
import koanBanner from "@/public/img/koan-banner.png";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Lincoln Township’s website, which Kaden Thompson rebuilt in 2025 and still hosts, Hope Township’s new site, and the side projects he builds for himself.",
  path: "/work",
});

// From lg up, the case-study text and secondary shots sit in the ledger rows' right-hand
// column (15rem label + 2.5rem gap), so paragraphs, facts and the quote share one edge.
const textColumn = "lg:ml-[17.5rem]";
// Secondary shots: two thirds of the container from md, the ledger's text column from lg.
const secondaryShot = `md:w-2/3 lg:w-auto ${textColumn}`;
const secondaryShotSizes = "(min-width: 1200px) 840px, (min-width: 1024px) 70vw, (min-width: 768px) 460px, 100vw";

export default function WorkPage() {
  return (
    <>
      <PageIntro
        title="Work"
        lede="Client sites I’ve built and look after, and a few things I’ve made for myself."
      />

      <Section id="lincoln" heading="Lincoln Township" meta="Midland County, Michigan">
        <BrowserShot
          src="/img/work/lincoln-home.jpg"
          alt="The home page of Lincoln Township’s website"
          sizes="(min-width: 1200px) 1120px, 100vw"
        />

        <LedgerRows as="dl" compact labelWidth="5rem" className="mt-8 md:mt-10">
          <LedgerRow label="Client">
            <p>Lincoln Township, Midland County</p>
          </LedgerRow>
          <LedgerRow label="Since">
            <p>2022. Rebuilt in 2025.</p>
          </LedgerRow>
          <LedgerRow label="My part">
            <p>Design, build, the move to .gov, hosting and day-to-day updates</p>
          </LedgerRow>
          <LedgerRow label="Live at">
            <p>
              <TextLink external standalone href={externalUrls.lincolnSite}>www.lincolntwp-midland.gov</TextLink>
            </p>
          </LedgerRow>
        </LedgerRows>

        <Prose className={`mt-10 border-t border-rule pt-8 md:mt-12 md:pt-10 lg:border-t-0 lg:pt-0 ${textColumn}`}>
          <p>
            I started by maintaining Lincoln’s old website in 2022. In 2025 the township asked for
            bids on a rebuild and chose mine.
          </p>
          <p>
            The new site is organized around what residents come for: paying property taxes, trash
            and recycling days, meeting dates, renting the hall. A search box on the home page covers
            everything else.
          </p>
          <p>
            Every agenda and set of minutes is published as a web page with a short summary of what
            was decided, alongside the original PDF. That makes meeting records readable on a phone,
            findable in search, and usable with a screen reader.
          </p>
        </Prose>

        <figure className={`mt-10 md:mt-12 ${secondaryShot}`}>
          <BrowserShot
            src="/img/work/lincoln-meeting.jpg"
            alt="A Lincoln Township Planning Commission meeting page showing the minutes as a web page"
            sizes={secondaryShotSizes}
          />
          <figcaption className="mt-3 max-w-prose text-small text-graphite">
            A meeting page, with the minutes as text and the original PDF beside them.
          </figcaption>
        </figure>

        <Prose className={`mt-10 md:mt-12 ${textColumn}`}>
          <p>
            In 2026 the site moved to the township’s own .gov address. I host it and keep it current,
            and daily visits roughly doubled in the first year after the rebuild.
          </p>
        </Prose>

        <Quote {...testimonial} className="mt-14 md:mt-20" />
      </Section>

      <Section id="hope" heading="Hope Township" meta="Midland County, Michigan. In progress.">
        <ConstructionShot sizes={secondaryShotSizes} className={secondaryShot} />
        <Prose className={`mt-8 md:mt-10 ${textColumn}`}>
          <p>
            Hope Township hired me in 2026 to replace its website. The new one is being built now on
            the same foundation as Lincoln’s.
          </p>
          <p>
            It adds online booking for the township hall and park pavilions, and staff accounts that
            give each official access to only the sections they look after.
          </p>
        </Prose>
      </Section>

      <Section
        id="own"
        heading="Things I build for myself"
        intro="These are projects I built because I wanted them to exist."
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
          <LedgerRow label={<TextLink external standalone href={externalUrls.marquee}>Marquee</TextLink>}>
            <p>The TV and movie tracker my household uses, running on my own server.</p>
          </LedgerRow>
          <LedgerRow label={<TextLink external standalone href={externalUrls.crate}>Crate</TextLink>}>
            <p>An inventory system for physical things, down to which box is on which shelf.</p>
          </LedgerRow>
          <LedgerRow label="Home Assistant cards">
            <p>
              Open source dashboard cards for Home Assistant: a{" "}
              <TextLink external href={externalUrls.chronicleCard}>timeline</TextLink>, an{" "}
              <TextLink external href={externalUrls.airQualityCard}>air quality monitor</TextLink> and
              a <TextLink external href={externalUrls.garageCard}>garage view</TextLink>.
            </p>
          </LedgerRow>
          <LedgerRow label={<TextLink external standalone href={externalUrls.ankh}>Ankh</TextLink>}>
            <p>A flashcard app for the terminal, written in Rust.</p>
          </LedgerRow>
        </LedgerRows>
        <p className="mt-8">
          <TextLink external standalone href={externalUrls.github}>Everything else is on GitHub</TextLink>
        </p>
      </Section>

      <Section
        id="get-in-touch"
        heading="Have a project in mind?"
        intro="Tell me a little about your organization and what you need."
      >
        <Button href="/contact">Get in touch</Button>
      </Section>
    </>
  );
}
