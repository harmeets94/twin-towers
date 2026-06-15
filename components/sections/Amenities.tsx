import { SectionLabel } from '@/components/ui/SectionLabel';
import { Icon } from '@/components/ui/Icon';

const amenities = [
  {
    title: 'Pollution Free Environment',
    description: 'Breathe clean air in our meticulously planned green surroundings',
    icon: 'home' as const,
  },
  {
    title: '24/7 Power Backup',
    description: 'Uninterrupted electricity and water supply for hassle-free living',
    icon: 'zap' as const,
  },
  {
    title: 'Club House',
    description: 'Exclusive clubhouse with swimming pool, gym, and recreational facilities',
    icon: 'layers' as const,
  },
  {
    title: 'Gated & Secured Society',
    description: '24/7 CCTV surveillance and professional security personnel',
    icon: 'shield' as const,
  },
  {
    title: 'Kids Play Area',
    description: 'Safe and fun environment for children to play and grow',
    icon: 'award' as const,
  },
  {
    title: 'Parking Facility',
    description: 'Spacious covered parking for residents and visitors',
    icon: 'check' as const,
  },
];

export function Amenities() {
  return (
    <section className="amenities section-padding bg-light">
      <div className="container">
        <div className="section-header text-center">
          <SectionLabel>Amenities</SectionLabel>
          <h2 className="section-title">World-Class Facilities</h2>
          <p className="section-subtitle">Experience luxury at every corner</p>
        </div>
        <div className="amenities-grid">
          {amenities.map((a) => (
            <div className="amenity-card" key={a.title}>
              <div className="amenity-icon">
                <Icon name={a.icon} size={40} aria-hidden />
              </div>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
