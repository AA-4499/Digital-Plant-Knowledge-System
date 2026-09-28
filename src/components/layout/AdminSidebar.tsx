'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Sprout,
  CheckSquare,
  Activity,
  FileBarChart,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Leaf,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, switchDemoRole } = useAuth();

  const navItems = [
    { label: 'Overview Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Species Catalog CRUD', href: '/admin/plants', icon: Sprout },
    { label: 'Review Field Queue', href: '/admin/review', icon: CheckSquare, badge: '2 Pending' },
    { label: 'IoT Threat Telemetry', href: '/admin/iot', icon: Activity, badgeAlert: true },
    { label: 'Biodiversity Reports', href: '/admin/reports', icon: FileBarChart },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      background: 'var(--color-forest-dark)',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      height: '100vh',
      flexShrink: 0
    }}>
      {/* Top Brand Header */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'var(--color-emerald)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          flexShrink: 0
        }}>
          <Leaf size={20} />
        </div>
        <div>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, display: 'block', lineHeight: 1.2 }}>
            SFC Command
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-limestone)', display: 'block' }}>
            Niah National Park
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.7rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#FFFFFF' : 'var(--color-limestone)',
                background: isActive ? 'var(--color-forest-light)' : 'transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon size={18} color={isActive ? 'var(--color-emerald-light)' : 'currentColor'} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(230, 81, 0, 0.25)',
                  color: '#FFB74D',
                  fontWeight: 600
                }}>
                  {item.badge}
                </span>
              )}

              {item.badgeAlert && (
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#EF5350',
                  boxShadow: '0 0 8px #EF5350'
                }} />
              )}
            </Link>
          );
        })}

        <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '1rem 0' }} />

        {/* Public Catalog Link */}
        <Link
          href="/species"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            color: 'var(--color-limestone)',
            transition: 'color 0.15s ease'
          }}
        >
          <ExternalLink size={16} />
          <span>View Public Catalog</span>
        </Link>
      </nav>

      {/* User Footer Profile */}
      <div style={{
        padding: '1.25rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--color-forest)',
            border: '2px solid var(--color-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            flexShrink: 0
          }}>
            <UserIcon size={18} />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}>
              {user?.name || 'Conservation Officer'}
            </span>
            <span style={{
              display: 'inline-block',
              fontSize: '0.7rem',
              color: 'var(--color-emerald-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              {user?.role === 'admin' ? 'Lead Admin' : 'Officer'}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '0.5rem 0.75rem',
            fontSize: '0.8rem',
            color: '#FFCDD2',
            background: 'rgba(183, 28, 28, 0.2)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(183, 28, 28, 0.3)',
            justifyContent: 'center',
            transition: 'background 0.2s'
          }}
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
