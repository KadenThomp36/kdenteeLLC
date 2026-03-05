'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { trackEvent } from '@/lib/analytics'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About', path: '/about' },
  ]

  const handleNavClick = (label: string) => {
    trackEvent('navigation_click', 'Navigation', label)
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-spring ${
        isScrolled
          ? 'bg-[#06060a]/80 backdrop-blur-2xl border-b border-white/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" onClick={() => handleNavClick('Home')} className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Image
                src="/svg/HeaderLogo-dark.svg"
                alt="Kdentee LLC"
                width={150}
                height={40}
                className="h-9 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => handleNavClick(item.label)}
                className="relative px-5 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300"
              >
                {pathname === item.path && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/[0.06] rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    pathname === item.path
                      ? 'text-primary-400'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => handleNavClick('Contact')}
              className="ml-4 relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full opacity-60 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
              <div className="relative px-6 py-2.5 bg-[#0a0a0f] rounded-full text-sm font-semibold text-white tracking-wide uppercase border border-white/10 group-hover:border-primary-500/30 transition-colors">
                Contact
              </div>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span
                animate={
                  isMenuOpen
                    ? { rotate: 45, y: 7, width: '100%' }
                    : { rotate: 0, y: 0, width: '100%' }
                }
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-[1.5px] bg-white block origin-left"
              />
              <motion.span
                animate={
                  isMenuOpen
                    ? { opacity: 0, x: -10 }
                    : { opacity: 1, x: 0 }
                }
                transition={{ duration: 0.2 }}
                className="h-[1.5px] bg-white block w-3/4"
              />
              <motion.span
                animate={
                  isMenuOpen
                    ? { rotate: -45, y: -7, width: '100%' }
                    : { rotate: 0, y: 0, width: '60%' }
                }
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="h-[1.5px] bg-white block origin-left"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden bg-[#06060a]/95 backdrop-blur-2xl border-t border-white/[0.04]"
          >
            <nav className="px-6 py-8 space-y-1">
              {[...navItems, { label: 'Contact', path: '/contact' }].map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    href={item.path}
                    onClick={() => handleNavClick(item.label)}
                    className={`block text-2xl font-light py-3 transition-colors duration-300 ${
                      pathname === item.path
                        ? 'text-primary-400'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
