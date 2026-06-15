"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
  className?: string;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  light = false,
  center = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? "text-center" : ""} ${className}`}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className={`mb-4 inline-block rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wider ${
          light
            ? "bg-white/10 text-white/80"
            : "bg-secondary-500/10 text-secondary-500"
        }`}
      >
        {subtitle}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={`font-display text-3xl font-bold md:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-dark-900"
        }`}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`mx-auto mt-6 max-w-2xl text-lg ${
            light ? "text-dark-300" : "text-dark-600"
          }`}
        >
          {description}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={`mt-6 h-1 w-24 rounded-sm bg-primary-500 ${
          center ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
