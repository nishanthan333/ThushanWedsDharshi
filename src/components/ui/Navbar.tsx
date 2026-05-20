'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const links = [
  { href: '#story',      label: 'Our Story' },
  { href: '#ceremonies', label: 'Ceremonies' },
  { href: '/events',     label: 'Events' },
  { href: '/family-tree',label: 'Family' },
  { href: '/gallery',    label: 'Gallery' },
  { href: '/rsvp',       label: 'RSVP' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 1000,
        background: scrolled ? 'rgba(250,248,243,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.22)' : 'none',
        padding: '14px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        transition: 'background 0.4s, border-color 0.4s',
      }}
    >
      <Link href="/" className="font-display" style={{ fontSize: '1.7rem', color: scrolled ? 'var(--green-dark)' : 'white', textDecoration: 'none' }}>
        Thushan &amp; Dharshi
      </Link>

      {/* Desktop */}
      <ul style={{ display: 'flex', gap: '36px', listStyle: 'none' }} className="hidden-mobile">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              style={{
                fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: scrolled ? 'var(--text-mid)' : 'rgba(255,255,255,0.85)',
                textDecoration: 'none', transition: 'color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'var(--text-mid)' : 'rgba(255,255,255,0.85)')}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile button */}
      <button
        onClick={() => setOpen(!open)}
        style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: scrolled ? 'var(--green-dark)' : 'white' }}
        className="show-mobile"
        aria-label="Menu"
      >
        ☰
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(250,248,243,0.98)', padding: '20px 22px',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              style={{ fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-mid)', textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 800px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
