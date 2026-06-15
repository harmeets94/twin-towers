"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import {
  PHONE_PRIMARY,
  PHONE_SECONDARY,
  WHATSAPP_LINK,
  // RERA_NUMBER,
} from "@/lib/constants";

export default function TopBar() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary-500 relative z-50 text-white"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 text-sm">
        <a
          href={`tel:${PHONE_PRIMARY.replace(/-/g, "")}`}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Phone className="h-3.5 w-3.5" />
          <span className="hidden font-light sm:inline">
            {PHONE_PRIMARY}, {PHONE_SECONDARY}
          </span>
          <span className="font-light sm:hidden">{PHONE_PRIMARY}</span>
        </a>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span className="font-light">WhatsApp</span>
        </a>

        {/* <div className="hidden items-center gap-2 md:flex">
          <MapPin className="h-3.5 w-3.5 text-primary-400" />
          <span className="font-medium">{RERA_NUMBER}</span>
        </div> */}
      </div>
    </motion.div>
  );
}
