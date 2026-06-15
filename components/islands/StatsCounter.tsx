'use client';
import { useEffect, useRef, useState } from 'react';

function formatNumber(num: number, target: number): string {
  if (target >= 1000) return Math.floor(num).toLocaleString();
  if (target % 1 !== 0) return num.toFixed(2);
  return Math.floor(num).toString();
}

export function StatsCounter({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasRun.current) return;

    let rafId: number;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            const duration = 2000;
            const stepMs = 16;
            const totalSteps = duration / stepMs;
            const increment = target / totalSteps;
            let current = 0;
            const tick = () => {
              current += increment;
              if (current < target) {
                setValue(current);
                rafId = requestAnimationFrame(tick);
              } else {
                setValue(target);
              }
            };
            rafId = requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [target]);

  return (
    <div className="stat-number" data-target={target} ref={ref}>
      {formatNumber(value, target)}
    </div>
  );
}
