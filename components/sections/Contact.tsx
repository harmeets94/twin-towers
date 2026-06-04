import { SectionLabel } from '@/components/ui/SectionLabel';
import { ContactForm } from '@/components/islands/ContactForm';

export function Contact() {
  return (
    <section className="contact section-padding bg-dark" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info-section">
            <SectionLabel variant="light">Contact Us</SectionLabel>
            <h2 className="section-title light">Do you have any question?</h2>
            <p className="contact-desc">Experience luxury living at Marbella Twin Towers. Contact us today to learn more or schedule a visit. Your dream home awaits!</p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4>Address</h4>
                  <p>New Chandigarh, Mullanpur</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4>Phone</h4>
                  <p><a href="tel:+919478997378">+91-9478997378</a></p>
                  <p><a href="tel:+918699805332">+91-8699805332</a></p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p><a href="mailto:hvproperties26@gmail.com">hvproperties26@gmail.com</a></p>
                </div>
              </div>
            </div>
            {/* <div className="rera-badge">
              <span>RERA Registration No:</span>
              <strong>PBRERA-SAS80-PR0616</strong>
            </div> */}
          </div>
          <div className="contact-form-section">
            <ContactForm variant="full" />
          </div>
        </div>
      </div>
    </section>
  );
}
