"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { FEATURES, YOUTUBE_VIDEO_ID } from "@/lib/constants";

export default function WhyChooseSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="group relative overflow-hidden rounded-lg border border-dark-200">
              <img
                src="/images/why1.svg"
                alt="Why Choose Marbella Twin Towers"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
              />

              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-secondary-900/50 transition-colors group-hover:bg-secondary-900/60"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-500 shadow-xl"
                >
                  <Play className="ml-1 h-8 w-8 text-white" />
                </motion.div>
              </button>
            </div>

            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-lg border-2 border-primary-500/30" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading
              subtitle="Why Choose"
              title="Marbella Twin Towers - Luxurious Highrise Apartments"
              center={false}
            />

            <ul className="mb-8 space-y-4">
              {FEATURES.map((usp, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-500">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg text-dark-800">{usp}</span>
                </motion.li>
              ))}
            </ul>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-lg leading-relaxed text-dark-600"
            >
              Marbella Twin Towers is designed to offer the perfect blend of
              comfort and luxury, complemented by breathtaking views of the city.
              Each 5 BHK residence is a masterpiece of elegance, thoughtfully
              crafted to{" "}
              <span className="font-semibold text-secondary-500">
                redefine upscale living
              </span>
              .
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-secondary-500 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:bg-secondary-600"
              >
                <span>Experience Luxury Living</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl"
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-12 right-0 text-white transition-colors hover:text-primary-400"
              >
                <X className="h-8 w-8" />
              </button>

              <div className="overflow-hidden rounded-lg shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                  className="aspect-video w-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
