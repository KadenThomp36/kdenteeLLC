'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const values = [
  {
    title: 'Quality First',
    description:
      'We never compromise on quality. Every project receives our full attention and expertise to deliver exceptional results.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    accent: 'from-amber-500/20 to-yellow-500/5',
  },
  {
    title: 'Client Focus',
    description:
      'Your success is our success. We listen, understand, and deliver solutions that meet your specific business goals.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    accent: 'from-primary-500/20 to-pink-500/5',
  },
  {
    title: 'Innovation',
    description:
      'We stay current with the latest technologies and design trends to give you a competitive edge in the digital landscape.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    accent: 'from-violet-500/20 to-indigo-500/5',
  },
]

export default function About() {
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
                About Us
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              We build for the{' '}
              <span className="gradient-text">future</span>
            </h1>
            <p className="text-lg text-zinc-500 max-w-2xl font-light leading-relaxed">
              A web design and development company dedicated to helping small and emerging businesses thrive in the digital world
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Large statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-8">
                Every business deserves a{' '}
                <span className="gradient-text">professional website</span> that reflects
                their brand
              </h2>
              <div className="flex items-center gap-4">
                <div className="glow-dot" />
                <span className="text-sm text-zinc-500 uppercase tracking-widest">
                  Est. Michigan
                </span>
              </div>
            </motion.div>

            {/* Right: Story text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-zinc-400 leading-relaxed font-light">
                Kdentee LLC is a web design and development company dedicated to helping
                small and emerging businesses establish and grow their online presence.
                We believe that every business, regardless of size, deserves a professional
                website that reflects their brand and helps them succeed.
              </p>
              <p className="text-zinc-400 leading-relaxed font-light">
                With expertise in modern web technologies, UI/UX design, and digital
                strategy, we create custom solutions tailored to each client&apos;s unique needs.
                From initial concept to launch and beyond, we&apos;re with you every step of the
                way.
              </p>
              <p className="text-zinc-400 leading-relaxed font-light">
                Our approach combines technical excellence with creative design to deliver
                websites that not only look great but also perform exceptionally. We focus
                on user experience, accessibility, and performance to ensure your website
                serves your business goals and delights your customers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 border-t border-white/[0.04]">
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
                Our Values
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              What drives <span className="gradient-text">us</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="glass-card glass-card-hover rounded-3xl p-8 relative group overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-400 group-hover:text-primary-400 group-hover:border-primary-500/20 transition-all duration-500 mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {value.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-28 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-primary-500/50" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary-400">
                  Our Approach
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Built with <span className="gradient-text">precision</span>
              </h2>
              <p className="text-zinc-500 font-light leading-relaxed">
                We combine the latest web technologies with thoughtful design principles
                to create digital experiences that stand out.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                { label: 'Next.js & React', desc: 'Modern frameworks for lightning-fast experiences' },
                { label: 'Responsive Design', desc: 'Flawless on every device, every time' },
                { label: 'Performance First', desc: 'Optimized for speed and search engines' },
                { label: 'Ongoing Support', desc: 'We are here for you long after launch' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-2 h-2 rounded-full bg-primary-500/60 mt-2 flex-shrink-0 group-hover:bg-primary-400 transition-colors" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">{item.label}</h4>
                    <p className="text-zinc-500 text-sm font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
              backgroundImage: `radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            }} />
            <div className="relative z-10 px-8 py-20 md:px-16 md:py-24 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Let&apos;s work together
              </h2>
              <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto font-light">
                Ready to take your business online? Get in touch and let&apos;s create something amazing together.
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
