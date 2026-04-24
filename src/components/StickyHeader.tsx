'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Hero', href: '#hero' },
  { label: 'Series', href: '#series' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Players', href: '#players' },
  { label: 'Stats', href: '#stats' },
  { label: 'Rally', href: '#rally' },
];

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-mammoth-black/95 backdrop-blur-sm border-b border-surface-3'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Monogram */}
        <a href="#hero" className="font-display text-xl text-ice-300 hover:text-ice-200 transition-colors">
          UTA
        </a>

        {/* Series score */}
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-ice-300 font-display">UTA 1</span>
          <span className="text-surface-3">—</span>
          <span className="text-vegas-gold font-display">1 VGK</span>
          <span className="text-ice-400 text-xs ml-2">GAME 3 TONIGHT</span>
        </div>

        {/* Nav links - hidden on mobile, shown on md+ */}
        <nav className="hidden md:flex items-center gap-4" aria-label="Page sections">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-ice-400 hover:text-ice-300 transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="https://www.nhl.com/utah/"
          target="_blank"
          rel="noopener noreferrer"
          className="press-scale text-xs font-semibold bg-ice-600 hover:bg-ice-500 text-mammoth-bone px-3 py-1.5 rounded-lg transition-colors"
        >
          Watch
        </a>
      </div>
    </header>
  );
}
