'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const phrases = [
  'Web Design',
  'Development',
  'Photography',
  'SEO Services',
]

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const phrase = phrases[currentPhrase]

    // Don't do anything if paused
    if (isPaused) return

    const timeout = setTimeout(
      () => {
        if (!isDeleting && displayText.length < phrase.length) {
          // Typing forward
          setDisplayText(phrase.slice(0, displayText.length + 1))
        } else if (!isDeleting && displayText.length === phrase.length) {
          // Finished typing, pause before deleting
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setIsDeleting(true)
          }, 2000)
        } else if (isDeleting && displayText.length > 0) {
          // Deleting backward
          setDisplayText(phrase.slice(0, displayText.length - 1))
        } else if (isDeleting && displayText.length === 0) {
          // Finished deleting, move to next phrase
          setIsDeleting(false)
          setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        }
      },
      isDeleting ? 50 : 100
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentPhrase, isPaused])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 aurora-bg opacity-50" />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/png/hero_image.png"
          alt="Hero background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="gradient-text">Kdentee LLC</span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-8 h-16 flex items-center justify-center"
          >
            <span className="text-gray-300">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Empowering small and emerging businesses with professional web solutions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-pink-600 rounded-full hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
