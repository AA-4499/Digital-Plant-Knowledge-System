import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import { PlantSpecies } from '../../types';

interface PlantCardProps {
  species: PlantSpecies;
}

export const PlantCard: React.FC<PlantCardProps> = ({ species }) => {
  const primaryPhoto = species.photos.find((p) => p.isPrimary) || species.photos[0];

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Critically Endangered':
        return { bg: 'var(--badge-cr-bg)', text: 'var(--badge-cr-text)', border: 'var(--badge-cr-border)' };
      case 'Endangered':
        return { bg: 'var(--badge-en-bg)', text: 'var(--badge-en-text)', border: 'var(--badge-en-border)' };
      case 'Vulnerable':
        return { bg: 'var(--badge-vu-bg)', text: 'var(--badge-vu-text)', border: 'var(--badge-vu-border)' };
      case 'Near Threatened':
        return { bg: 'var(--badge-nt-bg)', text: 'var(--badge-nt-text)', border: 'var(--badge-nt-border)' };
      default:
        return { bg: 'var(--badge-lc-bg)', text: 'var(--badge-lc-text)', border: 'var(--badge-lc-border)' };
    }
  };

  const badgeStyle = getStatusBadgeStyle(species.conservationStatus);

  return (
    <article style={{
      background: 'var(--bg-surface)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
    }} className="plant-card">
      {/* Specimen Photo Thumbnail */}
      <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden', background: '#E2E8DF' }}>
        <img
          src={primaryPhoto?.url}
          alt={species.scientificName}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* IUCN Conservation Status Badge */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          padding: '0.25rem 0.65rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontWeight: 700,
          background: badgeStyle.bg,
          color: badgeStyle.text,
          border: `1px solid ${badgeStyle.border}`,
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          {species.iucnCode} • {species.conservationStatus}
        </div>

        {/* Habitat Zone Tag */}
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '0.75rem',
          padding: '0.25rem 0.6rem',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.72rem',
          fontWeight: 600,
          background: 'rgba(13, 31, 20, 0.75)',
          backdropFilter: 'blur(8px)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          <MapPin size={12} color="var(--color-emerald-light)" />
          <span>{species.niahZone}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--color-moss)'
          }}>
            {species.family}
          </span>
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--color-forest)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem'
          }}>
            <ShieldCheck size={13} color="var(--color-emerald)" />
            {species.sarawakProtectionStatus}
          </span>
        </div>

        <h3 style={{
          fontSize: '1.2rem',
          fontWeight: 700,
          fontStyle: 'italic',
          color: 'var(--color-forest-dark)',
          lineHeight: 1.3,
          marginBottom: '0.2rem'
        }}>
          {species.scientificName}
        </h3>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          {species.commonName} {species.localNames.length > 0 && `• ${species.localNames[0]}`}
        </p>

        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          marginBottom: '1.25rem',
          flex: 1
        }}>
          {species.description.slice(0, 100)}...
        </p>

        <Link
          href={`/species/${species.id}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--color-emerald)',
            transition: 'color var(--transition-fast)'
          }}
        >
          <span>View Full Botanical Dossier</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <style jsx>{`
        .plant-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
        }
      `}</style>
    </article>
  );
};
