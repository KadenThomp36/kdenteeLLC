'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    title: 'Lincoln Township',
    category: 'Web Development',
    description:
      'A modern, accessible website for Lincoln Township featuring comprehensive information about local government services, community events, and resources. Built with responsive design to serve residents on any device.',
    image: '/jpg/lincoln-preview.jpg',
    link: 'https://www.lincoln-twp.org',
    linkText: 'Visit Site',
    tags: ['Next.js', 'Responsive', 'Government'],
  },
  {
    title: 'Photography Portfolio',
    category: 'Photography',
    description:
      'Professional photography showcasing diverse subjects from landscapes to portraits. Each image tells a story and captures moments with artistic vision and technical excellence.',
    image: '/jpg/Photography.jpeg',
    link: 'https://unsplash.com/@kadenthomp36',
    linkText: 'View on Unsplash',
    tags: ['Photography', 'Creative', 'Landscapes'],
  },
  {
    title: 'Open Source Projects',
    category: 'Development',
    description:
      'Contributing to the developer community through open source projects and code repositories. Check out our GitHub for more technical projects and contributions.',
    image: '/jpg/github.jpg',
    link: 'https://github.com/kdentee',
    linkText: 'Visit GitHub',
    tags: ['Open Source', 'GitHub', 'Code'],
  },
]

export default function Portfolio() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 relative overflow-hidden">
        <div className="gradient-mesh" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary-500/50" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary-400">
                Portfolio
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Our{' '}
              <span className="gradient-text">work</span>
            </h1>
            <p className="text-lg text-zinc-500 max-w-2xl font-light leading-relaxed">
              Explore our portfolio of successful projects and creative solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="space-y-24">
            {projects.map((project, index) => {
              const isReversed = index % 2 !== 0

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    isReversed ? 'lg:direction-rtl' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`${isReversed ? 'lg:order-2' : ''}`}>
                    <div className="relative group">
                      {/* Glow behind */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 to-violet-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      <div className="relative glass-card rounded-3xl overflow-hidden">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04]">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                          </div>
                          <div className="flex-1 mx-4">
                            <div className="bg-white/[0.04] rounded-md px-3 py-1 text-[10px] text-zinc-600 font-mono truncate">
                              {project.link?.replace(/^https?:\/\//, '')}
                            </div>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#06060a]/60 via-transparent to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${isReversed ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-mono text-zinc-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-[0.15em] text-primary-400/80 px-3 py-1 rounded-full border border-primary-500/20 bg-primary-500/5">
                        {project.category}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                      {project.title}
                    </h2>

                    <p className="text-zinc-500 leading-relaxed font-light mb-6">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium text-zinc-500 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-flex"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-violet-500 rounded-full opacity-50 group-hover/btn:opacity-100 blur-sm transition-opacity duration-500" />
                      <div className="relative px-7 py-3 bg-[#0a0a0f] rounded-full text-sm font-semibold text-white border border-white/10 group-hover/btn:border-primary-500/30 transition-all duration-500 flex items-center gap-2">
                        {project.linkText}
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to be our next <span className="gradient-text">success story</span>?
            </h2>
            <p className="text-zinc-500 mb-10 max-w-xl mx-auto font-light">
              Let&apos;s discuss how we can help bring your vision to life
            </p>
            <Link
              href="/contact"
              className="group relative inline-flex"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-pink-500 to-violet-500 rounded-full opacity-70 group-hover:opacity-100 blur-md transition-all duration-500 group-hover:blur-lg" />
              <div className="relative px-8 py-4 bg-[#0a0a0f] rounded-full text-base font-semibold text-white border border-white/10 group-hover:border-primary-500/30 transition-all duration-500 flex items-center gap-3">
                Start a Project
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
