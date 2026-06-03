'use client';
import { useState, type ReactNode } from 'react';

type Panel = { id: string; label: string; content: ReactNode };

export function FloorPlanTabs({ panels }: { panels: Panel[] }) {
  const [activeId, setActiveId] = useState(panels[0]?.id);
  return (
    <>
      <div className="floor-plan-tabs">
        {panels.map((p) => (
          <button
            key={p.id}
            className={`tab-btn ${p.id === activeId ? 'active' : ''}`}
            onClick={() => setActiveId(p.id)}
            data-tab={p.id}
          >
            {p.label}
          </button>
        ))}
      </div>
      {panels.map((p) => (
        <div key={p.id} className={`tab-content ${p.id === activeId ? '' : 'hidden'}`} id={p.id}>
          {p.content}
        </div>
      ))}
    </>
  );
}
