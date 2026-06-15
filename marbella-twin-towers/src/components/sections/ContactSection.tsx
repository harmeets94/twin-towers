"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Phone, MessageCircle, Send, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { PHONE_PRIMARY, PHONE_SECONDARY, WHATSAPP_LINK } from "@/lib/constants";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Thank you! We'll contact you soon.");
        reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-dark-50 py-20 md:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          subtitle="Contact Us"
          title="Do You Have Any Questions?"
          description="Experience luxury living at Marbella Twin Towers. Contact us today to learn more or schedule a visit. Your dream home awaits!"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="rounded-lg border border-dark-200 bg-white p-8 shadow-xl md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-dark-200 bg-dark-50 px-5 py-4 outline-none transition-all focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark-700">
                      Email Address
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full rounded-lg border border-dark-200 bg-dark-50 px-5 py-4 outline-none transition-all focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-dark-700">
                    Phone Number
                  </label>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="+91 99999 99999"
                    className="w-full rounded-lg border border-dark-200 bg-dark-50 px-5 py-4 outline-none transition-all focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-500/20"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-lg bg-secondary-500 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:bg-secondary-600 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-dark-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>RERA Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              <div className="rounded-lg bg-secondary-500 p-8 text-white shadow-xl">
                <h3 className="mb-4 font-display text-xl font-bold">
                  Speak With Us
                </h3>
                <p className="mb-6 text-white/80">
                  Our team is ready to help you find your dream home.
                </p>
                <div className="space-y-3">
                  <a
                    href={`tel:${PHONE_PRIMARY.replace(/-/g, "")}`}
                    className="flex items-center gap-3 rounded-lg bg-white/20 px-4 py-3 font-medium transition-all hover:bg-white/30"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{PHONE_PRIMARY}</span>
                  </a>
                  <a
                    href={`tel:${PHONE_SECONDARY.replace(/-/g, "")}`}
                    className="flex items-center gap-3 rounded-lg bg-white/20 px-4 py-3 font-medium transition-all hover:bg-white/30"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{PHONE_SECONDARY}</span>
                  </a>
                </div>
              </div>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border-2 border-green-500 bg-green-50 p-8 transition-all hover:bg-green-500"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-green-500 text-white transition-colors group-hover:bg-white group-hover:text-green-500">
                    <MessageCircle className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-green-700 group-hover:text-white">
                      Chat on WhatsApp
                    </h3>
                    <p className="text-sm text-green-600 group-hover:text-white/80">
                      Quick response guaranteed
                    </p>
                  </div>
                </div>
              </a>

              <div className="rounded-lg bg-white p-8 shadow-lg">
                <h3 className="mb-4 font-display text-lg font-bold text-dark-900">
                  Office Hours
                </h3>
                <div className="space-y-3 text-dark-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-dark-900">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-dark-900">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-primary-500">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
