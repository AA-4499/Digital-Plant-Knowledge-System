'use client';

import React from 'react';
import { Activity, AlertTriangle, Battery, Wifi, Thermometer, Droplets } from 'lucide-react';
import { DEMO_IOT_NODES } from '../../../services/mockData';

export default function AdminIoTPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-forest-dark)', marginBottom: '0.25rem' }}>
          IoT Environmental & Threat Telemetry (Deliverable D6 / Items 30-32)
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Real-time sensor feeds deployed across Niah National Park forest sectors
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {DEMO_IOT_NODES.map((node) => (
          <div
            key={node.nodeId}
            style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: node.status === 'threat_triggered' ? '2px solid #EF5350' : '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
              padding: '1.5rem',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <strong style={{ fontSize: '1rem', color: 'var(--color-forest-dark)', display: 'block' }}>
                  {node.name}
                </strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{node.nodeId} • {node.zone}</span>
              </div>

              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                background: node.status === 'online' ? '#E8F5E9' : node.status === 'warning' ? '#FFF3E0' : '#FFEBEE',
                color: node.status === 'online' ? '#1B5E20' : node.status === 'warning' ? '#E65100' : '#C62828'
              }}>
                {node.status.toUpperCase()}
              </span>
            </div>

            {node.threatDetails && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                background: '#FFEBEE',
                color: '#B71C1C',
                fontSize: '0.8rem',
                marginBottom: '1rem'
              }}>
                <AlertTriangle size={16} />
                <span>{node.threatDetails}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Thermometer size={14} color="var(--color-emerald)" />
                  Temperature
                </span>
                <strong style={{ fontSize: '1.25rem', color: 'var(--color-forest)' }}>{node.temperatureC}°C</strong>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Droplets size={14} color="var(--color-emerald)" />
                  Humidity
                </span>
                <strong style={{ fontSize: '1.25rem', color: 'var(--color-forest)' }}>{node.humidityPercent}%</strong>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1.25rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Battery size={14} />
                Battery: {node.batteryPercent}%
              </span>
              <span>Updated: {node.lastHeartbeat}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
