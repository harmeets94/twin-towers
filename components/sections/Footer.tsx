'use client';

import { useState } from 'react';
import { DisclaimerModal } from '@/components/islands/DisclaimerModal';
import { Icon } from '@/components/ui/Icon';

const footerLinks = [
  { href: '#contact', label: 'Contact Us' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
];

const socialLinks = [
  { href: 'https://wa.me/919478997378', label: 'WhatsApp', icon: 'phone' as const },
];

export function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <footer className="footer" id="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-main-footer">MARBELLA</span>
            <span className="logo-sub">TWIN TOWERS</span>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <ul style={{ display: 'flex', gap: '30px', listStyle: 'none' }}>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              <li>
                <DisclaimerModal />
              </li>
            </ul>
          </nav>
          <div className="footer-social" style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{ color: '#fff', opacity: hoveredSocial === social.label ? 1 : 0.7 }}
                onMouseEnter={() => setHoveredSocial(social.label)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <Icon name={social.icon} size={20} aria-hidden />
              </a>
            ))}
          </div>
          <p className="copyright">© Marbella Twin Towers 2025 | All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
