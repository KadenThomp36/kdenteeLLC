import type { Metadata } from "next";

// Site-wide facts. Import from here instead of hard-coding them in pages.
export const site = {
  name: "Kdentee LLC",
  shortName: "Kdentee",
  owner: "Kaden Thompson",
  ownerRole: "software engineer and owner",
  email: "kadenthompson@kdenteellc.com",
  location: "Waterford, Michigan",
  url: "https://kdenteellc.com",
  defaultTitle: "Kdentee LLC | Websites designed, built and hosted in Michigan",
  description:
    "Kdentee is a one-person web studio in Waterford, Michigan. Kaden Thompson designs, builds and hosts websites for local governments, community groups and small businesses.",
} as const;

export const mailto = `mailto:${site.email}`;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const externalUrls = {
  github: "https://github.com/KadenThomp36",
  lincolnSite: "https://www.lincolntwp-midland.gov",
  // Koan's source is private; this public repository holds its downloads and update feed.
  koan: "https://github.com/KadenThomp36/koan-updates",
  marquee: "https://github.com/KadenThomp36/marquee",
  crate: "https://github.com/KadenThomp36/crate",
  chronicleCard: "https://github.com/KadenThomp36/chronicle-card",
  airQualityCard: "https://github.com/KadenThomp36/air-quality-card",
  garageCard: "https://github.com/KadenThomp36/garage-card",
  ankh: "https://github.com/KadenThomp36/ankh",
} as const;

// The Lincoln Township testimonial, shown on Home and Work: <Quote {...testimonial} />
export const testimonial = {
  quote:
    "They gave us all the features we requested in less time than expected. We are very pleased with the end product and have no reservations about our decision to hire them.",
  name: "Kimberly Oswald",
  role: "Treasurer, Lincoln Township",
} as const;

// The link-preview image (app/opengraph-image.png). Listed explicitly because a page that sets
// its own `openGraph` would otherwise drop the image inherited from the root layout.
export const socialImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Kaden Thompson beside the words: Kdentee, a one-person web studio in Waterford, Michigan.",
} as const;

/**
 * Per-page metadata with matching Open Graph fields.
 * Usage: export const metadata = pageMetadata({ title: "Work", description: "…", path: "/work" });
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [socialImage],
    },
    twitter: { card: "summary_large_image", images: [socialImage] },
  };
}
