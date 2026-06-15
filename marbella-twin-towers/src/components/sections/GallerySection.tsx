"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { GALLERY_IMAGES } from "@/lib/constants";

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  };

  return (
    <section id="gallery" className="relative overflow-hidden bg-dark-50 py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          subtitle="Gallery"
          title="Experience Marbella Twin Towers"
          description="A visual journey through luxury living - explore our stunning residences and world-class amenities."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <div className="group relative overflow-hidden rounded-lg lg:col-span-4">
            <GalleryItem image={GALLERY_IMAGES[0]} onClick={() => openLightbox(0)} height="h-64 sm:h-72" />
          </div>
          <div className="group relative overflow-hidden rounded-lg lg:col-span-8">
            <GalleryItem image={GALLERY_IMAGES[1]} onClick={() => openLightbox(1)} height="h-64 sm:h-72" />
          </div>

          <div className="group relative overflow-hidden rounded-lg lg:col-span-8">
            <GalleryItem image={GALLERY_IMAGES[2]} onClick={() => openLightbox(2)} height="h-64 sm:h-72" />
          </div>
          <div className="group relative overflow-hidden rounded-lg lg:col-span-4">
            <GalleryItem image={GALLERY_IMAGES[3]} onClick={() => openLightbox(3)} height="h-64 sm:h-72" />
          </div>

          <div className="group relative overflow-hidden rounded-lg lg:col-span-4">
            <GalleryItem image={GALLERY_IMAGES[4]} onClick={() => openLightbox(4)} height="h-64 sm:h-72" />
          </div>
          <div className="group relative overflow-hidden rounded-lg lg:col-span-8">
            <GalleryItem image={GALLERY_IMAGES[5]} onClick={() => openLightbox(5)} height="h-64 sm:h-72" />
          </div>

          <div className="group relative overflow-hidden rounded-lg lg:col-span-8">
            <GalleryItem image={GALLERY_IMAGES[6]} onClick={() => openLightbox(6)} height="h-64 sm:h-72" />
          </div>
          <div className="group relative overflow-hidden rounded-lg lg:col-span-4">
            <GalleryItem image={GALLERY_IMAGES[7]} onClick={() => openLightbox(7)} height="h-64 sm:h-72" />
          </div>

          <div className="group relative overflow-hidden rounded-lg lg:col-span-4">
            <GalleryItem image={GALLERY_IMAGES[8]} onClick={() => openLightbox(8)} height="h-64 sm:h-72" />
          </div>
          <div className="group relative overflow-hidden rounded-lg lg:col-span-8">
            <GalleryItem image={GALLERY_IMAGES[9]} onClick={() => openLightbox(9)} height="h-64 sm:h-72" />
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-8"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-8"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            src={GALLERY_IMAGES[currentIndex].src}
            alt={GALLERY_IMAGES[currentIndex].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
            {currentIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </motion.div>
      )}
    </section>
  );
}

function GalleryItem({
  image,
  onClick,
  height = "h-64",
}: {
  image: { src: string; alt: string };
  onClick: () => void;
  height?: string;
}) {
  return (
    <div
      className={`group relative cursor-pointer overflow-hidden ${height}`}
      onClick={onClick}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 flex items-center justify-center bg-secondary-900/0 transition-colors duration-300 group-hover:bg-secondary-900/40">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
          <Expand className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}
