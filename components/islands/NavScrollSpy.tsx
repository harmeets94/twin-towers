'use client';
import { useEffect, useState, type ReactNode } from 'react';

const SECTIONS = ['home', 'about', 'floor-plan', 'gallery', 'contact'];

type NavScrollSpyProps = {
  children: ReactNode | ((activeId: string) => ReactNode);
};

export function NavScrollSpy({ children }: NavScrollSpyProps) {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.id;
          if (SECTIONS.includes(id)) setActiveId(id);
        }
      },
      { rootMargin: '-100px 0px -50% 0px', threshold: [0, 0.1, 0.5, 1] },
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const renderedChildren = typeof children === 'function' ? children(activeId) : children;

  return (
    <div data-active-section={activeId} className="nav-scroll-spy">
      {renderedChildren}
    </div>
  );
}
