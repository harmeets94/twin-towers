'use client';
import { useEffect, useState } from 'react';

const DISCLAIMER_PARAGRAPHS = [
  'This website is operated by a licensed real estate agency and is intended solely for informational purposes. It is not the official website of the developer or the property. All logos, images, and branding materials displayed herein remain the exclusive intellectual property of the respective developer, and all rights are reserved.',
  'By accessing or using this website, you acknowledge and agree to the terms of this Disclaimer without reservation. The content on this website, including brochures and marketing collaterals, is provided for general information only. Nothing on this website constitutes an advertisement, offer for sale, booking, or invitation to purchase any unit in any project.',
  'This website is currently being updated. Visitors are advised not to rely on any information presented here for the purpose of making any booking or purchase decision. The agency shall not be held liable for any consequences arising from reliance on the information contained on this website.',
  'Thank you for visiting our website.',
];

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Disclaimer
      </a>
      {open && (
        <div className="disclaimer-modal active" role="dialog" aria-modal="true">
          <div className="disclaimer-modal-overlay" onClick={() => setOpen(false)} />
          <div className="disclaimer-modal-box">
            <button className="disclaimer-close" onClick={() => setOpen(false)} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h2 className="disclaimer-title">Disclaimer</h2>
            <div className="disclaimer-body">
              {DISCLAIMER_PARAGRAPHS.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
