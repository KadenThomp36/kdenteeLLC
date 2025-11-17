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
    icon: '🎨',
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
    icon: '💻',
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
    icon: '📸',
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
    icon: '🚀',
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
    icon: '🔍',
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
    icon: '💡',
  },
]

export default function Services() {
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
            <span className="gradient-text">Our Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Comprehensive web solutions designed to help your business succeed online
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-primary-500 transition-all duration-300 card-hover"
              >
                <div className="text-6xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start text-gray-300">
                      <span className="text-primary-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
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
              Ready to get started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a solution that fits your needs
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
