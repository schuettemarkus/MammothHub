'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { mammothRoster } from '@/data/players';
import type { Player, StatLine, GoalieStatLine } from '@/data/types';

function isGoalieStats(stats: StatLine | GoalieStatLine): stats is GoalieStatLine {
  return 'svPct' in stats;
}

function PlayerCard({ player, index }: { player: Player; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isGoalie = player.pos === 'G';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="press-scale flex-shrink-0 w-56 md:w-64 rounded-xl border border-surface-3 bg-surface-1 overflow-hidden group"
      tabIndex={0}
      role="article"
      aria-label={`${player.name}, #${player.number}, ${player.pos}`}
    >
      {/* Player silhouette placeholder */}
      <div className="relative h-40 bg-gradient-to-b from-ice-900 to-surface-2 flex items-end justify-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <span className="font-display text-[8rem] text-ice-500">
            {player.number}
          </span>
        </div>
        <div className="relative z-10 w-24 h-24 bg-ice-800/50 rounded-full flex items-center justify-center mb-2">
          <span className="font-display text-3xl text-ice-300">
            {player.name.split(' ').map((n) => n[0]).join('')}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-lg text-mammoth-bone">{player.name}</h3>
          <span className="text-xs text-ice-400 font-semibold">#{player.number}</span>
        </div>
        <span className="text-xs text-ice-400 uppercase tracking-wider">{player.pos}</span>

        {/* Stats */}
        <div className="mt-3 pt-3 border-t border-surface-3">
          <p className="text-xs text-ice-400 uppercase tracking-wider mb-2">Playoff Stats (2 GP)</p>
          {isGoalie ? (
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <p className="text-xs text-ice-400">GP</p>
                <p className="font-display text-lg text-mammoth-bone">
                  {isGoalieStats(player.playoffs) ? player.playoffs.gp || 'N/A' : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-ice-400">SV%</p>
                <p className="font-display text-lg text-mammoth-bone">
                  {isGoalieStats(player.playoffs) && player.playoffs.svPct ? player.playoffs.svPct.toFixed(3) : 'N/A'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-ice-400">G</p>
                <p className="font-display text-lg text-mammoth-bone">
                  {!isGoalieStats(player.playoffs) ? (player.playoffs.goals || 'N/A') : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-ice-400">A</p>
                <p className="font-display text-lg text-mammoth-bone">
                  {!isGoalieStats(player.playoffs) ? (player.playoffs.assists || 'N/A') : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-ice-400">P</p>
                <p className="font-display text-lg text-mammoth-bone">
                  {!isGoalieStats(player.playoffs) ? (player.playoffs.points || 'N/A') : 'N/A'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function PlayerCarousel() {
  return (
    <section id="players" className="py-12 md:py-20" aria-label="Player Spotlight">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-display-lg text-mammoth-bone mb-2 text-center">
          The Herd
        </h2>
        <p className="text-center text-ice-400 mb-8">Key Mammoth Players</p>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {mammothRoster.map((player, index) => (
            <div key={player.id} className="snap-start">
              <PlayerCard player={player} index={index} />
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-ice-400/60 mt-4">
          Individual player stats for the 2025–26 season and playoffs are not yet confirmed. Displayed as N/A where unavailable.
        </p>
      </div>
    </section>
  );
}
