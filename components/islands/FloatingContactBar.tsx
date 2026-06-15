import { Icon } from '@/components/ui/Icon';

export function FloatingContactBar() {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-content">
          <div className="contact-info">
            <a href="tel:+919478997378" className="contact-link">
              <Icon name="phone" size={16} aria-hidden />
              +91-9478997378
            </a>
            <a href="tel:+918699805332" className="contact-link">
              <Icon name="phone" size={16} aria-hidden />
              +91-8699805332
            </a>
          </div>
          <div className="top-bar-right">
            {/* <span className="rera">RERA: PBRERA-SAS80-PR0616</span> */}
            <a
              href="https://wa.me/919478997378"
              target="_blank"
              rel="noopener noreferrer"
              className="chat-btn"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Click To Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
