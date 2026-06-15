"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="/images/logo.svg"
            alt="Marbella Twin Towers"
            className="mx-auto h-16 w-auto"
          />
        </motion.div>

        <div className="mx-auto mt-8 h-1 w-48 overflow-hidden rounded-full bg-dark-100">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-full bg-primary-500"
          />
        </div>

        <p className="mt-4 text-sm text-dark-500">Loading luxury experience...</p>
      </motion.div>
    </div>
  );
}
