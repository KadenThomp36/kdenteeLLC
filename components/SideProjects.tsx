import LedgerRows, { LedgerRow } from "@/components/ui/LedgerRows";
import TextLink from "@/components/ui/TextLink";
import { externalUrls } from "@/lib/site";

// Kaden's own projects, shown on Home and Work. One list, so the two pages cannot drift apart,
// and every project links somewhere public (Koan's source is private, so it links to its
// downloads repository).
export default function SideProjects({ className = "" }: { className?: string }) {
  return (
    <LedgerRows compact labelWidth="6.75rem" className={className}>
      <LedgerRow label={<ProjectLink href={externalUrls.koan}>Koan</ProjectLink>}>
        <p>A native web browser for the Mac, with vertical tabs and workspaces.</p>
      </LedgerRow>
      <LedgerRow label={<ProjectLink href={externalUrls.marquee}>Marquee</ProjectLink>}>
        <p>The TV and movie tracker my household uses, running on my own server.</p>
      </LedgerRow>
      <LedgerRow label={<ProjectLink href={externalUrls.crate}>Crate</ProjectLink>}>
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
      <LedgerRow label={<ProjectLink href={externalUrls.ankh}>Ankh</ProjectLink>}>
        <p>A flashcard app for the terminal, written in Rust.</p>
      </LedgerRow>
    </LedgerRows>
  );
}

function ProjectLink({ href, children }: { href: string; children: string }) {
  return (
    <TextLink external standalone href={href}>
      {children}
    </TextLink>
  );
}
