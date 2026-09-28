'use client';

import React from 'react';
import { FileBarChart, Download, FileText, Calendar, Filter } from 'lucide-react';
import { INITIAL_SPECIES } from '../../../services/mockData';

export default function AdminReportsPage() {
  const handleDownloadCSV = () => {
    const headers = ['ID', 'Scientific Name', 'Common Name', 'Family', 'Conservation Status', 'Sarawak Status', 'Niah Zone'];
    const rows = INITIAL_SPECIES.map((s) => [
      s.id,
      `"${s.scientificName}"`,
      `"${s.commonName}"`,
      `"${s.family}"`,
      `"${s.conservationStatus}"`,
      `"${s.sarawakProtectionStatus}"`,
      `"${s.niahZone}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `niah_biodiversity_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-forest-dark)', marginBottom: '0.25rem' }}>
          Biodiversity Reports Generation & Export (Deliverable D2 / Item 21)
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Compile verified plant records and conservation status summaries for Sarawak Forestry Corporation
        </p>
      </div>

      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        padding: '2rem',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '2rem'
      }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-forest-dark)', marginBottom: '1rem' }}>
          Standard Biodiversity Export Packages
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <FileText size={28} color="var(--color-emerald)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-forest-dark)', marginBottom: '0.35rem' }}>
              Full Niah Taxonomic Registry (CSV)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              All documented plant species including taxonomy, morphology, and legal protection category.
            </p>
            <button
              onClick={handleDownloadCSV}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, #1A3826 0%, #2E7D47 100%)',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <Download size={15} />
              <span>Download CSV</span>
            </button>
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <FileBarChart size={28} color="var(--color-forest)" style={{ marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-forest-dark)', marginBottom: '0.35rem' }}>
              Protected Flora Executive Summary (PDF)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Executive PDF dossier formatted for state conservation meetings and management briefings.
            </p>
            <button
              onClick={() => window.print()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--color-forest)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <Download size={15} />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
