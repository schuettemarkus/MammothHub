'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { seriesStats, statLabels } from '@/data/teamStats';

type StatKey = 'pp' | 'pk' | 'faceoff' | 'gfpg' | 'gapg';

const statConfigs: { key: StatKey; max: number; format: (v: number) => string; higherIsBetter: boolean }[] = [
  { key: 'pp', max: 100, format: (v) => `${v.toFixed(1)}%`, higherIsBetter: true },
  { key: 'pk', max: 100, format: (v) => `${v.toFixed(1)}%`, higherIsBetter: true },
  { key: 'faceoff', max: 100, format: (v) => `${v.toFixed(1)}%`, higherIsBetter: true },
  { key: 'gfpg', max: 6, format: (v) => v.toFixed(2), higherIsBetter: true },
  { key: 'gapg', max: 6, format: (v) => v.toFixed(2), higherIsBetter: false },
];

function StatBar({
  label,
  utaVal,
  vgkVal,
  max,
  format,
  higherIsBetter,
  delay,
}: {
  label: string;
  utaVal: number;
  vgkVal: number;
  max: number;
  format: (v: number) => string;
  higherIsBetter: boolean;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const utaLeads = higherIsBetter ? utaVal >= vgkVal : utaVal <= vgkVal;
  const vgkLeads = !utaLeads;

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span
          className={`font-display text-xl md:text-2xl tabular-nums ${
            utaLeads ? 'text-ice-300' : 'text-mammoth-bone/40'
          }`}
        >
          {format(utaVal)}
        </span>
        <span className="text-xs text-mammoth-bone/50 uppercase tracking-[0.15em] font-semibold">{label}</span>
        <span
          className={`font-display text-xl md:text-2xl tabular-nums ${
            vgkLeads ? 'text-vegas-gold' : 'text-mammoth-bone/40'
          }`}
        >
          {format(vgkVal)}
        </span>
      </div>

      <div className="flex gap-0.5 h-3 md:h-4">
        <div className="flex-1 flex justify-end">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${(utaVal / max) * 100}%` } : { width: 0 }}
            transition={{ duration: 1, delay, ease: 'easeOut' as const }}
            className={`h-full rounded-l-full ${
              utaLeads
                ? 'bg-gradient-to-l from-ice-400 to-ice-600 shadow-sm shadow-ice-500/30'
                : 'bg-ice-800/30'
            }`}
          />
        </div>
        <div className="flex-1">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${(vgkVal / max) * 100}%` } : { width: 0 }}
            transition={{ duration: 1, delay, ease: 'easeOut' as const }}
            className={`h-full rounded-r-full ${
              vgkLeads
                ? 'bg-gradient-to-r from-vegas-gold/70 to-vegas-gold shadow-sm shadow-vegas-gold/20'
                : 'bg-vegas-steel/20'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default function TeamStatsBars() {
  return (
    <section id="stats" className="relative py-16 md:py-24 overflow-hidden" aria-label="Head to Head">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-mammoth-black pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(45,109,181,0.06) 0%, transparent 40%, transparent 60%, rgba(180,151,90,0.04) 100%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-ice-500 mb-2 font-semibold">Series Stats</p>
          <h2 className="font-display text-4xl md:text-6xl text-mammoth-bone tracking-wide">
            HEAD TO HEAD
          </h2>
          <p className="text-sm text-ice-400/60 mt-2">2-game sample · Confirmed stats</p>
        </motion.div>

        {/* Team headers — split composition style */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-ice-800/60 border border-ice-600/30 flex items-center justify-center">
              <span className="font-display text-base text-ice-300">UTA</span>
            </div>
            <div>
              <p className="font-display text-lg text-mammoth-bone">Utah Mammoth</p>
              <p className="text-xs text-ice-400">{seriesStats.UTA.record}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-display text-lg text-mammoth-bone">Vegas Golden Knights</p>
              <p className="text-xs text-vegas-gold/60">{seriesStats.VGK.record}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-vegas-steel/30 border border-vegas-gold/20 flex items-center justify-center">
              <span className="font-display text-base text-vegas-gold">VGK</span>
            </div>
          </div>
        </motion.div>

        {/* Stat bars */}
        <div className="space-y-6 bg-surface-1/80 backdrop-blur-sm border border-surface-3 rounded-2xl p-6 md:p-8">
          {statConfigs.map((cfg, i) => (
            <StatBar
              key={cfg.key}
              label={statLabels[cfg.key]}
              utaVal={seriesStats.UTA[cfg.key]}
              vgkVal={seriesStats.VGK[cfg.key]}
              max={cfg.max}
              format={cfg.format}
              higherIsBetter={cfg.higherIsBetter}
              delay={i * 0.12}
            />
          ))}
        </div>

        {/* Trend Pattern */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-[0.4em] text-ice-500 mb-2 font-semibold">Analysis</p>
            <h3 className="font-display text-3xl md:text-4xl text-mammoth-bone tracking-wide">
              TREND PATTERNS
            </h3>
          </div>

          <div className="bg-surface-1/80 backdrop-blur-sm border border-surface-3 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex gap-3">
              <span className="text-ice-500 font-display text-lg shrink-0">01</span>
              <p className="text-sm md:text-base text-mammoth-bone/80 leading-relaxed">
                Vegas has converted 2 of 5 power plays in the series (40%) while Utah is 0 for 5 (0%).
                Tonight&apos;s special-teams battle is the single highest-leverage matchup on the ice.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-ice-500 font-display text-lg shrink-0">02</span>
              <p className="text-sm md:text-base text-mammoth-bone/80 leading-relaxed">
                Utah&apos;s penalty kill leaked in Game 1 (60%) then locked down in Game 2 — which version shows up at home?
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-ice-500 font-display text-lg shrink-0">03</span>
              <p className="text-sm md:text-base text-mammoth-bone/80 leading-relaxed">
                VGK winning 52.5% of faceoffs gives them extra possessions. Utah needs to close this gap at Delta Center to control pace.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
