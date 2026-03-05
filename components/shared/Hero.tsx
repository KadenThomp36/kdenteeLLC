'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const phrases = [
  'Web Design',
  'Development',
  'Photography',
  'SEO Services',
]

function FloatingOrb({ delay, size, x, y, color }: { delay: number; size: number; x: string; y: string; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, left: x, top: y, background: color, filter: `blur(${size * 0.6}px)` }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 5, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])

  useEffect(() => {
    const phrase = phrases[currentPhrase]
    if (isPaused) return

    const timeout = setTimeout(
      () => {
        if (!isDeleting && displayText.length < phrase.length) {
          setDisplayText(phrase.slice(0, displayText.length + 1))
        } else if (!isDeleting && displayText.length === phrase.length) {
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setIsDeleting(true)
          }, 2000)
        } else if (isDeleting && displayText.length > 0) {
          setDisplayText(phrase.slice(0, displayText.length - 1))
        } else if (isDeleting && displayText.length === 0) {
          setIsDeleting(false)
          setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        }
      },
      isDeleting ? 40 : 80
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentPhrase, isPaused])

  const titleChars = "Kdentee LLC".split('')

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Gradient mesh background */}
      <div className="gradient-mesh" />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingOrb delay={0} size={400} x="10%" y="20%" color="rgba(233, 30, 99, 0.08)" />
        <FloatingOrb delay={5} size={300} x="70%" y="10%" color="rgba(139, 92, 246, 0.08)" />
        <FloatingOrb delay={10} size={250} x="50%" y="60%" color="rgba(236, 72, 153, 0.06)" />
        <FloatingOrb delay={3} size={200} x="80%" y="70%" color="rgba(99, 102, 241, 0.06)" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/[0.06] bg-[#0c0c12]"
        >
          <div className="glow-dot" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            Web Design & Development Studio
          </span>
        </motion.div>

        {/* Title with staggered character animation */}
        <h1 className="mb-6">
          <span className="sr-only">Kdentee LLC</span>
          <motion.span
            aria-hidden
            className="flex items-center justify-center flex-wrap gap-x-0"
          >
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + i * 0.05,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="inline-block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight gradient-text will-change-transform"
                style={{ lineHeight: 1.1, transform: 'translateZ(0)' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.span>
        </h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-8 h-16 flex items-center justify-center"
        >
          <span className="text-zinc-300">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-[3px] h-[1em] bg-primary-400 ml-1 align-middle"
            />
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-base sm:text-lg md:text-xl text-zinc-500 mb-14 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Empowering small and emerging businesses with
          <span className="text-zinc-300"> professional web solutions </span>
          that drive real results
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/contact" className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-pink-500 to-violet-500 rounded-full opacity-70 group-hover:opacity-100 blur-md transition-all duration-500 group-hover:blur-lg" />
            <div className="relative px-8 py-4 bg-[#0a0a0f] rounded-full text-base font-semibold text-white border border-white/10 group-hover:border-primary-500/30 transition-all duration-500 flex items-center gap-3">
              Start a Project
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>

          <Link
            href="/portfolio"
            className="px-8 py-4 text-base font-medium text-zinc-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
          >
            View Our Work
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-zinc-600 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: [-32, 32] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-3 bg-primary-400"
          />
        </div>
      </motion.div>
    </section>
  )
}
