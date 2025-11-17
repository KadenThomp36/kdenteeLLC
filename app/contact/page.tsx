'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { trackFormSuccess, trackFormError } from '@/lib/analytics'

interface ContactForm {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const formData = new FormData()
      formData.append('access_key', '2b8771bc-263d-4fe9-b48c-e807b9f27255')
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('message', data.message)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        trackFormSuccess('Contact Form')
        reset()
      } else {
        setSubmitStatus('error')
        trackFormError('Contact Form - API Error')
      }
    } catch (error) {
      setSubmitStatus('error')
      trackFormError('Contact Form - Network Error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Get in Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Have a project in mind? Let's discuss how we can help bring your vision to life
          </motion.p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800/50 rounded-2xl p-8 md:p-12 border border-gray-700"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2">
                  Name
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-white"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-2 text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2">
                  Email
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-white"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-lg font-medium mb-2">
                  Message
                </label>
                <textarea
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters',
                    },
                  })}
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-white resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && (
                  <p className="mt-2 text-red-400 text-sm">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-pink-600 rounded-full hover:shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center"
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center"
                >
                  Oops! Something went wrong. Please try again later.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
