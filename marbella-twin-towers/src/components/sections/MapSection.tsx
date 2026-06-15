"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { MAP_EMBED_URL, PROJECT_ADDRESS } from "@/lib/constants";

export default function MapSection() {
  return (
    <section className="relative bg-white py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-lg bg-white shadow-xl"
        >
          <div className="border-b border-dark-200 p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-dark-900">
                    Our Location
                  </h3>
                  <p className="text-dark-500">{PROJECT_ADDRESS}</p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PROJECT_ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full border border-primary-200 px-4 py-2 text-sm font-medium text-primary-500 transition-all hover:bg-primary-50 md:flex"
              >
                <Navigation className="h-4 w-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px]">
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Marbella Twin Towers Location"
            />
          </div>

          <div className="p-4 md:hidden">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PROJECT_ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-primary-600"
            >
              <Navigation className="h-5 w-5" />
              <span>Get Directions</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
