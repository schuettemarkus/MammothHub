'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { deltaCenter, watchParties, chants } from '@/data/rally';

function EnergyMeter() {
  const [count, setCount] = useState(0);
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('mammoth-rally-count');
    if (saved) setCount(parseInt(saved, 10));
  }, []);

  const handleRally = useCallback(() => {
    const next = count + 1;
    setCount(next);
    localStorage.setItem('mammoth-rally-count', String(next));
    setBursting(true);
    setTimeout(() => setBursting(false), 400);
  }, [count]);

  const fillPct = Math.min((count / 100) * 100, 100);

  return (
    <div className="bg-surface-2 rounded-xl p-5 border border-surface-3">
      <h4 className="font-display text-sm text-ice-400 uppercase tracking-wider mb-3">Fan Energy Meter</h4>

      {/* Gauge */}
      <div className="relative h-6 rounded-full bg-surface-3 overflow-hidden mb-3">
        <motion.div
          className="h-full bg-gradient-to-r from-ice-600 to-ice-300 rounded-full"
          animate={{ width: `${fillPct}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-ice-400">{count} rallies</span>
        <button
          onClick={handleRally}
          className={`press-scale relative font-display text-lg px-6 py-2 rounded-xl transition-all ${
            bursting
              ? 'bg-ice-400 text-mammoth-black scale-105'
              : 'bg-ice-600 hover:bg-ice-500 text-mammoth-bone'
          }`}
          aria-label="Rally! Tap to add energy"
        >
          TUSKS UP!
          {bursting && (
            <span className="absolute inset-0 rounded-xl border-2 border-ice-300 animate-ping opacity-50" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function RallyHub() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="rally" className="py-12 md:py-20" aria-label="Rally Hub">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-display text-display-lg text-mammoth-bone mb-2 text-center">
          Tusks Up
        </h2>
        <p className="text-center text-ice-400 mb-8">Rally Hub</p>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Delta Center Info */}
          <div className="bg-surface-1 border border-surface-3 rounded-2xl p-6">
            <h3 className="font-display text-lg text-ice-300 mb-4">Delta Center</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-ice-400">Address:</span>
                <p className="text-mammoth-bone/80">{deltaCenter.address}</p>
              </div>
              <div>
                <span className="text-ice-400">Transit:</span>
                <p className="text-mammoth-bone/80">{deltaCenter.transit}</p>
              </div>
              <div>
                <span className="text-ice-400">Gates:</span>
                <p className="text-mammoth-bone/80">{deltaCenter.gatesOpen}</p>
              </div>
              <div>
                <span className="text-ice-400">Bag Policy:</span>
                <p className="text-mammoth-bone/80">
                  {deltaCenter.clearBagPolicy ? 'Clear bag policy in effect' : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Watch Parties */}
          <div className="bg-surface-1 border border-surface-3 rounded-2xl p-6">
            <h3 className="font-display text-lg text-ice-300 mb-4">Watch Parties</h3>
            <ul className="space-y-3">
              {watchParties.map((venue) => (
                <li key={venue.name} className="text-sm">
                  <p className="font-semibold text-mammoth-bone">{venue.name}</p>
                  <p className="text-mammoth-bone/60">{venue.address}</p>
                  <p className="text-ice-400 text-xs">{venue.details}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Chant Guide */}
          <div className="bg-surface-1 border border-surface-3 rounded-2xl p-6">
            <h3 className="font-display text-lg text-ice-300 mb-4">Bring the Noise</h3>
            <ul className="space-y-3">
              {chants.map((chant) => (
                <li key={chant.name} className="text-sm">
                  <span className="font-display text-base text-mammoth-bone">{chant.name}</span>
                  <p className="text-mammoth-bone/60">{chant.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ice-400">#TusksUp</p>
          </div>

          {/* Energy Meter */}
          <div>
            <EnergyMeter />

            {/* Commemorative Banner */}
            <div className="mt-6 bg-gradient-to-br from-ice-800 to-surface-2 border border-ice-700 rounded-2xl p-6 text-center">
              <p className="text-xs uppercase tracking-widest text-ice-400 mb-2">Commemorative</p>
              <h3 className="font-display text-2xl text-mammoth-bone mb-1">
                First Home Playoff Game
              </h3>
              <p className="text-sm text-ice-300">April 24, 2026 · Delta Center</p>
              <p className="text-sm text-ice-300">Utah Mammoth vs Vegas Golden Knights</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
