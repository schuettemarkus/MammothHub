'use client';

import { motion } from 'framer-motion';
import CountdownTimer from './CountdownTimer';
import TuskGauge from './TuskGauge';
import FrostParticles from './FrostParticles';
import { series } from '@/data/series';
import { injuryNote } from '@/data/injuries';
import { lineupNote } from '@/data/players';

const game3 = series[2];

// Stagger children variants
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

/* ── Mammoth Silhouette SVG ────────────────────────────────────── */
function MammothSilhouette() {
  return (
    <motion.svg
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 0.12, x: 0 }}
      transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}
      viewBox="0 0 300 340"
      className="absolute bottom-0 left-0 w-[55%] md:w-[40%] h-auto max-h-[80%] text-ice-400"
      aria-hidden="true"
    >
      {/* Stylized mammoth profile — tusks, trunk, hulking mass */}
      <path
        d="M60,340 L60,260 C60,220 40,200 30,170 C20,140 25,110 45,90
           C65,70 90,55 110,50 C130,45 155,48 170,55
           C185,62 195,75 200,90 L205,85 C210,70 220,60 235,58
           C250,56 260,65 265,80 L268,95 C272,75 280,65 290,68
           C295,70 298,80 295,95 L290,115 C288,125 282,135 275,140
           L270,145 C265,148 260,155 258,165
           L255,180 C253,192 250,200 245,210
           L240,225 C238,235 235,245 235,260
           L235,340 Z
           M45,90 C35,105 20,135 30,155
           C25,145 15,130 12,115
           C8,95 15,75 30,65
           C20,72 30,80 45,90 Z
           M30,170 L15,200 C10,215 8,230 15,240
           C22,250 35,245 40,235
           L48,220 C42,210 38,195 35,180 Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

/* ── Knight Helmet SVG ─────────────────────────────────────────── */
function KnightSilhouette() {
  return (
    <motion.svg
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 0.12, x: 0 }}
      transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}
      viewBox="0 0 240 340"
      className="absolute bottom-0 right-0 w-[45%] md:w-[35%] h-auto max-h-[80%] text-vegas-gold"
      aria-hidden="true"
    >
      {/* Stylized knight helmet — visor, plume, armor */}
      <path
        d="M80,340 L80,250 C80,230 70,215 65,195
           C60,175 62,155 70,140 C78,125 90,115 100,108
           L95,100 C88,90 85,78 88,65
           C91,52 100,42 115,38 C125,35 138,36 148,42
           C158,48 165,58 168,70
           L170,80 C178,72 188,68 198,72
           C208,76 212,88 210,100
           L205,115 C200,130 192,140 185,148
           C178,158 175,170 174,185
           L172,200 C170,215 168,230 168,250
           L168,340 Z
           M115,38 C120,25 130,15 145,12
           C160,10 175,18 180,30
           C170,20 165,8 150,5
           C135,2 120,10 115,25 Z
           M70,140 L55,145 C45,150 38,160 40,172
           C42,184 52,190 62,188
           L70,185 Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

/* ── Mountain Range Background ─────────────────────────────────── */
function MountainRange() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.2 }}
      className="absolute bottom-0 left-0 right-0 w-full h-[50%] md:h-[60%]"
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      {/* Far range — subtle */}
      <polygon
        points="0,400 0,280 80,200 160,260 280,140 400,220 520,100 640,180 760,60 880,150 1000,80 1120,160 1200,120 1200,400"
        fill="rgba(22,51,102,0.15)"
      />
      {/* Mid range */}
      <polygon
        points="0,400 0,320 100,250 200,300 350,180 500,280 650,160 800,240 950,140 1100,220 1200,180 1200,400"
        fill="rgba(15,34,64,0.25)"
      />
      {/* Near range — darker */}
      <polygon
        points="0,400 0,340 120,300 250,330 400,270 550,320 700,260 850,310 1000,280 1150,340 1200,300 1200,400"
        fill="rgba(10,22,40,0.5)"
      />
    </motion.svg>
  );
}

