'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Search, Shield, Menu, X, LogIn, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Species Catalog', href: '/species' },
    { label: 'Niah Flora Highlights', href: '/#highlights' },
    { label: 'About Project', href: '/#about' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-glass)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'var(--nav-height)'
      }}>
        {/* Brand / Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1A3826 0%, #2E7D47 100%)',
            color: '#FFFFFF',
            boxShadow: '0 4px 10px rgba(46, 125, 71, 0.25)'
          }}>
            <Leaf size={22} />
          </div>
          <div>
            <span style={{
              display: 'block',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--color-forest-dark)',
              lineHeight: 1.2
            }}>
              DPKS Niah
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.02em'
            }}>
              Sarawak Forestry Corporation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          gap: '2rem',
          alignItems: 'center'
        }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--color-emerald)' : 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)'
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            href="/species"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 0.9rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-secondary)',
              color: 'var(--color-forest)',
              fontWeight: 500
            }}
          >
            <Search size={15} />
            <span style={{ display: 'none' }} className="search-label">Quick Search</span>
          </Link>

          {isAuthenticated ? (
            <Link
              href="/admin/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1.1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #1A3826 0%, #2E7D47 100%)',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 4px 10px rgba(46, 125, 71, 0.25)'
              }}
            >
              <LayoutDashboard size={16} />
              <span>Officer Portal</span>
            </Link>
          ) : (
            <Link
              href="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--color-forest)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-surface)'
              }}
            >
              <Shield size={15} />
              <span>Officer Login</span>
            </Link>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              color: 'var(--text-primary)'
            }}
            aria-label="Toggle menu"
            className="mobile-hamburger"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-glass)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                padding: '0.5rem 0'
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ height: '1px', background: 'var(--border-subtle)' }} />
          {isAuthenticated ? (
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-emerald)',
                fontWeight: 600
              }}
            >
              <LayoutDashboard size={18} />
              <span>Go to Command Center</span>
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--color-forest)',
                fontWeight: 600
              }}
            >
              <LogIn size={18} />
              <span>Officer Sign In</span>
            </Link>
          )}
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .search-label {
            display: inline !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
