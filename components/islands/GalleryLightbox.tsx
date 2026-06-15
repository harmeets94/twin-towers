'use client';
import { useEffect, useState, useRef, type ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';

type Image = { src: string; alt: string };

export function GalleryLightbox({
  images,
  children,
}: {
  images: Image[];
  children: ReactNode;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    // Store the previously focused element
    if (document.activeElement) {
      prevActiveRef.current = document.activeElement as HTMLElement;
    }

    // Focus the close button after mount
    const timeout = setTimeout(() => {
      closeRef.current?.focus();
    }, 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i! - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i! + 1) % images.length);
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, images.length]);

  // Restore focus when lightbox closes
  useEffect(() => {
    if (openIndex === null && prevActiveRef.current) {
      prevActiveRef.current.focus();
    }
  }, [openIndex]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setOpenIndex(null);
  };

  return (
    <>
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const item = target.closest('.pg-item') as HTMLElement | null;
          if (!item) return;
          const all = Array.from(document.querySelectorAll('.pg-item'));
          const idx = all.indexOf(item);
          if (idx >= 0) setOpenIndex(idx);
        }}
      >
        {children}
      </div>
      {openIndex !== null && (
        <div
          className="lightbox active"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
          onClick={handleOverlayClick}
        >
          <button
            className="lightbox-close"
            onClick={() => setOpenIndex(null)}
            aria-label="Close lightbox"
            ref={closeRef}
          >
            <Icon name="x" size={30} aria-hidden />
          </button>
          <button
            className="lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i! - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
          >
            <Icon name="chevronLeft" size={30} aria-hidden />
          </button>
          <button
            className="lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i! + 1) % images.length);
            }}
            aria-label="Next image"
          >
            <Icon name="chevronRight" size={30} aria-hidden />
          </button>
          <div className="lightbox-content">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[openIndex].src}
              alt={images[openIndex].alt}
            />
          </div>
        </div>
      )}
    </>
  );
}
