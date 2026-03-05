"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/shared/Hero";
import Link from "next/link";
import { useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const services = [
  {
    title: "Web UI Design",
    description: "Modern, responsive interfaces that engage and convert",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    span: "col-span-2 row-span-1",
    accent: "from-primary-500/20 to-pink-500/10",
  },
  {
    title: "Photography",
    description: "Professional photography to showcase your business",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
    span: "col-span-1 row-span-2",
    accent: "from-violet-500/20 to-purple-500/10",
  },
  {
    title: "Hosting",
    description: "Reliable hosting and maintenance for peace of mind",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008H15v-.008z" />
      </svg>
    ),
    span: "col-span-1 row-span-1",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "SEO",
    description: "Optimize your visibility and reach more customers",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    span: "col-span-1 row-span-1",
    accent: "from-amber-500/20 to-orange-500/10",
  },
];

const testimonials = [
  {
    name: "Kimberly Oswald",
    title: "Lincoln Township Treasurer",
    organization: "Midland County",
    rating: 5,
    quote:
      "Prompt and professional: We hired KdenTeeLLC to rebuild our website and implement new, user-friendly features and they provided that in a prompt and professional manner. They gave us all the features we requested in less time than expected. We are very pleased with the end product and have no reservations about our decision to hire them.",
  },
];

const stats = [
  { number: "5+", label: "Years Experience" },
  { number: "100%", label: "Client Satisfaction" },
  { number: "24/7", label: "Support Available" },
  { number: "50+", label: "Projects Delivered" },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      className={`${service.span} glass-card glass-card-hover rounded-3xl p-8 relative group overflow-hidden`}
    >
      {/* Gradient accent */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-300 group-hover:text-primary-400 group-hover:border-primary-500/20 transition-all duration-500 mb-6">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed flex-1">
          {service.description}
        </p>
        <div className="mt-6 flex items-center gap-2 text-xs font-medium text-zinc-600 group-hover:text-primary-400 transition-colors duration-500">
          <span>Learn more</span>
          <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const handleResumeDownload = () => {
    trackEvent("resume_download", "Download", "Resume 2025");
  };

  const statsRef = useRef<HTMLElement>(null);

  return (
    <>
      <Hero />

      {/* Stats Bar */}
      <section ref={statsRef} className="relative py-16 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/[0.04]">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center md:px-8"
              >
                <div className="display-number gradient-text mb-2">{stat.number}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Bento Grid */}
      <section className="py-28 relative">
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
                What We Do
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
              Crafting digital experiences that{" "}
              <span className="gradient-text">matter</span>
            </h2>
          </motion.div>

          <div className="bento-grid">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300 group"
            >
              View all services
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 relative overflow-hidden">
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
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Trusted by{" "}
              <span className="gradient-text">real clients</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="lg:col-span-3 glass-card rounded-3xl p-10 relative overflow-hidden"
              >
                {/* Quote mark */}
                <div className="absolute -top-4 -left-2 text-[120px] font-black text-white/[0.03] leading-none select-none">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? "text-amber-400" : "text-zinc-700"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-zinc-300 leading-relaxed mb-8 text-lg font-light relative z-10">
                  {testimonial.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-sm font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {testimonial.title}
                      {testimonial.organization && (
                        <span className="text-primary-400/70">
                          {" "}&middot; {testimonial.organization}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative side panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-2 glass-card rounded-3xl p-10 flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-violet-500/5" />
              <div className="relative z-10">
                <div className="display-number gradient-text mb-4">100%</div>
                <p className="text-zinc-400 text-sm mb-8 max-w-xs">
                  Client satisfaction rate across all completed projects
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Become our next success story
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2.5rem] overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-pink-600/80 to-violet-600/90" />
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
            }} />

            {/* Content */}
            <div className="relative z-10 px-8 py-20 md:px-16 md:py-24 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                Ready to elevate your
                <br />
                online presence?
              </h2>
              <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light">
                Let&apos;s work together to create something extraordinary for your business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-full hover:shadow-2xl hover:shadow-white/20 transition-all duration-500 hover:scale-105"
                >
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="/pdf/Resume2025.pdf"
                  download
                  onClick={handleResumeDownload}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105"
                >
                  Download Resume
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
