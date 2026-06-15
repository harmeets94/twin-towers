"use client";

import { motion } from "framer-motion";
import { MapPin, Award, Star, Building2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const highlights = [
  { icon: MapPin, label: "0 km from Chandigarh" },
  { icon: Award, label: "First Iconic Twin Towers" },
  { icon: Star, label: "Premium Specifications" },
  { icon: Building2, label: "33 Floors High-Rise" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 md:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-lg border border-dark-200">
              <img src="/images/about.svg" alt="Marbella Twin Towers" className="h-auto w-full object-cover" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 rounded-lg bg-secondary-500 p-6 text-white shadow-xl md:-bottom-8 md:-right-8"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/20">
                  <MapPin className="h-7 w-7" />
                </div>
                <div>
                  <h5 className="text-lg font-bold">Modern & Luxury</h5>
                  <span className="text-sm font-light text-white/80">
                    An Address of Eminence
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <SectionHeading subtitle="About" title="Marbella Twin Towers" center={false} />

            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-dark-600">
                Marbella Twin Towers is a premier luxury high-rise residential
                project located on Madhya Marg, Sector 2, New Chandigarh,
                Mullanpur. Positioned at the very edge of Chandigarh, just{" "}
                <span className="font-semibold text-primary-500">0 km away</span>,
                it offers an exclusive and desirable living experience.
              </p>

              <p className="text-lg leading-relaxed text-dark-600">
                With direct access from the Madhya Marg road extension, Marbella
                Twin Towers stands as the{" "}
                <span className="font-semibold text-primary-500">
                  first prestigious address
                </span>{" "}
                of New Chandigarh.
              </p>

              <div className="rounded-lg border border-primary-200 bg-primary-50 p-6">
                <h3 className="mb-2 text-xl font-bold text-primary-600">
                  The First & The Iconic Twin Towers Development
                </h3>
                <p className="text-dark-600">
                  In Chandigarh TRI-CITY Region
                </p>
              </div>

              <p className="text-lg leading-relaxed text-dark-600">
                This iconic high-rise offers an exclusive collection of{" "}
                <span className="font-semibold text-primary-500">
                  5 BHK residences
                </span>{" "}
                (4 BHK + Multipurpose Room + Store + Pooja Room), meticulously
                designed with premium specifications to set new benchmarks in
                opulence.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3 rounded-lg border border-dark-200 bg-dark-50 p-4 transition-all hover:border-primary-300 hover:bg-primary-50"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary-500">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-dark-700">
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
