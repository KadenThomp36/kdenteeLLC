import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { site, socialImage } from "@/lib/site";
import { SYSTEM_MEDIA, themeColors, themeInitScript } from "@/lib/theme";

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-onest",
});

// Wordmark only: a Latin subset (10 KB) of M PLUS Rounded 1c 800.
const wordmark = localFont({
  src: "../public/fonts/mplus-rounded-1c-800-latin.woff2",
  weight: "800",
  display: "swap",
  variable: "--font-wordmark",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    template: `%s | ${site.name}`,
    default: site.defaultTitle,
  },
  description: site.description,
  openGraph: {
    title: site.defaultTitle,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [socialImage],
  },
  twitter: { card: "summary_large_image", images: [socialImage] },
};

// Browser UI colour follows the page's paper. These two cover "auto"; an explicit choice from the
// footer toggle retargets their media (lib/theme.ts).
export const viewport: Viewport = {
  themeColor: [
    { media: SYSTEM_MEDIA.light, color: themeColors.light },
    { media: SYSTEM_MEDIA.dark, color: themeColors.dark },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: themeInitScript sets data-theme on <html> before React hydrates.
    <html lang="en" className={`${onest.variable} ${wordmark.variable}`} suppressHydrationWarning>
      <head>
        {/* Before first paint: apply a stored theme choice so it never flashes the wrong one. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Without JavaScript the site follows the system and the toggle could do nothing. */}
        <noscript>
          <style>{".theme-toggle{display:none}"}</style>
        </noscript>
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <GoogleAnalytics />
        <Header />
        <main id="content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
