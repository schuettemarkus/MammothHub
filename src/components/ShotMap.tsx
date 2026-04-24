'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { shotmapNote } from '@/data/shotmap';

export default function ShotMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="shotmap" className="py-12 md:py-20" aria-label="Shot Map">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-display text-display-lg text-mammoth-bone mb-2 text-center">
          Shot Intelligence
        </h2>
        <p className="text-center text-ice-400 mb-8">Games 1–2 Shot Map</p>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="bg-surface-1 border border-surface-3 rounded-2xl p-6"
        >
          {/* Rink SVG */}
          <div className="relative aspect-[2/1] w-full">
            <svg
              viewBox="0 0 400 200"
              className="w-full h-full"
              role="img"
              aria-label="Hockey rink shot map — data pending"
            >
              {/* Rink outline */}
              <rect
                x="10"
                y="10"
                width="380"
                height="180"
                rx="60"
                ry="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-surface-3"
              />
              {/* Center line */}
              <line
                x1="200"
                y1="10"
                x2="200"
                y2="190"
                stroke="currentColor"
                strokeWidth="1"
                className="text-ice-800"
              />
              {/* Center circle */}
              <circle
                cx="200"
                cy="100"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-ice-800"
              />
              {/* Blue lines */}
              <line x1="140" y1="10" x2="140" y2="190" stroke="currentColor" strokeWidth="1.5" className="text-ice-700" />
              <line x1="260" y1="10" x2="260" y2="190" stroke="currentColor" strokeWidth="1.5" className="text-ice-700" />
              {/* Goal creases */}
              <rect x="20" y="85" width="8" height="30" rx="2" fill="currentColor" className="text-ice-800/50" />
              <rect x="372" y="85" width="8" height="30" rx="2" fill="currentColor" className="text-ice-800/50" />
              {/* Faceoff dots */}
              {[
                [80, 55], [80, 145], [320, 55], [320, 145],
                [200, 100],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3" fill="currentColor" className="text-ice-700" />
              ))}

              {/* No data overlay */}
              <text x="200" y="95" textAnchor="middle" className="text-ice-400 fill-current" fontSize="12" fontFamily="Inter, sans-serif">
                Shot data not yet available
              </text>
              <text x="200" y="112" textAnchor="middle" className="text-ice-400/60 fill-current" fontSize="9" fontFamily="Inter, sans-serif">
                Will populate with real NHL API data
              </text>
            </svg>
          </div>

          <p className="text-xs text-ice-400/60 text-center mt-4">{shotmapNote}</p>
        </motion.div>
      </div>
    </section>
  );
}
