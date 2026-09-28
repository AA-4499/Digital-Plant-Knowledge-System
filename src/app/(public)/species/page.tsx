'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, LayoutGrid, Table as TableIcon, Filter, X, RefreshCw, Sprout } from 'lucide-react';
import { plantApiService } from '../../../services/api';
import { PlantSpecies, ConservationStatus } from '../../../types';
import { PlantCard } from '../../../components/species/PlantCard';
import { PlantTable } from '../../../components/species/PlantTable';

function SpeciesCatalogContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const initialStatus = searchParams.get('status') || 'all';
  const initialFamily = searchParams.get('family') || 'all';

  const [speciesList, setSpeciesList] = useState<PlantSpecies[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedFamily, setSelectedFamily] = useState(initialFamily);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);

  const families = ['all', 'Dipterocarpaceae', 'Nepenthaceae', 'Rafflesiaceae', 'Lauraceae', 'Begoniaceae', 'Orchidaceae'];
  const statuses = ['all', 'Critically Endangered', 'Endangered', 'Vulnerable'];

  useEffect(() => {
    async function fetchFlora() {
      setLoading(true);
      const data = await plantApiService.getSpeciesList({
        query: searchQuery,
        family: selectedFamily,
        status: selectedStatus as ConservationStatus | 'all',
      });
      setSpeciesList(data);
      setLoading(false);
    }
    fetchFlora();
  }, [searchQuery, selectedFamily, selectedStatus]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFamily('all');
    setSelectedStatus('all');
  };

  const hasActiveFilters = searchQuery !== '' || selectedFamily !== 'all' || selectedStatus !== 'all';

  return (
    <div style={{ padding: '3rem 0 5rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header Breadcrumb & Title */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <span>Niah National Park</span>
            <span>/</span>
            <span style={{ color: 'var(--color-emerald)', fontWeight: 600 }}>Biodiversity Catalog</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-forest-dark)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Plant Species Explorer
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '750px' }}>
            Authoritative botanical records and morphological dossiers of Niah National Park flora, aligned with the Malaysia Biodiversity Information System (MyBIS) format.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-full)',
              padding: '0.5rem 1rem',
              border: '1px solid var(--border-subtle)',
              flex: '1 1 320px',
              maxWidth: '480px'
            }}>
              <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.6rem' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by scientific name, common alias, or family..."
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  background: 'transparent',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)'
                }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} style={{ color: 'var(--text-muted)' }}>
                  <X size={16} />
                </button>
              )}
            </div>

            {/* View Mode Toggle Button */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-secondary)',
              padding: '0.25rem',
              borderRadius: 'var(--radius-md)'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                title="Photo Cards Grid View"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  background: viewMode === 'grid' ? 'var(--bg-surface)' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--color-emerald)' : 'var(--text-secondary)',
                  boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <LayoutGrid size={15} />
                <span>Gallery</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                title="Taxonomic Table View"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  background: viewMode === 'table' ? 'var(--bg-surface)' : 'transparent',
                  color: viewMode === 'table' ? 'var(--color-emerald)' : 'var(--text-secondary)',
                  boxShadow: viewMode === 'table' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <TableIcon size={15} />
                <span>Table</span>
              </button>
            </div>
          </div>

          {/* Faceted Filter Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Taxonomic Family:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {families.map((fam) => (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: selectedFamily === fam ? 'var(--color-emerald)' : 'var(--border-subtle)',
                    background: selectedFamily === fam ? 'var(--color-emerald)' : 'var(--bg-primary)',
                    color: selectedFamily === fam ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {fam === 'all' ? 'All Families' : fam}
                </button>
              ))}
            </div>

            <div style={{ height: '16px', width: '1px', background: 'var(--border-subtle)', margin: '0 0.5rem' }} />

            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              IUCN Status:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {statuses.map((stat) => (
                <button
                  key={stat}
                  onClick={() => setSelectedStatus(stat)}
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: selectedStatus === stat ? 'var(--color-forest)' : 'var(--border-subtle)',
                    background: selectedStatus === stat ? 'var(--color-forest)' : 'var(--bg-primary)',
                    color: selectedStatus === stat ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {stat === 'all' ? 'All Categories' : stat}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.75rem',
                  color: '#C62828',
                  marginLeft: 'auto',
                  fontWeight: 600
                }}
              >
                <RefreshCw size={12} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Showing <strong style={{ color: 'var(--color-forest-dark)' }}>{speciesList.length}</strong> documented plant species in Niah National Park
          </p>
        </div>

        {/* Catalog Body */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--border-subtle)',
              borderTopColor: 'var(--color-emerald)',
              borderRadius: '50%',
              margin: '0 auto 1rem auto',
              animation: 'spin 0.8s linear infinite'
            }} />
            <p>Filtering botanical specimens...</p>
            <style jsx>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : speciesList.length === 0 ? (
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: '4rem 2rem',
            textAlign: 'center'
          }}>
            <Sprout size={48} color="var(--color-moss-light)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-forest-dark)', marginBottom: '0.5rem' }}>
              No matching plant species found
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Try adjusting your search keywords or clearing the family / IUCN filters.
            </p>
            <button
              onClick={resetFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-emerald)',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <RefreshCw size={14} />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {speciesList.map((species) => (
              <PlantCard key={species.id} species={species} />
            ))}
          </div>
        ) : (
          <PlantTable speciesList={speciesList} />
        )}
      </div>
    </div>
  );
}

export default function SpeciesCatalogPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: '6rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>Loading Niah Biodiversity Catalog...</p>
      </div>
    }>
      <SpeciesCatalogContent />
    </Suspense>
  );
}

