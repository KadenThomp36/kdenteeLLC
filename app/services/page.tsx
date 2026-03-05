'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const services = [
  {
    title: 'Web UI Design',
    description:
      'Create stunning, intuitive interfaces that delight users and drive engagement. Our designs are modern, accessible, and optimized for conversions.',
    features: [
      'Responsive design for all devices',
      'User-centered design approach',
      'Modern UI/UX best practices',
      'Accessibility compliance',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    accent: 'from-primary-500/20 to-pink-500/5',
    number: '01',
  },
  {
    title: 'Web Development',
    description:
      'Build fast, scalable, and secure web applications using the latest technologies. From simple websites to complex web applications.',
    features: [
      'Custom web applications',
      'E-commerce solutions',
      'CMS integration',
      'API development',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    accent: 'from-violet-500/20 to-purple-500/5',
    number: '02',
  },
  {
    title: 'Photography',
    description:
      'Professional photography services to showcase your business, products, or events. High-quality images that tell your story.',
    features: [
      'Product photography',
      'Business headshots',
      'Event coverage',
      'Real estate photography',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
    ),
    accent: 'from-amber-500/20 to-orange-500/5',
    number: '03',
  },
  {
    title: 'Hosting & Maintenance',
    description:
      'Reliable hosting solutions and ongoing maintenance to keep your website running smoothly, securely, and up-to-date.',
    features: [
      'Fast, secure hosting',
      'Regular backups',
      'Security updates',
      '24/7 monitoring',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008H15v-.008z" />
      </svg>
    ),
    accent: 'from-emerald-500/20 to-teal-500/5',
    number: '04',
  },
  {
    title: 'SEO & Visibility',
    description:
      'Improve your search engine rankings and online visibility. Get found by customers searching for your services.',
    features: [
      'On-page SEO optimization',
      'Keyword research',
      'Performance optimization',
      'Analytics & reporting',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    accent: 'from-cyan-500/20 to-blue-500/5',
    number: '05',
  },
  {
    title: 'Consulting',
    description:
      'Strategic guidance for your web presence. Get expert advice on technology choices, architecture, and digital strategy.',
    features: [
      'Technology consulting',
      'Digital strategy',
      'Code reviews',
      'Performance audits',
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    accent: 'from-rose-500/20 to-red-500/5',
    number: '06',
  },
]

export default function Services() {
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
                Our Services
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Everything you need to{' '}
              <span className="gradient-text">succeed online</span>
            </h1>
            <p className="text-lg text-zinc-500 max-w-2xl font-light leading-relaxed">
              Comprehensive web solutions designed to help your business establish and grow its digital presence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="glass-card glass-card-hover rounded-3xl p-8 md:p-10 relative group overflow-hidden"
              >
                {/* Background accent */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />

                <div className="relative z-10 grid md:grid-cols-12 gap-8 items-start">
                  {/* Number + Icon */}
                  <div className="md:col-span-1 flex md:flex-col items-center md:items-start gap-4">
                    <span className="text-xs font-mono text-zinc-600">{service.number}</span>
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-400 group-hover:text-primary-400 group-hover:border-primary-500/20 transition-all duration-500">
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-6">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                      {service.title}
                    </h3>
                    <p className="text-zinc-500 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="md:col-span-5">
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-sm text-zinc-400"
                        >
                          <div className="w-1 h-1 rounded-full bg-primary-500/60 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-primary-500/50" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary-400">
                Our Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              How we <span className="gradient-text">work</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description:
                  'We learn about your business, goals, and audience to craft the perfect strategy.',
              },
              {
                step: '02',
                title: 'Create',
                description:
                  'Design and develop your solution with meticulous attention to detail and quality.',
              },
              {
                step: '03',
                title: 'Launch & Grow',
                description:
                  'Deploy your project and provide ongoing support to help your business thrive.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                <div className="display-number text-white/[0.03] mb-4 select-none">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 -mt-8">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
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
            className="relative rounded-[2.5rem] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-pink-600/80 to-violet-600/90" />
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            }} />
            <div className="relative z-10 px-8 py-20 md:px-16 md:py-24 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Ready to get started?
              </h2>
              <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto font-light">
                Let&apos;s discuss your project and create a solution that fits your needs
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-full hover:shadow-2xl hover:shadow-white/20 transition-all duration-500 hover:scale-105"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
