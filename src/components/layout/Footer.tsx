"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, ArrowUp } from "lucide-react";
import {
  PHONE_PRIMARY,
  PHONE_SECONDARY,
  PROJECT_ADDRESS,
  // RERA_NUMBER,
} from "@/lib/constants";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-secondary-900 pt-20 pb-8">
      <div className="absolute left-0 right-0 top-0 h-1 bg-primary-500" />

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <img
              src="/images/logo.svg"
              alt="Marbella Twin Towers"
              className="mb-6 h-14 w-auto"
            />
            <p className="mb-6 max-w-md text-dark-300">
              Marbella Twin Towers stands as the first iconic twin towers
              development in the Chandigarh Tricity region, offering an
              exclusive collection of luxury 5 BHK residences designed to
              redefine upscale living.
            </p>
            {/* <div className="flex items-center gap-2 text-sm text-dark-400">
              <MapPin className="h-4 w-4 text-primary-500" />
              <span>{RERA_NUMBER}</span>
            </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h4 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "About", "Floor Plan", "Gallery", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "")}`}
                      className="text-dark-300 transition-colors hover:text-primary-400"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h4 className="mb-6 text-lg font-semibold text-white">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${PHONE_PRIMARY.replace(/-/g, "")}`}
                  className="flex items-center gap-3 text-dark-300 transition-colors hover:text-primary-400"
                >
                  <Phone className="h-4 w-4 text-primary-500" />
                  <span>{PHONE_PRIMARY}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PHONE_SECONDARY.replace(/-/g, "")}`}
                  className="flex items-center gap-3 text-dark-300 transition-colors hover:text-primary-400"
                >
                  <Phone className="h-4 w-4 text-primary-500" />
                  <span>{PHONE_SECONDARY}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-dark-300">
                  <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-primary-500" />
                  <span>{PROJECT_ADDRESS}</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="my-12 h-px bg-dark-700" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-dark-400">
            &copy; {new Date().getFullYear()} Marbella Twin Towers. All Rights
            Reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-dark-400 transition-colors hover:text-white">
              Terms & Condition
            </a>
            <a href="#" className="text-sm text-dark-400 transition-colors hover:text-white">
              Privacy Policy
            </a>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-all hover:bg-primary-600"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
