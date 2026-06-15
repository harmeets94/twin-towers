'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Slide = { src: string; alt: string };

export function HeroCarousel({ images }: { images: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [images.length]);

  // Parallax (respects reduced motion preference)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let ticking = false;
    const onScroll = () => {
      if (!sliderRef.current || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!sliderRef.current) return;
        const offset = window.scrollY * 0.5;
        const active = sliderRef.current.querySelector<HTMLElement>('.slide.active');
        if (active) active.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (i: number) => {
    setCurrent(((i % images.length) + images.length) % images.length);
  };

  return (
    <>
      <div className="hero-slider" ref={sliderRef}>
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`slide ${i === current ? 'active' : ''}`.trim()}
            role="img"
            aria-label={img.alt}
            aria-hidden={i !== current}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="hero-slide-img"
            />
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <button
          className="slider-btn prev"
          aria-label="Previous slide"
          onClick={() => go(current - 1)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="slider-btn next"
          aria-label="Next slide"
          onClick={() => go(current + 1)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      <div className="slider-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`.trim()}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </>
  );
}
