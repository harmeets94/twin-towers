'use client';
import { useEffect, useState, type ReactNode } from 'react';

export function StickyHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={scrolled ? 'navbar-scrolled' : ''} data-scrolled={scrolled}>
      {children}
    </div>
  );
}
