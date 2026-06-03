import { SectionLabel } from '@/components/ui/SectionLabel';

const points = [
  'Pollution free environment',
  '24*7 power backup & water supply',
  'Club House (swimming Pool, Gym)',
  'Gated and secured society with CCTV',
  'Kids play area',
];

export function WhyChoose() {
  return (
    <section className="why-choose section-padding">
      <div className="container">
        <div className="why-choose-grid">
          <div className="why-choose-content">
            <SectionLabel>Why Choose</SectionLabel>
            <h2 className="section-title">Marbella Twin Towers<br />Luxurious Highrise Apartments</h2>
            <ul className="why-choose-list">
              {points.map((p) => (
                <li key={p}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="why-choose-text">
              Marbella Twin Towers is designed to offer the perfect blend of comfort and luxury, complemented by breathtaking views of the city. Each 5 BHK residence is a masterpiece of elegance, thoughtfully crafted to redefine upscale living.
            </p>
            <a href="#contact" className="btn btn-primary">Book a Site Visit</a>
          </div>
          <div className="why-choose-image">
            <img
              src="/why-choose-interior.jpg"
              alt="Luxury Interior"
              loading="lazy"
              decoding="async"
              width="800"
              height="600"
            />
            <div className="image-overlay">
              <div className="overlay-content">
                <span className="number">4.36</span>
                <span className="label">Acres Total Area</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
