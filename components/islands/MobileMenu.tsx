'use client';
import { useState, type ReactNode } from 'react';

type Props = { children: ReactNode };

export function MobileMenu({ children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div data-menu-open={open ? 'true' : 'false'} className="mobile-menu-wrapper">
      {children}
      <button
        className={`hamburger ${open ? 'active' : ''}`.trim()}
        id="hamburger"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );
}
