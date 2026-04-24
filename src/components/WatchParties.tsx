'use client';

import { motion } from 'framer-motion';
import { watchParties } from '@/data/rally';

export default function WatchParties() {
  return (
    <section className="py-6 px-4" aria-label="Watch Parties">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-display text-lg text-ice-300">Watch Parties</h2>
          <div className="h-px flex-1 bg-surface-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {watchParties.map((venue, i) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              className="press-scale group bg-surface-1 border border-surface-3 hover:border-ice-700 rounded-xl p-4 transition-colors"
            >
              <h3 className="font-display text-base text-mammoth-bone group-hover:text-ice-300 transition-colors">
                {venue.name}
              </h3>
              <p className="text-xs text-mammoth-bone/50 mt-1">{venue.address}</p>
              <p className="text-xs text-ice-400/60 mt-2">{venue.details}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