export default function HeroGame() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      aria-label="Game 3 Hero — First Home Playoff Game"
    >
      {/* ═══ BACKGROUND LAYERS ═══ */}

      {/* Base split — ice-blue left, dark gold right */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-ice-900 via-mammoth-black to-mammoth-black" />
        {/* Diagonal split overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'linear-gradient(125deg, rgba(45,109,181,0.3) 0%, rgba(45,109,181,0.05) 40%, transparent 50%, rgba(180,151,90,0.05) 60%, rgba(180,151,90,0.2) 100%)',
          }}
        />
      </div>

      {/* Radial glow — Utah side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-0 left-0 w-[60%] h-full"
        style={{
          background:
            'radial-gradient(ellipse at 20% 30%, rgba(45,109,181,0.2) 0%, transparent 60%)',
        }}
      />

      {/* Radial glow — Vegas side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute top-0 right-0 w-[60%] h-full"
        style={{
          background:
            'radial-gradient(ellipse at 80% 40%, rgba(180,151,90,0.15) 0%, transparent 60%)',
        }}
      />

      {/* Diagonal cut line */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 0.15, scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
        className="absolute top-0 bottom-0 left-1/2 w-px origin-top"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(240,236,228,0.4) 30%, rgba(240,236,228,0.4) 70%, transparent 100%)',
          transform: 'rotate(8deg)',
        }}
      />

      {/* Mountains */}
      <MountainRange />

      {/* Frost particles — Utah side */}
      <div className="absolute inset-y-0 left-0 w-1/2">
        <FrostParticles side="left" count={35} />
      </div>

      {/* Gold particles — Vegas side */}
      <div className="absolute inset-y-0 right-0 w-1/2">
        <FrostParticles side="right" count={20} />
      </div>

      {/* Character silhouettes */}
      <MammothSilhouette />
      <KnightSilhouette />

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mammoth-black to-transparent z-10" />

      {/* ═══ CONTENT ═══ */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-32"
      >
        {/* Stanley Cup Playoffs badge */}
        <motion.div variants={fadeIn} className="mb-4">
          <div className="inline-flex items-center gap-2 border border-mammoth-bone/20 rounded-full px-4 py-1.5 backdrop-blur-sm bg-mammoth-black/30">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-mammoth-bone/70 font-semibold">
              Stanley Cup Playoffs
            </span>
            <span className="text-mammoth-bone/30">·</span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-mammoth-bone/70 font-semibold">
              Round 1
            </span>
          </div>
        </motion.div>

        {/* ONE GOAL. NO QUIT. */}
        <motion.p
          variants={fadeUp}
          className="font-display text-sm md:text-base tracking-[0.4em] text-mammoth-bone/50 mb-6 md:mb-8"
        >
          ONE GOAL. NO QUIT.
        </motion.p>

        {/* ── MAIN MATCHUP ── */}
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-12 mb-6 md:mb-8 w-full max-w-4xl">
          {/* UTAH side */}
          <motion.div variants={fadeUp} className="flex-1 text-center md:text-right">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-ice-400/70 mb-1">Utah</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-ice-300 leading-none">
              MAMMOTH
            </h2>
          </motion.div>

          {/* VS */}
          <motion.div variants={scaleIn} className="flex-shrink-0">
            <div className="relative">
              <span className="font-display text-2xl md:text-4xl text-mammoth-bone/30">VS</span>
              {/* Glow ring */}
              <div className="absolute inset-0 -m-3 rounded-full border border-mammoth-bone/10 animate-pulse-live" />
            </div>
          </motion.div>

          {/* VEGAS side */}
          <motion.div variants={fadeUp} className="flex-1 text-center md:text-left">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-vegas-gold/60 mb-1">Vegas</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-vegas-gold leading-none">
              KNIGHTS
            </h2>
          </motion.div>
        </div>

        {/* ── FIGHT NIGHT / GAME 3 ── */}
        <motion.div variants={fadeUp} className="text-center mb-6 md:mb-8">
          <h1 className="font-display text-[clamp(3rem,12vw,9rem)] leading-[0.85] text-mammoth-bone tracking-wide">
            FIGHT NIGHT
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-ice-500/50" />
            <span className="font-display text-base md:text-lg tracking-[0.3em] text-ice-400">
              GAME 3
            </span>
            <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-ice-500/50" />
          </div>
        </motion.div>

        {/* ── EYEBROW — FIRST HOME PLAYOFF GAME ── */}
        <motion.div
          variants={fadeUp}
          className="mb-6 md:mb-8 text-center"
        >
          <div className="inline-block border border-ice-500/30 rounded-lg px-5 py-2.5 backdrop-blur-sm bg-ice-900/20">
            <p className="font-display text-sm md:text-base tracking-[0.25em] text-ice-300">
              FIRST HOME PLAYOFF GAME. EVER.
            </p>
          </div>
        </motion.div>

        {/* ── COUNTDOWN ── */}
        <motion.div variants={scaleIn} className="mb-8">
          <CountdownTimer />
        </motion.div>

        {/* ── GAME INFO STRIP ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs md:text-sm text-mammoth-bone/60 mb-6"
        >
          <span>Delta Center · Salt Lake City</span>
          <span className="text-mammoth-bone/20">|</span>
          <span>7:30 PM MT / 9:30 PM ET</span>
          <span className="text-mammoth-bone/20">|</span>
          <span>{game3.broadcast.join(' · ')}</span>
        </motion.div>

        {/* ── SERIES SCORE ── */}
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-ice-800/60 flex items-center justify-center border border-ice-700/50">
              <span className="font-display text-xs text-ice-300">UTA</span>
            </div>
            <span className="font-display text-2xl md:text-3xl text-ice-300">1</span>
          </div>
          <span className="text-mammoth-bone/20 font-display text-lg">—</span>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl md:text-3xl text-vegas-gold">1</span>
            <div className="w-8 h-8 rounded-full bg-vegas-steel/30 flex items-center justify-center border border-vegas-gold/20">
              <span className="font-display text-xs text-vegas-gold">VGK</span>
            </div>
          </div>
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center mb-8">
          <a
            href="https://www.nhl.com/utah/"
            target="_blank"
            rel="noopener noreferrer"
            className="press-scale inline-flex items-center gap-2 bg-ice-500 hover:bg-ice-400 text-mammoth-black font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-ice-500/20"
          >
            Watch on TBS / HBO Max
          </a>
          <a
            href="https://www.nhl.com/utah/"
            target="_blank"
            rel="noopener noreferrer"
            className="press-scale inline-flex items-center gap-2 border border-mammoth-bone/20 text-mammoth-bone/80 hover:bg-mammoth-bone/5 font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Get Ready
          </a>
        </motion.div>

        {/* ── DEFEND THE CLIMB ── */}
        <motion.p
          variants={fadeIn}
          className="font-display text-xs md:text-sm tracking-[0.5em] text-ice-500/40"
        >
          DEFEND THE CLIMB
        </motion.p>
      </motion.div>

      {/* ═══ BELOW-HERO CARDS (storylines, gauge, info) ═══ */}
      <div className="relative z-20 -mt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Tusk Gauge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <TuskGauge />
          </motion.div>

          {/* Key Storylines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-surface-1 border border-surface-3 rounded-2xl p-6"
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

          {/* Game Info / Notes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface-1 border border-surface-3 rounded-2xl p-6"
          >
            <h3 className="font-display text-lg text-ice-300 mb-3">Game Notes</h3>
            <div className="space-y-2">
              <p className="text-xs text-ice-400">{lineupNote}</p>
              <p className="text-xs text-ice-400">{injuryNote}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
