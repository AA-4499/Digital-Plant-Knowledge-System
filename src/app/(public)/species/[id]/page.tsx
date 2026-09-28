'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Leaf,
  Layers,
  Sparkles,
  AlertTriangle,
  QrCode,
  Info,
  Calendar
} from 'lucide-react';
import { plantApiService } from '../../../../services/api';
import { PlantSpecies } from '../../../../types';

export default function SpeciesDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [species, setSpecies] = useState<PlantSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    async function loadDetail() {
      if (!id) return;
      setLoading(true);
      const data = await plantApiService.getSpeciesById(id);
      setSpecies(data);
      setLoading(false);
    }
    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div className="spinner" style={{ margin: '0 auto 1rem auto' }} />
        <p>Loading botanical dossier from database...</p>
      </div>
    );
  }

  if (!species) {
    return (
      <div className="container" style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-forest-dark)', marginBottom: '1rem' }}>
          Specimen Record Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          The requested plant species could not be located in the Niah National Park registry.
        </p>
        <Link
          href="/species"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-emerald)',
            color: '#FFFFFF',
            fontWeight: 600
          }}
        >
          <ArrowLeft size={16} />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const activePhoto = (species.photos && species.photos.length > 0)
    ? (species.photos[selectedPhotoIndex] || species.photos[0])
    : { url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80', caption: 'Botanical specimen', credit: 'Sarawak Forestry' };

  return (
    <div style={{ padding: '2.5rem 0 5rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div style={{ marginBottom: '1.75rem' }}>
          <Link
            href="/species"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.875rem',
              color: 'var(--color-forest)',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Species Catalog</span>
          </Link>
        </div>

        {/* Hero Header Dossier */}
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.5rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-moss)' }}>
                  Family: {species.family}
                </span>
                <span style={{ color: 'var(--border-subtle)' }}>•</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Genus: {species.genus}
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(1.85rem, 4vw, 2.6rem)',
                fontWeight: 800,
                fontStyle: 'italic',
                color: 'var(--color-forest-dark)',
                lineHeight: 1.2,
                marginBottom: '0.35rem'
              }}>
                {species.scientificName} <span style={{ fontSize: '1rem', fontStyle: 'normal', color: 'var(--text-muted)' }}>{species.author}</span>
              </h1>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {species.commonName}
                </span>
                {Array.isArray(species.localNames) && species.localNames.length > 0 && (
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    (Local: {species.localNames.join(', ')})
                  </span>
                )}
              </div>
            </div>

            {/* Status Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              <div style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 700,
                background: species.conservationStatus === 'Critically Endangered' ? 'var(--badge-cr-bg)' :
                  species.conservationStatus === 'Endangered' ? 'var(--badge-en-bg)' : 'var(--badge-vu-bg)',
                color: species.conservationStatus === 'Critically Endangered' ? 'var(--badge-cr-text)' :
                  species.conservationStatus === 'Endangered' ? 'var(--badge-en-text)' : 'var(--badge-vu-text)',
                border: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <span>IUCN {species.iucnCode} — {species.conservationStatus}</span>
              </div>

              <div style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 700,
                background: 'var(--badge-prot-bg)',
                color: 'var(--badge-prot-text)',
                border: '1px solid var(--badge-prot-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <ShieldCheck size={16} />
                <span>Sarawak: {species.sarawakProtectionStatus}</span>
              </div>
            </div>
          </div>

          {/* Quick Attribute Badges */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.25rem'
          }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                Growth Habit
              </span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-forest-dark)' }}>{species.growthHabit}</strong>
            </div>

            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                Height / Dimension
              </span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-forest-dark)' }}>{species.heightRange}</strong>
            </div>

            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                Niah Park Zone
              </span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-forest-dark)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={14} color="var(--color-emerald)" />
                {species.niahZone}
              </strong>
            </div>

            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                Physical QR Tag Ref
              </span>
              <code style={{ fontSize: '0.85rem', color: 'var(--color-forest)', background: 'var(--bg-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                {species.qrUuid}
              </code>
            </div>
          </div>
        </div>

        {/* 2-Column Main Dossier: Photo Gallery + Botanical Specs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 480px) 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
          {/* Left Column: Photo Gallery */}
          <div>
            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '1rem'
            }}>
              <div style={{ height: '360px', width: '100%', position: 'relative' }}>
                <img
                  src={activePhoto.url}
                  alt={species.scientificName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '0.85rem 1rem', background: 'var(--bg-secondary)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <span>{activePhoto.caption}</span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Photo Credit: {activePhoto.credit}
                </span>
              </div>
            </div>

            {/* Thumbnail switcher (if multiple photos) */}
            {species.photos && species.photos.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {species.photos.map((p, idx) => (
                  <button
                    key={p.url}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: selectedPhotoIndex === idx ? '2px solid var(--color-emerald)' : '2px solid transparent',
                      padding: 0
                    }}
                  >
                    <img src={p.url} alt={p.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: In-depth Morphology & Ecology */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Description Card */}
            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-forest-dark)', marginBottom: '0.75rem' }}>
                Botanical Description
              </h2>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                {species.description}
              </p>
              <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-forest)', marginBottom: '0.25rem' }}>
                  Natural Habitat & Niah Ecology:
                </strong>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {species.habitat}
                </p>
              </div>
            </div>

            {/* Morphology Breakdown */}
            <div style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-forest-dark)', marginBottom: '1rem' }}>
                Morphological Characteristics
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-forest)', marginBottom: '0.25rem' }}>
                    Leaves & Foliage
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {species.morphology.leaves}
                  </span>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-forest)', marginBottom: '0.25rem' }}>
                    Bark & Stems
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {species.morphology.bark}
                  </span>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-forest)', marginBottom: '0.25rem' }}>
                    Flowers & Inflorescence
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {species.morphology.flowers}
                  </span>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <strong style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-forest)', marginBottom: '0.25rem' }}>
                    Fruit & Seed Dispersal
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {species.morphology.fruit}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anti-Poaching GPS Privacy Banner (Cybersecurity Aspect) */}
        <div style={{
          background: 'linear-gradient(135deg, #0D1F14 0%, #1A3826 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          color: '#FFFFFF',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-emerald-light)', marginBottom: '0.5rem' }}>
              <ShieldCheck size={20} />
              <strong style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Sarawak Wildlife Protection Ordinance Enforced
              </strong>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Anti-Poaching Sensitive Coordinate Masking
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-limestone)' }}>
              To prevent illegal harvesting and commercial poaching of endangered Sarawak biodiversity, high-precision GPS coordinates for <em>{species.scientificName}</em> are restricted. Public visitors are shown a generalized regional zone (~{species.coordinatesRough?.bufferKm ?? 4.0} km radius) within Niah National Park.
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            minWidth: '220px'
          }}>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-limestone)', marginBottom: '0.2rem' }}>
              Public Displayed Zone:
            </span>
            <strong style={{ display: 'block', fontSize: '1rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              {species.niahZone}
            </strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-emerald-light)' }}>
              Exact coordinates logged by SFC
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
