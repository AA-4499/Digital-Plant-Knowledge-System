import React from 'react';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { AdminSidebar } from '../../components/layout/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['conservation_officer', 'admin']}>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <AdminSidebar />
        <main style={{
          flex: 1,
          padding: '2rem 2.5rem',
          maxWidth: 'calc(100vw - var(--sidebar-width))',
          overflowY: 'auto'
        }}>
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
