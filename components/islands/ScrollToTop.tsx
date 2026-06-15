'use client';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`scroll-top ${visible ? 'visible' : ''}`.trim()}
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Icon name="arrowUp" size={24} aria-hidden />
    </button>
  );
}
