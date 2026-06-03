'use client';
import { useEffect, useRef, useState } from 'react';

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

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      if (!sliderRef.current) return;
      const offset = window.scrollY * 0.5;
      const active = sliderRef.current.querySelector<HTMLElement>('.slide.active');
      if (active) active.style.transform = `translateY(${offset}px)`;
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
            style={{ backgroundImage: `url(${img.src})`, willChange: 'transform' }}
            role="img"
            aria-label={img.alt}
            aria-hidden={i !== current}
          />
        ))}
      </div>
      <div className="slider-controls">
        <button className="slider-btn prev" aria-label="Previous slide" onClick={() => go(current - 1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button className="slider-btn next" aria-label="Next slide" onClick={() => go(current + 1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
      <div className="slider-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`.trim()}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </>
  );
}
