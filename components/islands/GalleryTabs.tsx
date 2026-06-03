'use client';
import { useState, type ReactNode } from 'react';

type Panel = { id: string; label: string; icon?: ReactNode; content: ReactNode };

export function GalleryTabs({ panels }: { panels: Panel[] }) {
  const [activeId, setActiveId] = useState(panels[0]?.id);
  return (
    <>
      <div className="gallery-tabs">
        {panels.map((p) => (
          <button
            key={p.id}
            className={`gallery-tab ${p.id === activeId ? 'active' : ''}`}
            onClick={() => setActiveId(p.id)}
            data-filter={p.id}
          >
            {p.icon}
            {p.label}
          </button>
        ))}
      </div>
      {panels.map((p) => (
        <div
          key={p.id}
          className={`gallery-panel ${p.id === activeId ? 'active' : ''}`}
          id={`gallery-${p.id}`}
        >
          {p.content}
        </div>
      ))}
    </>
  );
}
