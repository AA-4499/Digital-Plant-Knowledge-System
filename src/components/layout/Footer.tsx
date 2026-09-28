import React from 'react';
import Link from 'next/link';
import { Leaf, Shield, ExternalLink, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      background: 'var(--color-forest-dark)',
      color: 'var(--color-limestone-light)',
      paddingTop: '4rem',
      paddingBottom: '2.5rem',
      marginTop: 'auto',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Column 1: Project Identity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--color-emerald)',
                color: '#FFFFFF'
              }}>
                <Leaf size={20} />
              </div>
              <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
                Digital Plant Knowledge System
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-limestone)' }}>
              Smart Ground-Truthing and Digital Biodiversity System for Plant Species Documentation in Niah National Park, Sarawak.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-emerald-light)' }}>
              <MapPin size={15} />
              <span>Niah National Park, Miri Division, Sarawak</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Flora Resources
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li>
                <Link href="/species" style={{ color: 'var(--color-limestone)', transition: 'color 0.2s' }}>
                  Complete Species Catalog
                </Link>
              </li>
              <li>
                <Link href="/species?status=Endangered" style={{ color: 'var(--color-limestone)', transition: 'color 0.2s' }}>
                  Threatened & Protected Flora
                </Link>
              </li>
              <li>
                <Link href="/species?family=Dipterocarpaceae" style={{ color: 'var(--color-limestone)', transition: 'color 0.2s' }}>
                  Dipterocarp Canopy Species
                </Link>
              </li>
              <li>
                <Link href="/login" style={{ color: 'var(--color-limestone)', transition: 'color 0.2s' }}>
                  Staff Command Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Collaboration Partners */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Project Partners
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-limestone)' }}>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Sarawak Forestry Corporation (SFC)</strong>
                <span style={{ fontSize: '0.8rem' }}>Client & Protected Area Authority</span>
              </div>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Swinburne University of Technology Sarawak</strong>
                <span style={{ fontSize: '0.8rem' }}>Academic & Research Partner (COS30049)</span>
              </div>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>NeuonAI</strong>
                <span style={{ fontSize: '0.8rem' }}>Commercialisation & AI Partner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <p>© 2026 Sarawak Forestry Corporation & Swinburne Sarawak. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Shield size={14} color="var(--color-emerald-light)" />
              <span>Anti-Poaching Sensitive Coordinate Masking Active</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
