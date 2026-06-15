import { SectionLabel } from '@/components/ui/SectionLabel';
import { Icon } from '@/components/ui/Icon';

const features = [
  { icon: 'home' as const, label: 'Luxury Living' },
  { icon: 'shield' as const, label: '24/7 Security' },
  { icon: 'award' as const, label: 'Premium Quality' },
];

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
              Marbella Twin Towers is a premier luxury high-rise residential project located in New
              Chandigarh, Mullanpur. Positioned at the very edge of Chandigarh, just 0 km away, it
              offers an exclusive and desirable living experience. With direct access from the Madhya
              Marg road extension, Marbella Twin Towers stands as the first prestigious address of
              New Chandigarh.
            </p>
            <p className="about-text">
              <strong>The First &amp; The Iconic Twin Towers Development In Chandigarh TRI-CITY
                Region.</strong>
            </p>
            <p className="about-text">
              Marbella Twin Towers stands tall in the heart of New Chandigarh, a striking symbol of
              architectural brilliance and modern luxury living. This iconic high-rise offers an
              exclusive collection of 5 BHK residences (4 BHK + Multipurpose Room + Store + Pooja
              Room), meticulously designed with premium specifications to set new benchmarks in
              opulence.
            </p>
            <div className="about-features">
              {features.map((feature) => (
                <div className="feature-item" key={feature.label}>
                  <Icon name={feature.icon} size={24} aria-hidden />
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn btn-primary">Schedule a Visit</a>
          </div>
        </div>
      </div>
    </section>
  );
}
