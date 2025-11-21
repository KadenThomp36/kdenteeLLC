import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const mPlusRounded = localFont({
  src: [
    {
      path: "../public/fonts/mplus-rounded-1c-300.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/mplus-rounded-1c-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/mplus-rounded-1c-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/mplus-rounded-1c-700.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/mplus-rounded-1c-800.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/mplus-rounded-1c-900.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-rounded",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Kdentee LLC - Web Design & Development",
  description:
    "Professional web design and development services for small and emerging businesses. Specializing in UI design, photography, hosting, and SEO.",
  keywords: [
    "web design",
    "web development",
    "UI design",
    "photography",
    "SEO",
    "hosting",
  ],
  authors: [{ name: "Kdentee LLC" }],
  openGraph: {
    title: "Kdentee LLC - Web Design & Development",
    description:
      "Professional web design and development services for small and emerging businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${mPlusRounded.variable} ${mPlusRounded.className} bg-gray-950 text-white antialiased font-sans`}
      >
        <GoogleAnalytics />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
