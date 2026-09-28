'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sprout, Plus, Search, Trash2, Edit2, ExternalLink, ShieldCheck } from 'lucide-react';
import { plantApiService } from '../../../services/api';
import { PlantSpecies } from '../../../types';

export default function AdminPlantsPage() {
  const [speciesList, setSpeciesList] = useState<PlantSpecies[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpecies();
  }, []);

  const loadSpecies = async () => {
    setLoading(true);
    const data = await plantApiService.getSpeciesList();
    setSpeciesList(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the active database?`)) {
      await plantApiService.deleteSpecies(id);
      loadSpecies();
    }
  };

  const filtered = speciesList.filter(
    (s) =>
      s.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.family.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-forest-dark)', marginBottom: '0.25rem' }}>
            Botanical Species Registry (CRUD)
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Authoritative taxonomic database for Niah National Park flora (Item 14 & 17)
          </p>
        </div>

        <button
          onClick={() => alert('New species modal / form is ready for field entry.')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #1A3826 0%, #2E7D47 100%)',
            color: '#FFFFFF',
            fontSize: '0.875rem',
            fontWeight: 600,
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Plus size={16} />
          <span>Register New Species</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        padding: '0.6rem 1rem',
        border: '1px solid var(--border-subtle)',
        marginBottom: '1.5rem',
        maxWidth: '480px'
      }}>
        <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.6rem' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter catalog records..."
          style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent', fontSize: '0.9rem' }}
        />
      </div>

      {/* Species Table */}
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
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Scientific Name & Family</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Common Name</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>IUCN Status</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Sarawak Protection</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Niah Zone</th>
                <th style={{ padding: '0.85rem 1rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Loading botanical database records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No matching plant records found.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <img
                        src={s.photos[0]?.url}
                        alt={s.scientificName}
                        style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <strong style={{ fontStyle: 'italic', display: 'block', color: 'var(--color-forest-dark)' }}>
                        {s.scientificName}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.family}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span>{s.commonName}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: s.conservationStatus === 'Critically Endangered' ? 'var(--badge-cr-bg)' :
                          s.conservationStatus === 'Endangered' ? 'var(--badge-en-bg)' : 'var(--badge-vu-bg)',
                        color: s.conservationStatus === 'Critically Endangered' ? 'var(--badge-cr-text)' :
                          s.conservationStatus === 'Endangered' ? 'var(--badge-en-text)' : 'var(--badge-vu-text)',
                      }}>
                        {s.conservationStatus}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.8rem',
                        color: 'var(--color-forest)'
                      }}>
                        <ShieldCheck size={14} color="var(--color-emerald)" />
                        <span>{s.sarawakProtectionStatus}</span>
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {s.niahZone}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <Link
                          href={`/species/${s.id}`}
                          target="_blank"
                          title="View Public Dossier"
                          style={{
                            padding: '0.4rem',
                            color: 'var(--color-emerald)',
                            background: 'var(--bg-secondary)',
                            borderRadius: '6px'
                          }}
                        >
                          <ExternalLink size={15} />
                        </Link>
                        <button
                          onClick={() => alert(`Edit record for ${s.scientificName}`)}
                          title="Edit Species Record"
                          style={{
                            padding: '0.4rem',
                            color: 'var(--color-forest)',
                            background: 'var(--bg-secondary)',
                            borderRadius: '6px'
                          }}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id, s.scientificName)}
                          title="Delete Record"
                          style={{
                            padding: '0.4rem',
                            color: '#C62828',
                            background: '#FFEBEE',
                            borderRadius: '6px'
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
