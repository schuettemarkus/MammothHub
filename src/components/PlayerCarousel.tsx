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
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const isGoalie = player.pos === 'G';

  // Position color coding
  const posColor = isGoalie
    ? 'from-amber-600/30 to-amber-900/50'
    : player.pos === 'D'
    ? 'from-ice-600/30 to-ice-900/50'
    : 'from-ice-500/20 to-ice-900/60';

  const posLabel = isGoalie ? 'GOALTENDER' : player.pos === 'D' ? 'DEFENSEMAN' : 'FORWARD';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="press-scale flex-shrink-0 w-52 md:w-60 rounded-2xl border border-surface-3 bg-surface-1 overflow-hidden group cursor-default relative"
      tabIndex={0}
      role="article"
      aria-label={`${player.name}, #${player.number}, ${player.pos}`}
    >
      {/* ── PLAYER VISUAL — large number + initials, cinematic gradient ── */}
      <div className={`relative h-56 md:h-64 bg-gradient-to-b ${posColor} overflow-hidden`}>
        {/* Massive jersey number background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-[11rem] md:text-[13rem] leading-none text-mammoth-bone/[0.04] select-none"
            aria-hidden="true"
          >
            {player.number}
          </span>
        </div>

        {/* Diagonal ice-blue slash */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(45,109,181,0.4) 0%, transparent 50%)',
          }}
        />

        {/* Player silhouette placeholder — large initials in a hockey pose feel */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-mammoth-black/40 border-2 border-ice-500/20 flex items-center justify-center backdrop-blur-sm group-hover:border-ice-400/40 transition-colors">
            <span className="font-display text-4xl md:text-5xl text-ice-300 group-hover:text-ice-200 transition-colors">
              {player.name.split(' ').map((n) => n[0]).join('')}
            </span>
          </div>
        </div>

        {/* Number badge — top right */}
        <div className="absolute top-3 right-3 bg-mammoth-black/60 backdrop-blur-sm border border-ice-700/30 rounded-lg px-2.5 py-1">
          <span className="font-display text-xl text-ice-300">#{player.number}</span>
        </div>

        {/* Position badge — top left */}
        <div className="absolute top-3 left-3 bg-ice-600/20 backdrop-blur-sm border border-ice-600/30 rounded-lg px-2 py-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-ice-300">{player.pos}</span>
        </div>
      </div>

      {/* ── PLAYER INFO ── */}
      <div className="p-4 relative">
        {/* Frost glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-ice-900/20 to-transparent pointer-events-none" />

        <h3 className="font-display text-xl md:text-2xl text-mammoth-bone leading-tight group-hover:text-ice-200 transition-colors">
          {player.name}
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] text-ice-500 mt-1 font-semibold">
          {posLabel}
        </p>

        {/* Stats */}
        <div className="mt-3 pt-3 border-t border-surface-3">
          <p className="text-[10px] text-ice-400/60 uppercase tracking-widest mb-2">
            Playoff Stats · 2 GP
          </p>
          {isGoalie ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-2 rounded-lg p-2 text-center">
                <p className="text-[10px] text-ice-400 uppercase">GP</p>
                <p className="font-display text-xl text-mammoth-bone">
                  {isGoalieStats(player.playoffs) && player.playoffs.gp ? player.playoffs.gp : 'N/A'}
                </p>
              </div>
              <div className="bg-surface-2 rounded-lg p-2 text-center">
                <p className="text-[10px] text-ice-400 uppercase">SV%</p>
                <p className="font-display text-xl text-mammoth-bone">
                  {isGoalieStats(player.playoffs) && player.playoffs.svPct ? player.playoffs.svPct.toFixed(3) : 'N/A'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {['G', 'A', 'P'].map((label, i) => {
                const vals = !isGoalieStats(player.playoffs)
                  ? [player.playoffs.goals, player.playoffs.assists, player.playoffs.points]
                  : [0, 0, 0];
                return (
                  <div key={label} className="bg-surface-2 rounded-lg p-2 text-center">
                    <p className="text-[10px] text-ice-400 uppercase">{label}</p>
                    <p className="font-display text-xl text-mammoth-bone">
                      {vals[i] || 'N/A'}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function PlayerCarousel() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="players" className="relative py-16 md:py-24 overflow-hidden" aria-label="Player Spotlight">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-mammoth-black via-surface-1/30 to-mammoth-black pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(45,109,181,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-ice-500 mb-2 font-semibold">Utah Mammoth</p>
          <h2 className="font-display text-4xl md:text-6xl text-mammoth-bone tracking-wide">
            THE HERD
          </h2>
          <p className="text-sm text-ice-400/60 mt-2">
            Key players · Stats shown as N/A where not independently verified
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {mammothRoster.map((player, index) => (
            <div key={player.id} className="snap-start">
              <PlayerCard player={player} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
