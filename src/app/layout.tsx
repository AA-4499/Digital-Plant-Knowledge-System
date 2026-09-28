import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';

export const metadata: Metadata = {
  title: 'Digital Plant Knowledge System — Niah National Park',
  description: 'Digital biodiversity repository, plant ground-truthing, and conservation management platform for Sarawak Forestry Corporation and Niah National Park.',
  keywords: ['Niah National Park', 'Sarawak Forestry Corporation', 'Biodiversity', 'Plant Taxonomy', 'Dipterocarpaceae', 'Botany'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
