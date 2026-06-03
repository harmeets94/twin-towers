import { SectionLabel } from '@/components/ui/SectionLabel';

export function About() {
  return (
    <section className="about section-padding" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <div className="image-wrapper">
              <img
                src="/about-exterior.jpg"
                alt="Marbella Twin Towers Exterior"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
              <div className="experience-badge">
                <span className="number">33</span>
                <span className="text">Floors<br />Tallest Tower</span>
              </div>
            </div>
          </div>
          <div className="about-content">
            <SectionLabel>About</SectionLabel>
            <h2 className="section-title">Marbella Twin Towers</h2>
            <p className="about-text">
              Marbella Twin Towers is a premier luxury high-rise residential project located in New Chandigarh, Mullanpur. Positioned at the very edge of Chandigarh, just 0 km away, it offers an exclusive and desirable living experience. With direct access from the Madhya Marg road extension, Marbella Twin Towers stands as the first prestigious address of New Chandigarh.
            </p>
            <p className="about-text">
              <strong>The First &amp; The Iconic Twin Towers Development In Chandigarh TRI-CITY Region.</strong>
            </p>
            <p className="about-text">
              Marbella Twin Towers stands tall in the heart of New Chandigarh, a striking symbol of architectural brilliance and modern luxury living. This iconic high-rise offers an exclusive collection of 5 BHK residences (4 BHK + Multipurpose Room + Store + Pooja Room), meticulously designed with premium specifications to set new benchmarks in opulence.
            </p>
            <div className="about-features">
              <div className="feature-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                <span>Luxury Living</span>
              </div>
              <div className="feature-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <span>24/7 Security</span>
              </div>
              <div className="feature-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                <span>Premium Quality</span>
              </div>
            </div>
            <a href="#contact" className="btn btn-primary">Schedule a Visit</a>
          </div>
        </div>
      </div>
    </section>
  );
}
