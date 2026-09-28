import React from 'react';
import Link from 'next/link';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Search, ArrowRight, Shield, QrCode, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { INITIAL_SPECIES } from '../services/mockData';

export default function HomePage() {
  const featured = INITIAL_SPECIES.slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          padding: '5rem 1.5rem 6rem 1.5rem',
          background: 'radial-gradient(ellipse at 80% 20%, rgba(61, 168, 98, 0.18) 0%, rgba(247, 249, 246, 0) 70%), linear-gradient(180deg, #F0F5EE 0%, var(--bg-primary) 100%)',
          overflow: 'hidden'
        }}>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(46, 125, 71, 0.12)',
                color: 'var(--color-forest)',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '1.5rem'
              }}>
                <MapPin size={14} color="var(--color-emerald)" />
                <span>Niah National Park — Sarawak Forestry Corporation</span>
              </div>

              {/* Main Headline */}
              <h1 style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                fontWeight: 800,
                color: 'var(--color-forest-dark)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem'
              }}>
                Digital Plant Knowledge System
              </h1>

              <p style={{
                fontSize: '1.15rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                marginBottom: '2.5rem'
              }}>
                Explore the rare limestone karst flora, peat swamp canopies, and protected biodiversity of Niah National Park with verified botanical taxonomy, ecological guides, and field ground-truthing records.
              </p>

              {/* Hero Search Box */}
              <form action="/species" method="GET" style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 0.4rem 0.4rem 1.25rem',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-subtle)',
                maxWidth: '560px',
                margin: '0 auto 2.5rem auto'
              }}>
                <Search size={20} color="var(--text-muted)" style={{ flexShrink: 0, marginRight: '0.75rem' }} />
                <input
                  type="text"
                  name="query"
                  placeholder="Search species by scientific name, local alias, family..."
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    background: 'transparent',
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #1A3826 0%, #2E7D47 100%)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.9rem',
                    flexShrink: 0,
                    transition: 'transform var(--transition-fast)'
                  }}
                >
                  <span>Explore</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Quick Metrics Strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                maxWidth: '680px',
                margin: '0 auto',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-glass)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--color-emerald)', fontWeight: 800 }}>6+</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Niah Species</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--color-forest)', fontWeight: 800 }}>100%</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sarawak Protected</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--color-forest)', fontWeight: 800 }}>QR & IoT</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Field Ground-Truthed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Species Highlights Section */}
        <section id="highlights" style={{ padding: '4.5rem 1.5rem', background: 'var(--bg-surface)' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}>
              <div>
                <span style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-emerald)',
                  marginBottom: '0.4rem'
                }}>
                  Biodiversity Dossier
                </span>
                <h2 style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--color-forest-dark)' }}>
                  Featured Flora of Niah National Park
                </h2>
              </div>

              <Link
                href="/species"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--color-emerald)',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-secondary)'
                }}
              >
                <span>View Complete Catalog</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Species Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.75rem'
            }}>
              {featured.map((species) => (
                <article
                  key={species.id}
                  style={{
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
                    <img
                      src={species.photos?.[0]?.url || 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80'}
                      alt={species.scientificName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: species.conservationStatus === 'Endangered' ? 'var(--badge-en-bg)' :
                        species.conservationStatus === 'Critically Endangered' ? 'var(--badge-cr-bg)' : 'var(--badge-vu-bg)',
                      color: species.conservationStatus === 'Endangered' ? 'var(--badge-en-text)' :
                        species.conservationStatus === 'Critically Endangered' ? 'var(--badge-cr-text)' : 'var(--badge-vu-text)',
                      border: '1px solid rgba(0,0,0,0.06)'
                    }}>
                      {species.conservationStatus}
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-moss)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
                      {species.family}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, fontStyle: 'italic', color: 'var(--color-forest-dark)', marginBottom: '0.2rem' }}>
                      {species.scientificName}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                      {species.commonName} {Array.isArray(species.localNames) && species.localNames.length > 0 && `(${species.localNames[0]})`}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
                      {(species.description || '').slice(0, 110)}...
                    </p>

                    <Link
                      href={`/species/${species.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.85rem',
                        borderTop: '1px solid var(--border-subtle)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--color-emerald)'
                      }}
                    >
                      <span>Explore Botanical Dossier</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Ecotourism & Ground-Truthing Info Section */}
        <section id="about" style={{ padding: '4.5rem 1.5rem', background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--color-forest-dark)', marginBottom: '1rem' }}>
                Bridging Forest Fieldwork with Digital Conservation
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                This platform links field botanists capturing GPS and botanical photos under dense forest canopies with central biodiversity management at Sarawak Forestry Corporation.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                textAlign: 'left'
              }}>
                <div style={{
                  background: 'var(--bg-surface)',
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ color: 'var(--color-emerald)', marginBottom: '0.75rem' }}>
                    <QrCode size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.4rem' }}>
                    QR Ground-Truthing
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Laminated QR tags placed on trees allow park visitors and ecotourists to scan with any smartphone camera and discover authentic botanical dossiers on site.
                  </p>
                </div>

                <div style={{
                  background: 'var(--bg-surface)',
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ color: 'var(--color-emerald)', marginBottom: '0.75rem' }}>
                    <Shield size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.4rem' }}>
                    Anti-Poaching Protection
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Exact GPS coordinates of vulnerable and endangered flora are strictly obfuscated into generalized buffer zones for the public, protecting specimens from poaching.
                  </p>
                </div>

                <div style={{
                  background: 'var(--bg-surface)',
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ color: 'var(--color-emerald)', marginBottom: '0.75rem' }}>
                    <Sparkles size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '0.4rem' }}>
                    AI-Assisted Classification
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    In partnership with NeuonAI, the system pre-screens field photos to suggest taxonomic family, genus, and confidence scores for rapid officer approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
