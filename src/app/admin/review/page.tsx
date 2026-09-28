'use client';

import React, { useState, useEffect } from 'react';
import { CheckSquare, Check, X, AlertCircle, MapPin, Sparkles, User, Calendar } from 'lucide-react';
import { plantApiService } from '../../../services/api';
import { Observation } from '../../../types';

export default function AdminReviewPage() {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [selectedObs, setSelectedObs] = useState<Observation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadObs();
  }, []);

  const loadObs = async () => {
    setLoading(true);
    const data = await plantApiService.getObservations();
    setObservations(data);
    if (data.length > 0) setSelectedObs(data[0]);
    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    await plantApiService.updateObservationStatus(id, 'approved');
    alert('Observation approved! Record is now verified and published to public catalog and QR tag.');
    loadObs();
  };

  const handleReject = async (id: string) => {
    await plantApiService.updateObservationStatus(id, 'rejected');
    alert('Observation marked as rejected.');
    loadObs();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-forest-dark)', marginBottom: '0.25rem' }}>
          Observation Audit Workbench (Item 19)
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Review ground-truthed plant observations synced from botanists' mobile field apps
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 380px) 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Left List Panel */}
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-forest)' }}>
              Submissions Queue ({observations.length})
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {observations.map((obs) => {
              const isSelected = selectedObs?.id === obs.id;
              return (
                <div
                  key={obs.id}
                  onClick={() => setSelectedObs(obs)}
                  style={{
                    padding: '1rem 1.25rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(46, 125, 71, 0.08)' : 'transparent',
                    borderLeft: isSelected ? '4px solid var(--color-emerald)' : '4px solid transparent',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'center',
                    transition: 'background 0.15s ease'
                  }}
                >
                  <img
                    src={obs.photoUrl}
                    alt={obs.suggestedScientificName}
                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontStyle: 'italic', display: 'block', fontSize: '0.9rem', color: 'var(--color-forest-dark)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {obs.suggestedScientificName}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                      By {obs.botanistName}
                    </span>
                    <span style={{
                      display: 'inline-block',
                      marginTop: '0.25rem',
                      padding: '0.1rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      background: obs.status === 'pending' ? '#FFF3E0' : obs.status === 'approved' ? '#E8F5E9' : '#FFEBEE',
                      color: obs.status === 'pending' ? '#E65100' : obs.status === 'approved' ? '#1B5E20' : '#C62828'
                    }}>
                      {obs.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Inspection Panel */}
        {selectedObs ? (
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-moss)', textTransform: 'uppercase' }}>
                  Specimen ID: {selectedObs.id}
                </span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontStyle: 'italic', color: 'var(--color-forest-dark)' }}>
                  {selectedObs.suggestedScientificName}
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => handleReject(selectedObs.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #FFCDD2',
                    background: '#FFEBEE',
                    color: '#C62828',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  <X size={16} />
                  <span>Reject</span>
                </button>

                <button
                  onClick={() => handleApprove(selectedObs.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, #1A3826 0%, #2E7D47 100%)',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <Check size={16} />
                  <span>Approve & Publish</span>
                </button>
              </div>
            </div>

            {/* Specimen Photo Preview */}
            <div style={{ height: '280px', width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <img
                src={selectedObs.photoUrl}
                alt={selectedObs.suggestedScientificName}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Observation Metadata Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Field Botanist
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <User size={15} color="var(--color-emerald)" />
                  {selectedObs.botanistName}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Field GPS Coordinate
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <MapPin size={15} color="var(--color-emerald)" />
                  {selectedObs.gpsLocation.lat.toFixed(5)}, {selectedObs.gpsLocation.lng.toFixed(5)} (±{selectedObs.gpsLocation.accuracyMeters}m)
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                  Sync Timestamp
                </span>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={15} color="var(--color-emerald)" />
                  {new Date(selectedObs.submittedAt).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Botanist Field Notes */}
            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-moss)', display: 'block', marginBottom: '0.4rem' }}>
                Field Notes from Mobile App
              </span>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {selectedObs.notes}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Select an observation from the queue to audit
          </div>
        )}
      </div>
    </div>
  );
}
