import { StatsCounter } from '@/components/islands/StatsCounter';

const stats = [
  { target: 4.36, label: 'Acres Total Area' },
  { target: 33, label: 'Floors Tallest Tower' },
  { target: 50000, label: 'Sq. Ft. Clubhouse' },
  { target: 264, label: 'Super Luxury Residences' },
];

export function Stats() {
  return (
    <section className="statistics">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat-item" key={s.label}>
              <StatsCounter target={s.target} />
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
