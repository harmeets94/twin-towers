import { MobileMenu } from '@/components/islands/MobileMenu';
import { StickyHeader } from '@/components/islands/StickyHeader';
import { NavScrollSpy } from '@/components/islands/NavScrollSpy';

export function Header() {
  return (
    <StickyHeader>
      <nav className="navbar" id="navbar">
        <div className="container">
          <div className="nav-wrapper">
            <a href="#" className="logo">
              <span className="logo-main">MARBELLA</span>
              <span className="logo-sub">TWIN TOWERS</span>
            </a>
            <MobileMenu>
              <NavScrollSpy>
                <ul className="nav-menu" id="navMenu">
                  <li><a href="#home" className="nav-link active">Home</a></li>
                  <li><a href="#about" className="nav-link">About</a></li>
                  <li><a href="#floor-plan" className="nav-link">Floor Plan</a></li>
                  <li><a href="#gallery" className="nav-link">Gallery</a></li>
                  <li><a href="#contact" className="nav-link">Contact</a></li>
                </ul>
              </NavScrollSpy>
            </MobileMenu>
            <a href="tel:+919478997378" className="nav-cta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </nav>
    </StickyHeader>
  );
}
