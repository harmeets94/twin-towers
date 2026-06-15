"use client";

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { FLOOR_PLANS } from "@/lib/constants";

export default function FloorPlanSection() {
  return (
    <section id="floorplan" className="relative overflow-hidden bg-white py-20 md:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          subtitle="Location & Floor Plan"
          title="Marbella Twin Towers"
          description="Explore our meticulously designed floor plans that maximize space, natural light, and luxury living."
        />

        <div className="mt-16 space-y-8">
          {FLOOR_PLANS.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-dark-200 bg-white shadow-lg transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={plan.src}
                  alt={plan.alt}
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 flex items-center justify-center bg-secondary-900/0 transition-opacity duration-300 group-hover:bg-secondary-900/40 opacity-0 group-hover:opacity-100">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-dark-900 shadow-xl"
                  >
                    <Maximize2 className="h-5 w-5" />
                    View Full Size
                  </motion.button>
                </div>
              </div>

              <div className="absolute left-4 top-4 rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                Plan {String.fromCharCode(65 + index)}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-secondary-500 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:bg-secondary-600"
          >
            <span>Get Detailed Floor Plans</span>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
