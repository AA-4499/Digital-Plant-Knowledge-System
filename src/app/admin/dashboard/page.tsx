'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Sprout,
  ShieldAlert,
  Clock,
  Activity,
  ArrowRight,
  Plus,
  CheckCircle,
  Eye,
  AlertTriangle,
  MapPin
} from 'lucide-react';
import { plantApiService } from '../../../services/api';
import { Observation } from '../../../types';
import { DEMO_IOT_NODES } from '../../../services/mockData';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    totalSpecies: 0,
    endangeredCount: 0,
    pendingObservations: 0,
    activeSensors: 0,
  });
  const [pendingList, setPendingList] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [m, obs] = await Promise.all([
          plantApiService.getDashboardMetrics(),
          plantApiService.getObservations('pending'),
        ]);
        setMetrics(m);
        setPendingList(obs);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const threatAlerts = DEMO_IOT_NODES.filter((n) => n.status === 'threat_triggered');

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
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
            Conservation Operations Command
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Real-time biodiversity documentation and ecological monitoring for Niah National Park
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link
            href="/admin/plants"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #1A3826 0%, #2E7D47 100%)',
              color: '#FFFFFF',
              fontSize: '0.875rem',
              fontWeight: 600,
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Plus size={16} />
            <span>Add New Species</span>
          </Link>
        </div>
      </div>

      {/* Urgent IoT Threat Alert Banner (if triggered) */}
      {threatAlerts.length > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          background: '#FFEBEE',
          border: '1px solid #FFCDD2',
          marginBottom: '2rem',
          color: '#B71C1C'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#EF5350',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>
                Urgent Environmental Threat Detected ({threatAlerts[0].nodeId})
              </strong>
              <span style={{ fontSize: '0.85rem' }}>
                {threatAlerts[0].threatDetails} in {threatAlerts[0].zone}
              </span>
            </div>
          </div>

          <Link
            href="/admin/iot"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.4rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              background: '#B71C1C',
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            <span>Investigate Sensor</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* 4 Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem'
      }}>
        {/* Metric 1: Total Species */}
        <div style={{
          background: 'var(--bg-surface)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Cataloged Species</span>
            <div style={{ color: 'var(--color-emerald)', background: 'var(--bg-secondary)', padding: '0.4rem', borderRadius: '8px' }}>
              <Sprout size={20} />
            </div>
          </div>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-forest-dark)', display: 'block' }}>
            {loading ? '...' : metrics.totalSpecies}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-emerald)', fontWeight: 500 }}>
            Active botanical database
          </span>
        </div>

        {/* Metric 2: Endangered Species */}
        <div style={{
          background: 'var(--bg-surface)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Threatened Flora</span>
            <div style={{ color: '#E65100', background: '#FFF3E0', padding: '0.4rem', borderRadius: '8px' }}>
              <ShieldAlert size={20} />
            </div>
          </div>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-forest-dark)', display: 'block' }}>
            {loading ? '...' : metrics.endangeredCount}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#E65100', fontWeight: 500 }}>
            Protected under Wildlife Ordinance
          </span>
        </div>

        {/* Metric 3: Pending Submissions */}
        <div style={{
          background: 'var(--bg-surface)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Pending Field Audits</span>
            <div style={{ color: '#1565C0', background: '#E3F2FD', padding: '0.4rem', borderRadius: '8px' }}>
              <Clock size={20} />
            </div>
          </div>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-forest-dark)', display: 'block' }}>
            {loading ? '...' : metrics.pendingObservations}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#1565C0', fontWeight: 500 }}>
            Awaiting officer verification
          </span>
        </div>

        {/* Metric 4: IoT Nodes */}
        <div style={{
          background: 'var(--bg-surface)',
          padding: '1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Online IoT Nodes</span>
            <div style={{ color: 'var(--color-forest)', background: 'var(--bg-secondary)', padding: '0.4rem', borderRadius: '8px' }}>
              <Activity size={20} />
            </div>
          </div>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-forest-dark)', display: 'block' }}>
            {loading ? '...' : metrics.activeSensors}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-emerald)', fontWeight: 500 }}>
            Environmental telemetry active
          </span>
        </div>
      </div>

      {/* Pending Submissions Queue Preview */}
      <section style={{
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-sm)',
        padding: '1.75rem',
        marginBottom: '2.5rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.25rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-forest-dark)' }}>
              Field Ground-Truthing Submissions Requiring Review
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Synchronized from botanists' offline mobile apps in Niah forest sectors
            </p>
          </div>

          <Link
            href="/admin/review"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--color-emerald)'
            }}
          >
            <span>Open Review Workbench</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {pendingList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            <CheckCircle size={32} color="var(--color-emerald)" style={{ margin: '0 auto 0.5rem auto' }} />
            <p>All field submissions have been reviewed and approved!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Specimen Photo</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Proposed Taxonomy</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Botanist</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>GPS Accuracy</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Timestamp</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 600, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingList.map((obs) => (
                  <tr key={obs.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <img
                        src={obs.photoUrl}
                        alt={obs.suggestedScientificName}
                        style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <strong style={{ fontStyle: 'italic', display: 'block', color: 'var(--color-forest-dark)' }}>
                        {obs.suggestedScientificName}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{obs.suggestedFamily}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span>{obs.botanistName}</span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.8rem',
                        color: 'var(--color-forest)'
                      }}>
                        <MapPin size={13} color="var(--color-emerald)" />
                        <span>±{obs.gpsLocation.accuracyMeters}m</span>
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {new Date(obs.submittedAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <Link
                        href="/admin/review"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.4rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          background: 'var(--bg-secondary)',
                          color: 'var(--color-forest)',
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}
                      >
                        <Eye size={14} />
                        <span>Audit Record</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
