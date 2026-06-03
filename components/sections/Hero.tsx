import { HeroCarousel } from '@/components/islands/HeroCarousel';

export function Hero() {
  return (
    <section className="hero" id="home">
      <HeroCarousel
        images={[
          { src: '/hero-1.jpg', alt: 'Marbella Twin Towers' },
          { src: '/hero-2.avif', alt: 'Marbella Twin Towers at night' },
          { src: '/hero-3.avif', alt: 'Marbella Twin Towers aerial' },
        ]}
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <p className="hero-label">Welcome to</p>
            <h1 className="hero-title">
              <span className="highlight">Modern</span> & <span className="highlight">Luxury</span>
            </h1>
            <p className="hero-subtitle">An Address of Eminence</p>
            <p className="hero-description">Premium 4+1/5 BHK Super Luxury Residences in New Chandigarh</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">Enquire Now</a>
              <a href="#about" className="btn btn-outline">Explore More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
