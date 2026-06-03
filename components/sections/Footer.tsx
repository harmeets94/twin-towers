import { DisclaimerModal } from '@/components/islands/DisclaimerModal';

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-main-footer">MARBELLA</span>
            <span className="logo-sub">TWIN TOWERS</span>
          </div>
          <div className="footer-links">
            <DisclaimerModal />
            <a href="#contact">Contact Us</a>
          </div>
          <p className="copyright">© Marbella Twin Towers 2025 | All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
