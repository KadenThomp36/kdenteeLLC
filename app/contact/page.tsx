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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '2b8771bc-263d-4fe9-b48c-e807b9f27255',
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `New Contact Form Submission from ${data.name}`,
          from_name: 'Kdentee LLC Website',
        }),
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
    } catch {
      setSubmitStatus('error')
      trackFormError('Contact Form - Network Error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses =
    'w-full px-5 py-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-white placeholder-zinc-600 transition-all duration-500 focus:border-primary-500/30 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(233,30,99,0.08)]'

  return (
    <div className="pt-20 min-h-screen">
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
                Contact
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Let&apos;s{' '}
              <span className="gradient-text">talk</span>
            </h1>
            <p className="text-lg text-zinc-500 max-w-2xl font-light leading-relaxed">
              Have a project in mind? Let&apos;s discuss how we can help bring your vision to life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 pb-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="glass-card rounded-3xl p-8 md:p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium uppercase tracking-[0.15em] text-zinc-500 mb-3"
                    >
                      Name
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      id="name"
                      className={inputClasses}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-2 text-primary-400 text-xs">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium uppercase tracking-[0.15em] text-zinc-500 mb-3"
                    >
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
                      className={inputClasses}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-primary-400 text-xs">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium uppercase tracking-[0.15em] text-zinc-500 mb-3"
                    >
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
                      className={`${inputClasses} resize-none`}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && (
                      <p className="mt-2 text-primary-400 text-xs">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-violet-500 rounded-2xl opacity-60 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                    <div className="relative w-full px-8 py-4 bg-[#0a0a0f] rounded-2xl text-base font-semibold text-white border border-white/10 group-hover:border-primary-500/30 transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50">
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </div>
                  </button>

                  {/* Status */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-center text-sm"
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center text-sm"
                    >
                      Oops! Something went wrong. Please try again later.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Email card */}
              <a
                href="mailto:kadenthompson@kdenteellc.com"
                className="block glass-card glass-card-hover rounded-3xl p-7 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary-500/10 border border-primary-500/10 flex items-center justify-center text-primary-400 group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-600 uppercase tracking-widest mb-1.5">Email</p>
                    <p className="text-sm text-white font-medium">kadenthompson@kdenteellc.com</p>
                  </div>
                </div>
              </a>

              {/* Phone card */}
              <a
                href="tel:+19899415846"
                className="block glass-card glass-card-hover rounded-3xl p-7 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 transition-colors flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-600 uppercase tracking-widest mb-1.5">Phone</p>
                    <p className="text-sm text-white font-medium">(989) 941-5846</p>
                  </div>
                </div>
              </a>

              {/* Availability */}
              <div className="glass-card rounded-3xl p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="glow-dot" />
                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
                    Currently Available
                  </span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  We typically respond within 24 hours. For urgent inquiries, feel free to call us directly.
                </p>
              </div>

              {/* Quick info */}
              <div className="glass-card rounded-3xl p-7">
                <h4 className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500 mb-4">
                  What happens next?
                </h4>
                <div className="space-y-4">
                  {[
                    { step: '01', text: 'We review your message and project details' },
                    { step: '02', text: 'Schedule a free consultation call' },
                    { step: '03', text: 'Provide a detailed proposal and timeline' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="text-[10px] font-mono text-primary-400/60 mt-0.5">{item.step}</span>
                      <p className="text-sm text-zinc-400 font-light">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
