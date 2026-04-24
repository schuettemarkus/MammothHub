'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import CountdownTimer from './CountdownTimer';
import TuskGauge from './TuskGauge';
import { series } from '@/data/series';
import { injuryNote } from '@/data/injuries';
import { lineupNote } from '@/data/players';

const game3 = series[2];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};

export default function HeroGame() {
  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden"
      aria-label="Game 3 Hero — First Home Playoff Game"
    >
      {/* ═══ POSTER HERO — FULL IMAGE BACKGROUND ═══ */}
      <div className="relative min-h-[100dvh] flex flex-col">
        {/* Background — poster-faceoff (the horizontal helmet face-off) */}
        <div className="absolute inset-0">
          <Image
            src="/MammothHub/poster-faceoff.png"
            alt=""
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          {/* Dark overlay so text reads */}
          <div className="absolute inset-0 bg-gradient-to-b from-mammoth-black/40 via-mammoth-black/20 to-mammoth-black" />
          {/* Side tint overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-ice-900/30 via-transparent to-vegas-steel/20" />
        </div>

        {/* ── OVERLAY CONTENT ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex-1 flex flex-col items-center justify-end px-4 pt-20 pb-8"
        >
          {/* Countdown — prominent, centered */}
          <motion.div variants={fadeUp} className="mb-5">
            <CountdownTimer />
          </motion.div>

          {/* First Home Playoff Game badge */}
          <motion.div variants={fadeUp} className="mb-4">
            <div className="inline-block border border-ice-400/40 rounded-lg px-5 py-2 backdrop-blur-md bg-mammoth-black/50">
              <p className="font-display text-sm md:text-base tracking-[0.25em] text-ice-200">
                FIRST HOME PLAYOFF GAME. EVER.
              </p>
            </div>
          </motion.div>

          {/* Game info strip */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-mammoth-bone/70 backdrop-blur-sm bg-mammoth-black/30 rounded-full px-5 py-2 mb-4"
          >
            <span className="font-semibold">Delta Center · SLC</span>
            <span className="text-mammoth-bone/30">|</span>
            <span>7:30 PM MT</span>
            <span className="text-mammoth-bone/30">|</span>
            <span>{game3.broadcast.join(' · ')}</span>
          </motion.div>

          {/* Series score */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
            <span className="font-display text-lg text-ice-300">UTA 1</span>
            <span className="text-mammoth-bone/30">—</span>
            <span className="font-display text-lg text-vegas-gold">1 VGK</span>
            <span className="text-xs text-mammoth-bone/50 ml-1 uppercase tracking-wider">Series Tied</span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center mb-6">
            <a
              href="https://www.nhl.com/utah/"
              target="_blank"
              rel="noopener noreferrer"
              className="press-scale inline-flex items-center gap-2 bg-ice-500 hover:bg-ice-400 text-mammoth-black font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-ice-500/25"
            >
              Watch on TBS / HBO Max
            </a>
            <a
              href="https://www.nhl.com/utah/"
              target="_blank"
              rel="noopener noreferrer"
              className="press-scale inline-flex items-center gap-2 border border-mammoth-bone/30 text-mammoth-bone hover:bg-mammoth-bone/10 font-semibold text-sm px-6 py-3 rounded-xl transition-colors backdrop-blur-sm"
            >
              Get Ready
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ═══ SECOND POSTER — CINEMATIC MAMMOTH VS KNIGHT ═══ */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col">
        <div className="absolute inset-0">
          <Image
            src="/MammothHub/poster-cinematic.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-mammoth-black via-mammoth-black/30 to-mammoth-black" />
        </div>

        {/* Overlay — Key Storylines over the cinematic poster */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16"
        >
          <h3 className="font-display text-2xl md:text-3xl text-mammoth-bone mb-6 tracking-wider">
            KEY STORYLINES
          </h3>
          <div className="max-w-2xl w-full space-y-4">
            {game3.storylines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="flex gap-3 backdrop-blur-md bg-mammoth-black/50 border border-surface-3/50 rounded-xl p-4"
              >
                <span className="text-ice-400 font-display text-lg shrink-0">0{i + 1}</span>
                <p className="text-sm md:text-base text-mammoth-bone/90 leading-relaxed">{line}</p>
              </motion.div>
            ))}
          </div>

          {/* Game Notes */}
          <div className="max-w-2xl w-full mt-6 backdrop-blur-md bg-mammoth-black/40 border border-surface-3/30 rounded-xl p-4">
            <p className="text-xs text-ice-400/80">{lineupNote}</p>
            <p className="text-xs text-ice-400/80 mt-1">{injuryNote}</p>
          </div>
        </motion.div>
      </div>

      {/* ═══ TUSK GAUGE — below the posters ═══ */}
      <div className="relative z-20 py-12 px-4 bg-mammoth-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <TuskGauge />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
