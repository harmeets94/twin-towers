'use client';
import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm';

export function FloatingForm() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) {
      const t = setTimeout(() => setCollapsed(true), 5000);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className={`floating-form ${collapsed ? 'collapsed' : ''}`.trim()} id="floatingForm">
      <div className="form-header">
        <span>Get Best Deal</span>
        <button
          className="form-toggle"
          aria-label={collapsed ? 'Expand form' : 'Collapse form'}
          onClick={() => setCollapsed((c) => !c)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points={collapsed ? '6 9 12 15 18 9' : '18 15 12 9 6 15'} />
          </svg>
        </button>
      </div>
      {!collapsed && (
        <div className="form-body">
          <ContactForm variant="compact" />
        </div>
      )}
    </div>
  );
}
