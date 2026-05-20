'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/family-tree', label: 'Family' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/rsvp', label: 'RSVP' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'linear-gradient(180deg, rgba(10,2,5,0.95) 0%, rgba(18,4,10,0.9) 100%)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,160,23,0.2)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-center">
          <span className="text-xs tracking-widest" style={{ color: 'var(--gold)' }}>✦ OM ✦</span>
          <span className="text-lg font-bold tracking-wider gold-glow" style={{ color: 'var(--gold-light)' }}>
            Thushan & Dharshi
          </span>
          <span className="text-xs tracking-widest" style={{ color: 'var(--saffron)' }}>01.07.2026</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-widest uppercase transition-all duration-300 hover:text-gold-light"
              style={{ color: 'rgba(255,248,231,0.8)', letterSpacing: '0.15em' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,248,231,0.8)')}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block h-px w-6 transition-all duration-300"
              style={{ background: 'var(--gold)' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: 'rgba(10,2,5,0.97)', borderTop: '1px solid rgba(212,160,23,0.2)' }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm tracking-widest uppercase py-2"
              style={{ color: 'rgba(255,248,231,0.8)' }}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
