'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Leaf, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { UserRole } from '../../../types';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchDemoRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your officer email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      router.push('/admin/dashboard');
    } catch {
      setError('Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    switchDemoRole(role);
    if (role === 'conservation_officer' || role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/species');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      background: 'linear-gradient(135deg, #0D1F14 0%, #1A3826 60%, #254F37 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Circles */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(46, 125, 71, 0.25) 0%, rgba(13, 31, 20, 0) 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #1A3826 0%, #2E7D47 100%)',
            color: '#FFFFFF',
            marginBottom: '1rem',
            boxShadow: '0 8px 20px rgba(46, 125, 71, 0.3)'
          }}>
            <ShieldCheck size={28} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-forest-dark)', marginBottom: '0.25rem' }}>
            Officer Command Portal
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Sarawak Forestry Corporation — Niah National Park
          </p>
        </div>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: '#FEECEB',
            color: '#B71C1C',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            fontSize: '0.875rem'
          }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Officer Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. officer@sfc.gov.my"
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-primary)',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Security Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-primary)',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.85rem',
              background: 'linear-gradient(135deg, #1A3826 0%, #2E7D47 100%)',
              color: '#FFFFFF',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 4px 12px rgba(46, 125, 71, 0.25)',
              marginTop: '0.5rem',
              transition: 'opacity 0.2s ease',
              opacity: loading ? 0.7 : 1
            }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Command Center'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick Demo Role Shortcuts */}
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.75rem', textAlign: 'center' }}>
            Quick Assessment Demo Access
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => handleQuickLogin('conservation_officer')}
              style={{
                padding: '0.6rem 0.75rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--color-forest)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                justifyContent: 'center'
              }}
            >
              <UserCheck size={14} />
              <span>Officer Angel</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              style={{
                padding: '0.6rem 0.75rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--color-forest)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                justifyContent: 'center'
              }}
            >
              <ShieldCheck size={14} />
              <span>Admin Dr. Lee</span>
            </button>
          </div>
        </div>

        {/* Return to Public Portal */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link
            href="/species"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.875rem',
              color: 'var(--color-emerald)',
              fontWeight: 500
            }}
          >
            <Leaf size={16} />
            <span>Return to Public Plant Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
