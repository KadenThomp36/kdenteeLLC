// Township plan prices and inclusion lists (Services page). Copy from docs/redesign-brief.md.

export type PopulationTier = "under2000" | "from2000to5000";

/** Table column headings, in display order. */
export const populationTiers: { id: PopulationTier; label: string }[] = [
  { id: "under2000", label: "Under 2,000 residents" },
  { id: "from2000to5000", label: "2,000 to 5,000 residents" },
];

export type PriceRow = {
  /** Row heading, e.g. "New site build". */
  label: string;
  /** Whole US dollars per tier. */
  prices: Record<PopulationTier, number>;
};

export const priceRows: PriceRow[] = [
  { label: "New site build", prices: { under2000: 3500, from2000to5000: 5500 } },
  { label: "Essentials, per year", prices: { under2000: 780, from2000to5000: 1500 } },
  { label: "Managed, per year", prices: { under2000: 1200, from2000to5000: 2400 } },
  { label: "Deposit at signing", prices: { under2000: 500, from2000to5000: 1500 } },
];

/** "$3,500". Render inside an element with `tabular-nums`. */
export function formatPrice(dollars: number): string {
  return `$${dollars.toLocaleString("en-US")}`;
}

export const priceTableNote =
  "Population by the 2020 Census. Townships over 5,000 are quoted individually.";

/** h3 "Both plans include" */
export const bothPlansInclude: string[] = [
  "Hosting, the .gov domain, security, backups and uptime monitoring",
  "Posted files turned into accessible web pages automatically",
  "Free fixes to anything I built that fails WCAG 2.1 AA",
  "Paper records made accessible, up to 500\u00A0pages a year",
  "A documented runbook, kept current",
];

/** h3 "The build includes" */
export const buildIncludes: string[] = [
  "Design on the township template",
  "Up to roughly 50\u00A0pages moved over and rewritten",
  "Your complete meeting archive, with every agenda and set of minutes turned into an accessible web page",
  "Staff accounts with roles and an activity log",
  "An email-to-post inbox",
  "Site search",
  "A contact form with spam filtering",
  "Facility rental booking with approval and a calendar",
  ".gov setup or migration",
  "Accessibility testing before launch",
  "Staff training",
];

/** h3 "Essentials or Managed" */
export const planDifference =
  "The two yearly plans differ in who does the posting. On Essentials, your staff post through the admin or by email, and I answer support requests by the next business day. On Managed, I do all the posting and keep your meeting calendar, so every agenda and set of minutes goes up on time. Meeting postings are handled the same business day, and the board gets a yearly traffic and accessibility report.";

/** h3 "Terms" (the only place the payment-setup and hourly prices live) */
export const terms =
  "A deposit is due at signing and the balance at launch. Yearly plans are billed in advance, and the first year starts the day the site goes live. Online payment setup is $500 to $750, with processing fees staying with the township. Other work outside the plan is $125 an hour, estimated first.";
