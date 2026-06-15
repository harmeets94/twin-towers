import { MobileMenu } from '@/components/islands/MobileMenu';
import { StickyHeader } from '@/components/islands/StickyHeader';
import { NavScrollSpy } from '@/components/islands/NavScrollSpy';
import { Icon } from '@/components/ui/Icon';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#floor-plan', label: 'Floor Plan' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  return (
    <StickyHeader>
      <nav className="navbar" id="navbar" aria-label="Main navigation">
        <div className="container">
          <div className="nav-wrapper">
            <a href="#" className="logo" aria-label="Marbella Twin Towers - Home">
              <span className="logo-main">MARBELLA</span>
              <span className="logo-sub">TWIN TOWERS</span>
            </a>
            <MobileMenu>
              <NavScrollSpy>
                <ul className="nav-menu" id="navMenu" role="menubar">
                  {navItems.map((item) => (
                    <li key={item.href} role="none">
                      <a
                        href={item.href}
                        className="nav-link"
                        role="menuitem"
                        aria-label={`Navigate to ${item.label}`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </NavScrollSpy>
            </MobileMenu>
            <a href="tel:+919478997378" className="nav-cta" aria-label="Call us now">
              <Icon name="phone" size={18} aria-hidden />
              Call Now
            </a>
          </div>
        </div>
      </nav>
    </StickyHeader>
  );
}
