'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { shotmapNote } from '@/data/shotmap';

export default function ShotMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="shotmap" className="relative py-16 md:py-24 overflow-hidden" aria-label="Shot Intelligence">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-mammoth-black via-ice-900/10 to-mammoth-black pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(45,109,181,0.2) 0%, transparent 50%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-ice-500 mb-2 font-semibold">Analytics</p>
          <h2 className="font-display text-4xl md:text-6xl text-mammoth-bone tracking-wide">
            SHOT INTELLIGENCE
          </h2>
          <p className="text-sm text-ice-400/60 mt-2">Games 1–2 Shot Map</p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="bg-surface-1/80 backdrop-blur-sm border border-surface-3 rounded-2xl p-6"
        >
          <div className="relative aspect-[2/1] w-full">
            <svg
              viewBox="0 0 400 200"
              className="w-full h-full"
              role="img"
              aria-label="Hockey rink shot map — data pending"
            >
              {/* Ice surface */}
              <rect x="10" y="10" width="380" height="180" rx="60" ry="60" fill="rgba(45,109,181,0.03)" stroke="currentColor" strokeWidth="1" className="text-ice-700/50" />
              {/* Center line */}
              <line x1="200" y1="10" x2="200" y2="190" stroke="currentColor" strokeWidth="1" className="text-red-800/40" />
              {/* Center circle */}
              <circle cx="200" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-ice-700/40" />
              {/* Blue lines */}
              <line x1="140" y1="10" x2="140" y2="190" stroke="currentColor" strokeWidth="2" className="text-ice-600/40" />
              <line x1="260" y1="10" x2="260" y2="190" stroke="currentColor" strokeWidth="2" className="text-ice-600/40" />
              {/* Goal creases */}
              <path d="M28,88 Q28,100 28,112 L20,112 L20,88 Z" fill="currentColor" className="text-ice-800/30" />
              <path d="M372,88 Q372,100 372,112 L380,112 L380,88 Z" fill="currentColor" className="text-ice-800/30" />
              {/* Faceoff circles + dots */}
              {[[80, 55], [80, 145], [320, 55], [320, 145]].map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="12" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-ice-700/30" />
                  <circle cx={cx} cy={cy} r="3" fill="currentColor" className="text-ice-600/50" />
                </g>
              ))}
              <circle cx="200" cy="100" r="3" fill="currentColor" className="text-ice-600/50" />

              {/* No data overlay */}
              <text x="200" y="92" textAnchor="middle" fill="rgba(123,179,232,0.5)" fontSize="13" fontFamily="'Bebas Neue', sans-serif" letterSpacing="0.15em">
                AWAITING DATA
              </text>
              <text x="200" y="112" textAnchor="middle" fill="rgba(123,179,232,0.3)" fontSize="8" fontFamily="Inter, sans-serif">
                Shot coordinates populate via NHL Stats API
              </text>
            </svg>
          </div>

          <p className="text-xs text-ice-400/40 text-center mt-4">{shotmapNote}</p>
        </motion.div>
      </div>
    </section>
  );
}
