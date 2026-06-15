import { SectionLabel } from '@/components/ui/SectionLabel';
import { GalleryTabs } from '@/components/islands/GalleryTabs';
import { GalleryLightbox } from '@/components/islands/GalleryLightbox';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';

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
              icon: <Icon name="image" size={16} aria-hidden />,
              content: (
                <GalleryLightbox images={galleryImages}>
                  <div className="premium-gallery">
                    {galleryImages.map((img) => (
                      <div className={`pg-item ${img.layout}`.trim()} key={img.src}>
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 992px) 33vw, 25vw"
                          className="pg-img"
                          loading="lazy"
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
              icon: <Icon name="play" size={16} aria-hidden />,
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
