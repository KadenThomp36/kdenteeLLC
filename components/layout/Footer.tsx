'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    company: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'About', href: '/about' },
    ],
    connect: [
      { label: 'Contact', href: '/contact' },
      { label: 'GitHub', href: 'https://github.com/kdentee', external: true },
      { label: 'Unsplash', href: 'https://unsplash.com/@kadenthomp36', external: true },
    ],
  }

  return (
    <footer className="relative border-t border-white/[0.04]">
      {/* Gradient line at top */}
      <div className="split-line" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Image
              src="/svg/HeaderLogo-dark.svg"
              alt="Kdentee LLC"
              width={120}
              height={32}
              className="h-8 w-auto mb-5 opacity-80"
            />
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              Empowering small and emerging businesses with professional web
              design, development, and digital strategy.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="glow-dot" />
              <span className="text-xs text-zinc-500 uppercase tracking-widest">
                Available for projects
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              {links.connect.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 inline-flex items-center gap-1.5"
                    >
                      {link.label}
                      <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            {currentYear} Kdentee LLC. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Designed & built with precision
          </p>
        </div>
      </div>
    </footer>
  )
}
