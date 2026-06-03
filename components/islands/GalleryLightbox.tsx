'use client';
import { useEffect, useState, type ReactNode } from 'react';

type Image = { src: string; alt: string };

export function GalleryLightbox({
  images,
  children,
}: {
  images: Image[];
  children: ReactNode;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i! - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i! + 1) % images.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, images.length]);

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
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenIndex(null);
          }}
        >
          <button className="lightbox-close" onClick={() => setOpenIndex(null)} aria-label="Close">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <button
            className="lightbox-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i! - 1 + images.length) % images.length);
            }}
            aria-label="Previous"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            className="lightbox-nav next"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i! + 1) % images.length);
            }}
            aria-label="Next"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
          <div className="lightbox-content">
            <img src={images[openIndex].src} alt={images[openIndex].alt} />
          </div>
        </div>
      )}
    </>
  );
}
