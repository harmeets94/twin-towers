"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="font-display text-8xl font-bold text-primary-500 md:text-9xl"
        >
          404
        </motion.h1>

        <h2 className="mt-4 text-2xl font-bold text-dark-900 md:text-3xl">
          Page Not Found
        </h2>
        <p className="mx-auto mt-4 max-w-md text-dark-600">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-primary-500 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-primary-600"
          >
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </motion.a>
          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full border-2 border-dark-200 px-8 py-4 font-semibold text-dark-700 transition-colors hover:border-secondary-500 hover:text-secondary-500"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Go Back</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
