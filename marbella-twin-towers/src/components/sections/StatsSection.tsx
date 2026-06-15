"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, Dumbbell, Home } from "lucide-react";
import { useCounter } from "@/hooks/useCounter";
import { STATS } from "@/lib/constants";

const icons = [MapPin, Building2, Dumbbell, Home];

function AnimatedCounter({ value }: { value: number }) {
  const { ref, count } = useCounter(value, 2000);
  return (
    <span ref={ref} className="font-display text-4xl font-bold text-secondary-500 md:text-5xl lg:text-6xl">
      {Number.isInteger(value)
        ? Math.floor(count).toLocaleString("en-IN")
        : count.toFixed(2)}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-secondary-900 py-20 md:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-lg bg-white shadow-xl"
        >
          <div className="h-1 bg-primary-500" />

          <div className="p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4">
              {STATS.map((stat, index) => {
                const Icon = icons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-secondary-500 shadow-lg"
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>

                    <div className="mb-2">
                      <AnimatedCounter value={stat.value} />
                    </div>

                    <p className="text-sm font-medium uppercase tracking-wider text-dark-500">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
