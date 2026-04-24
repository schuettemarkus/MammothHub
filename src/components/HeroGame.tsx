'use client';

import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';
import TuskGauge from './TuskGauge';
import { series } from '@/data/series';
import { teams } from '@/data/teams';
import { injuryNote } from '@/data/injuries';
import { lineupNote } from '@/data/players';

const game3 = series[2]; // Game 3

export default function HeroGame() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 overflow-hidden"
      aria-label="Game 3 Hero"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-ice-900/50 via-mammoth-black to-mammoth-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,109,181,0.15),transparent_60%)]" />

      {/* Mountain silhouette */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-48 md:h-64 opacity-10"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon
          points="0,200 100,80 200,140 350,40 500,120 650,20 800,100 950,50 1100,90 1200,60 1200,200"
          fill="currentColor"
          className="text-ice-800"
        />
      </svg>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-6 md:gap-8">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs md:text-sm uppercase tracking-[0.3em] text-ice-400 font-semibold"
        >
          First Home Playoff Game. Ever.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* Matchup Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full bg-surface-1 border border-surface-3 rounded-2xl p-6 md:p-8"
        >
          {/* Teams */}
          <div className="flex items-center justify-between gap-4 mb-6">
            {/* Utah */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 rounded-full bg-ice-800 flex items-center justify-center">
                <span className="font-display text-2xl md:text-3xl text-ice-300">UTA</span>
              </div>
              <h2 className="font-display text-xl md:text-2xl text-mammoth-bone">{teams.UTA.name}</h2>
              <p className="text-sm text-ice-400">{teams.UTA.record}</p>
              <span className="inline-block mt-1 text-xs bg-ice-800/50 text-ice-300 px-2 py-0.5 rounded">
                HOME
              </span>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center gap-1">
              <span className="font-display text-lg md:text-xl text-surface-3">VS</span>
              <span className="text-xs text-ice-400 font-semibold uppercase tracking-wider">
                Series Tied 1-1
              </span>
            </div>

            {/* Vegas */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 rounded-full bg-vegas-steel/30 flex items-center justify-center">
                <span className="font-display text-2xl md:text-3xl text-vegas-gold">VGK</span>
              </div>
              <h2 className="font-display text-xl md:text-2xl text-mammoth-bone">{teams.VGK.name}</h2>
              <p className="text-sm text-vegas-gold/60">{teams.VGK.record}</p>
              <span className="inline-block mt-1 text-xs bg-vegas-steel/30 text-vegas-gold/60 px-2 py-0.5 rounded">
                AWAY
              </span>
            </div>
          </div>

          {/* Game Info */}
          <div className="border-t border-surface-3 pt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-ice-300">
              <span className="text-ice-500">📍</span>
              <span>{game3.venue} · Salt Lake City, UT</span>
            </div>
            <div className="flex items-center gap-2 text-ice-300">
              <span className="text-ice-500">🕖</span>
              <span>7:30 PM MT / 9:30 PM ET</span>
            </div>
            <div className="flex items-center gap-2 text-ice-300 md:col-span-2">
              <span className="text-ice-500">📺</span>
              <span>{game3.broadcast.join(' · ')}</span>
            </div>
          </div>

          {/* Lineup / Injury Notes */}
          <div className="border-t border-surface-3 mt-4 pt-4 space-y-2">
            <p className="text-xs text-ice-400">{lineupNote}</p>
            <p className="text-xs text-ice-400">{injuryNote}</p>
          </div>
        </motion.div>

        {/* Tusk Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full"
        >
          <TuskGauge />
        </motion.div>

        {/* Key Storylines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full bg-surface-1 border border-surface-3 rounded-2xl p-6"
        >
          <h3 className="font-display text-lg text-ice-300 mb-4">Key Storylines</h3>
          <ul className="space-y-3">
            {game3.storylines.map((line, i) => (
              <li key={i} className="flex gap-3 text-sm text-mammoth-bone/80">
                <span className="text-ice-500 mt-0.5 shrink-0">▸</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a
            href="https://www.nhl.com/utah/"
            target="_blank"
            rel="noopener noreferrer"
            className="press-scale inline-flex items-center gap-2 bg-ice-500 hover:bg-ice-400 text-mammoth-black font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Watch on TBS / HBO Max
          </a>
          <a
            href="https://www.nhl.com/utah/"
            target="_blank"
            rel="noopener noreferrer"
            className="press-scale inline-flex items-center gap-2 border border-ice-500 text-ice-300 hover:bg-ice-500/10 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Get Ready
          </a>
        </motion.div>
      </div>
    </section>
  );
}
