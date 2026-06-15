"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-500 text-white shadow-lg transition-all hover:bg-secondary-600"
          aria-label="Scroll to top"
        >
          <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-secondary-700"
            />
            <motion.circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="100"
              style={{ pathLength }}
            />
          </svg>
          
          <ArrowUp className="relative h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
