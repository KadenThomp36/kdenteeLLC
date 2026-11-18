import PageIntro from "@/components/ui/PageIntro";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import LedgerRows, { LedgerRow } from "@/components/ui/LedgerRows";
import { pageMetadata } from "@/lib/site";
import {
  bothPlansInclude,
  buildIncludes,
  formatPrice,
  planDifference,
  populationTiers,
  priceRows,
  priceTableNote,
  terms,
} from "@/lib/plans";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "What a Kdentee website includes, from design and content to hosting and training, and the fixed yearly prices for townships under 5,000 residents.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="Services"
        lede="I take a website from the first conversation to launch, then host it and look after it. This page covers what that includes and what it costs."
      />

      <Section id="included" heading="What’s included">
        <LedgerRows>
          <LedgerRow label="Design and build">
            <p>
              Each site is designed around what your visitors come to do, then built in modern code
              that loads fast on a phone.
            </p>
          </LedgerRow>
          <LedgerRow label="Moving your content">
            <p>
              I bring over your existing pages, documents and photos, and rewrite the ones that need
              it.
            </p>
          </LedgerRow>
          <LedgerRow label="An admin for your staff">
            <p>
              Each person gets their own account and sees only the sections they look after. Every
              change is logged.
            </p>
          </LedgerRow>
          <LedgerRow label="Accessibility">
            <p>
              Sites are tested against WCAG 2.1 AA before launch, with automated tools and by hand.
              If something I built falls short later, I fix it at no charge.
            </p>
          </LedgerRow>
          <LedgerRow label="Hosting and upkeep">
            <p>
              Hosting, your domain, security updates, backups and uptime monitoring are handled for
              you.
            </p>
          </LedgerRow>
          <LedgerRow label="Training">
            <p>I show your staff how to use the admin before launch.</p>
          </LedgerRow>
          <LedgerRow label="Yours to keep">
            <p>
              Your domain, content and hosting account are registered to you, and you get a written
              runbook for how the site works, so any developer could pick it up later.
            </p>
          </LedgerRow>
        </LedgerRows>
      </Section>

      <Section
        id="plans"
        heading="Plans for townships"
        intro="My township pricing is fixed and public. Price depends on population, because smaller townships have fewer meetings and less to post."
      >
        <PriceTable />

        <LedgerRows className="mt-12 md:mt-16">
          <LedgerRow label="Essentials or Managed">
            <p>{planDifference}</p>
          </LedgerRow>
          <LedgerRow label="Both plans include">
            <RuledList items={bothPlansInclude} />
          </LedgerRow>
          <LedgerRow label="The build includes">
            <RuledList items={buildIncludes} />
          </LedgerRow>
          <LedgerRow label="Terms">
            <p>{terms}</p>
          </LedgerRow>
        </LedgerRows>
      </Section>

      <Section
        id="everyone-else"
        heading="Everyone else"
        intro="For community groups, nonprofits and small businesses, I quote each project after we’ve talked about what you need. Hosting and upkeep work the same way as above."
      >
        <Button href="/contact">Ask for a quote</Button>
      </Section>
    </>
  );
}

// A quiet price list: row labels left, prices right-aligned in tabular figures, hairline rules
// between rows. On desktop the label column matches the ledger rows' label column (15rem + gap).
function PriceTable() {
  return (
    <div className="md:max-w-[47.5rem]">
      <table className="w-full border-collapse text-left md:table-fixed">
        <caption className="sr-only">
          Township plan prices in US dollars, by population
        </caption>
        <colgroup>
          <col className="md:w-[17.5rem]" />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <td className="pb-3" />
            {populationTiers.map((tier) => (
              <th
                key={tier.id}
                scope="col"
                className="pb-3 pl-4 text-right align-bottom text-small font-medium text-graphite md:pl-6"
              >
                {keepRangeTogether(tier.label)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border-b border-rule">
          {priceRows.map((row) => (
            <tr key={row.label} className="border-t border-rule">
              <th scope="row" className="py-4 pr-2 align-baseline text-h3 text-ink md:py-5">
                {row.label}
              </th>
              {populationTiers.map((tier) => (
                <td
                  key={tier.id}
                  className="whitespace-nowrap py-4 pl-4 text-right align-baseline tabular-nums text-ink md:py-5 md:pl-6"
                >
                  {formatPrice(row.prices[tier.id])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-small text-graphite">{priceTableNote}</p>
    </div>
  );
}

// "2,000 to 5,000 residents" → only "residents" may wrap, so narrow headers break in two lines.
function keepRangeTogether(label: string) {
  return label.replace(/ (?!residents)/g, "\u00A0");
}

// A plain list inside a ledger row, with the same hairline rule between items.
function RuledList({ items }: { items: string[] }) {
  return (
    <ul className="divide-y divide-rule">
      {items.map((item) => (
        <li key={item} className="py-2.5 first:pt-0 last:pb-0">
          {item}
        </li>
      ))}
    </ul>
  );
}
