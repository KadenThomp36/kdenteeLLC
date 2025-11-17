'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function About() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">About Kdentee LLC</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Empowering small and emerging businesses with professional web solutions
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg text-gray-300 leading-relaxed"
          >
            <p>
              Kdentee LLC is a web design and development company dedicated to helping
              small and emerging businesses establish and grow their online presence.
              We believe that every business, regardless of size, deserves a professional
              website that reflects their brand and helps them succeed.
            </p>
            <p>
              With expertise in modern web technologies, UI/UX design, and digital
              strategy, we create custom solutions tailored to each client's unique needs.
              From initial concept to launch and beyond, we're with you every step of the
              way.
            </p>
            <p>
              Our approach combines technical excellence with creative design to deliver
              websites that not only look great but also perform exceptionally. We focus
              on user experience, accessibility, and performance to ensure your website
              serves your business goals and delights your customers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            <span className="gradient-text">Our Values</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description:
                  'We never compromise on quality. Every project receives our full attention and expertise.',
                icon: '⭐',
              },
              {
                title: 'Client Focus',
                description:
                  'Your success is our success. We listen, understand, and deliver solutions that meet your goals.',
                icon: '🤝',
              },
              {
                title: 'Innovation',
                description:
                  'We stay current with the latest technologies and design trends to give you a competitive edge.',
                icon: '🚀',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 text-center"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-primary-600 to-pink-600 rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Let's work together
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Ready to take your business online? Get in touch and let's create something
              amazing together.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 text-lg font-semibold text-primary-600 bg-white rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
