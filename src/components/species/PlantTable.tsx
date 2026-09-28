import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { PlantSpecies } from '../../types';

interface PlantTableProps {
  speciesList: PlantSpecies[];
}

export const PlantTable: React.FC<PlantTableProps> = ({ speciesList }) => {
  return (
    <div style={{
      background: 'var(--bg-surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden'
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Specimen</th>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Scientific Name</th>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Common / Local Alias</th>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Family</th>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>IUCN Status</th>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Growth Habit</th>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Niah Zone</th>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 600, textAlign: 'right' }}>Dossier</th>
            </tr>
          </thead>
          <tbody>
            {speciesList.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <img
                    src={s.photos?.[0]?.url || 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=300&q=80'}
                    alt={s.scientificName || 'Plant'}
                    style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <strong style={{ fontStyle: 'italic', display: 'block', color: 'var(--color-forest-dark)' }}>
                    {s.scientificName || 'Unknown Species'}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.author || ''}</span>
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span>{s.commonName || 'Specimen'}</span>
                </td>
                <td style={{ padding: '0.75rem 1rem', color: 'var(--color-moss)', fontWeight: 600 }}>
                  {s.family || 'Plantae'}
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{
                    padding: '0.2rem 0.55rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: s.conservationStatus === 'Critically Endangered' ? 'var(--badge-cr-bg)' :
                      s.conservationStatus === 'Endangered' ? 'var(--badge-en-bg)' : 'var(--badge-vu-bg)',
                    color: s.conservationStatus === 'Critically Endangered' ? 'var(--badge-cr-text)' :
                      s.conservationStatus === 'Endangered' ? 'var(--badge-en-text)' : 'var(--badge-vu-text)',
                  }}>
                    {s.iucnCode || 'LC'} • {s.conservationStatus || 'Least Concern'}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem' }}>
                  {s.growthHabit || 'Plant'}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {s.niahZone || 'Niah National Park'}
                </td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                  <Link
                    href={`/species/${s.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--color-emerald)',
                      padding: '0.35rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-secondary)'
                    }}
                  >
                    <span>View</span>
                    <ArrowRight size={13} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
