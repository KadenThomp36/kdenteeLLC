import PageIntro from "@/components/ui/PageIntro";
import Section from "@/components/ui/Section";
import TextLink from "@/components/ui/TextLink";
import LedgerRows, { LedgerRow } from "@/components/ui/LedgerRows";
import { mailto, pageMetadata, site } from "@/lib/site";
import ContactForm from "./ContactForm";

export const metadata = pageMetadata({
  title: "Get in touch",
  description:
    "Send Kaden Thompson of Kdentee LLC a message about your organization’s website, or email kadenthompson@kdenteellc.com. He replies by the next business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        title="Get in touch"
        lede="Tell me a little about your organization and what you need. I reply by the next business day."
      />
      <Section id="message">
        <div className="grid gap-y-14 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-x-16 xl:gap-x-24">
          <ContactForm />
          <Details />
        </div>
      </Section>
    </>
  );
}

// Contact details: stacked ledger rows. The first row has no top rule so "Email" lines up
// with the form’s first label (0.1em = the half-leading difference between body 1.6 and h3 1.4).
function Details() {
  return (
    <LedgerRows as="dl" stacked className="lg:self-start [&>:first-child]:border-t-0 [&>:first-child]:pt-[0.1em]">
      <LedgerRow label="Email">
        <TextLink href={mailto} standalone className="text-ink">
          {site.email}
        </TextLink>
      </LedgerRow>
      <LedgerRow label="Based in">{site.location}</LedgerRow>
      <LedgerRow label="Reply time">By the next business day</LedgerRow>
    </LedgerRows>
  );
}
