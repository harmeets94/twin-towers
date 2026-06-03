import { SectionLabel } from '@/components/ui/SectionLabel';
import { GalleryTabs } from '@/components/islands/GalleryTabs';
import { GalleryLightbox } from '@/components/islands/GalleryLightbox';

const galleryImages = [
  { src: '/gallery-01.jpg', alt: 'Marbella View 1', layout: 'pg-tall' },
  { src: '/gallery-02.jpg', alt: 'Marbella View 2', layout: '' },
  { src: '/gallery-03.jpg', alt: 'Marbella View 3', layout: '' },
  { src: '/gallery-04.jpg', alt: 'Marbella View 4', layout: 'pg-wide' },
  { src: '/gallery-05.jpg', alt: 'Marbella View 5', layout: 'pg-tall' },
  { src: '/gallery-06.jpg', alt: 'Marbella View 6', layout: '' },
  { src: '/gallery-07.jpg', alt: 'Marbella View 7', layout: '' },
  { src: '/gallery-08.jpg', alt: 'Marbella View 8', layout: 'pg-wide' },
  { src: '/gallery-09.jpg', alt: 'Marbella View 9', layout: '' },
  { src: '/gallery-10.jpg', alt: 'Marbella View 10', layout: 'pg-tall' },
  { src: '/gallery-11.jpg', alt: 'Marbella View 11', layout: '' },
  { src: '/gallery-12.jpg', alt: 'Marbella View 12', layout: '' },
];

const videos = [
  { id: 'xyivXjYBRzA', label: 'Marbella Twin Towers — Video 1' },
  { id: 'NXAm5WsfWX4', label: 'Marbella Twin Towers — Video 2' },
  { id: 'Q4pJ4bKwYOo', label: 'Marbella Twin Towers — Video 3' },
  { id: 'w1eXlrbjw4w', label: 'Marbella Twin Towers — Video 4' },
];

export function Gallery() {
  return (
    <section className="gallery section-padding" id="gallery">
      <div className="container">
        <div className="section-header text-center">
          <SectionLabel>Gallery</SectionLabel>
          <h2 className="section-title">Experience Marbella Twin Towers</h2>
          <p className="section-subtitle">A Visual Journey of Luxury</p>
        </div>
        <GalleryTabs
          panels={[
            {
              id: 'images',
              label: 'Images',
              icon: (
                <svg key="img-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              ),
              content: (
                <GalleryLightbox images={galleryImages}>
                  <div className="premium-gallery">
                    {galleryImages.map((img) => (
                      <div className={`pg-item ${img.layout}`.trim()} key={img.src}>
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          decoding="async"
                          width="600"
                          height="400"
                        />
                        <div className="pg-overlay"><span>View</span></div>
                      </div>
                    ))}
                  </div>
                </GalleryLightbox>
              ),
            },
            {
              id: 'videos',
              label: 'Videos',
              icon: (
                <svg key="vid-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
              ),
              content: (
                <div className="premium-videos">
                  {videos.map((v) => (
                    <div className="pv-item" key={v.id}>
                      <iframe
                        src={`https://www.youtube.com/embed/${v.id}`}
                        title={v.label}
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      />
                      <div className="pv-label">{v.label}</div>
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>
    </section>
  );
}
