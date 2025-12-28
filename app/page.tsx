"use client";

import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

const services = [
  {
    title: "Web UI Design",
    description:
      "Modern, responsive web interfaces that engage users and drive conversions",
    icon: "🎨",
  },
  {
    title: "Photography",
    description: "Professional photography services to showcase your business",
    icon: "📸",
  },
  {
    title: "Hosting & Maintenance",
    description:
      "Reliable hosting and ongoing maintenance to keep your site running smoothly",
    icon: "🚀",
  },
  {
    title: "SEO / Website Visibility",
    description: "Optimize your online presence and reach more customers",
    icon: "🔍",
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
  // Add more testimonials here following the same structure
];

export default function Home() {
  const handleResumeDownload = () => {
    trackEvent("resume_download", "Download", "Resume 2025");
  };

  return (
    <>
      <Hero />

      {/* Services Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Our Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive web solutions tailored for small and emerging
              businesses
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-primary-500 transition-all duration-300 card-hover"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">What Our Clients Say</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real feedback from businesses we've helped succeed online
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-primary-500 transition-all duration-300"
              >
                {/* Star rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>

                {/* Author info */}
                <div className="border-t border-gray-700 pt-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">
                    {testimonial.title}
                    {testimonial.organization && (
                      <span className="text-primary-400">
                        {" "}
                        · {testimonial.organization}
                      </span>
                    )}
                  </p>
                </div>
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
              Ready to elevate your online presence?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's work together to create something amazing for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 text-lg font-semibold text-primary-600 bg-white rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </Link>
              <a
                href="/pdf/Resume2025.pdf"
                download
                onClick={handleResumeDownload}
                className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
