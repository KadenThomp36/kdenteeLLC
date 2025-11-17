'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface InfoSectionProps {
  headline: string
  copy: string
  imageSrc: string
  imageAlt: string
  buttonLink?: string
  buttonText?: string
  reverse?: boolean
}

export default function InfoSection({
  headline,
  copy,
  imageSrc,
  imageAlt,
  buttonLink,
  buttonText,
  reverse = false,
}: InfoSectionProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${
            reverse ? 'md:flex-row-reverse' : ''
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative h-96 rounded-2xl overflow-hidden shine-border ${
              reverse ? 'md:order-2' : ''
            }`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={reverse ? 'md:order-1' : ''}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {headline}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              {copy}
            </p>
            {buttonLink && buttonText && (
              <Link
                href={buttonLink}
                className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-pink-600 rounded-full hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                {buttonText}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
