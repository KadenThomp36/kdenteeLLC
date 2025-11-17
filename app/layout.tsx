import type { Metadata } from 'next'
import { M_PLUS_Rounded_1c } from 'next/font/google'
import './globals.css'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ['300', '400', '500', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kdentee LLC - Web Design & Development',
  description: 'Professional web design and development services for small and emerging businesses. Specializing in UI design, photography, hosting, and SEO.',
  keywords: ['web design', 'web development', 'UI design', 'photography', 'SEO', 'hosting'],
  authors: [{ name: 'Kdentee LLC' }],
  openGraph: {
    title: 'Kdentee LLC - Web Design & Development',
    description: 'Professional web design and development services for small and emerging businesses.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${mPlusRounded.className} bg-gray-950 text-white antialiased`}>
        <GoogleAnalytics />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
