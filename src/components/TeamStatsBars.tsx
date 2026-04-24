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
          className={`font-display text-lg tabular-nums ${
            utaLeads ? 'text-ice-300' : 'text-mammoth-bone/60'
          }`}
        >
          {format(utaVal)}
        </span>
        <span className="text-xs text-ice-400 uppercase tracking-wider">{label}</span>
        <span
          className={`font-display text-lg tabular-nums ${
            vgkLeads ? 'text-vegas-gold' : 'text-mammoth-bone/60'
          }`}
        >
          {format(vgkVal)}
        </span>
      </div>

      <div className="flex gap-1 h-3">
        {/* UTA bar (right-aligned) */}
        <div className="flex-1 flex justify-end">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${(utaVal / max) * 100}%` } : { width: 0 }}
            transition={{ duration: 0.8, delay, ease: 'easeOut' }}
            className={`h-full rounded-l-full ${
              utaLeads ? 'bg-gradient-to-l from-ice-400 to-ice-600' : 'bg-ice-800/50'
            }`}
          />
        </div>
        {/* VGK bar (left-aligned) */}
        <div className="flex-1">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${(vgkVal / max) * 100}%` } : { width: 0 }}
            transition={{ duration: 0.8, delay, ease: 'easeOut' }}
            className={`h-full rounded-r-full ${
              vgkLeads ? 'bg-gradient-to-r from-vegas-gold/70 to-vegas-gold' : 'bg-vegas-steel/30'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default function TeamStatsBars() {
  return (
    <section id="stats" className="py-12 md:py-20" aria-label="Team Stats">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-display text-display-lg text-mammoth-bone mb-2 text-center">
          Head to Head
        </h2>
        <p className="text-center text-ice-400 mb-8">Series Stats (2-game sample)</p>

        {/* Team headers */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-ice-800 flex items-center justify-center">
              <span className="font-display text-sm text-ice-300">UTA</span>
            </div>
            <div>
              <p className="font-display text-sm text-mammoth-bone">Utah Mammoth</p>
              <p className="text-xs text-ice-400">{seriesStats.UTA.record}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <p className="font-display text-sm text-mammoth-bone text-right">Vegas Golden Knights</p>
              <p className="text-xs text-vegas-gold/60 text-right">{seriesStats.VGK.record}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-vegas-steel/30 flex items-center justify-center">
              <span className="font-display text-sm text-vegas-gold">VGK</span>
            </div>
          </div>
        </div>

        {/* Stat bars */}
        <div className="space-y-6 bg-surface-1 border border-surface-3 rounded-2xl p-6">
          {statConfigs.map((cfg, i) => (
            <StatBar
              key={cfg.key}
              label={statLabels[cfg.key]}
              utaVal={seriesStats.UTA[cfg.key]}
              vgkVal={seriesStats.VGK[cfg.key]}
              max={cfg.max}
              format={cfg.format}
              higherIsBetter={cfg.higherIsBetter}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Trend narrative */}
        <div className="mt-6 bg-surface-1 border border-surface-3 rounded-2xl p-6">
          <h3 className="font-display text-sm text-ice-400 mb-3 uppercase tracking-wider">Trend Pattern</h3>
          <p className="text-sm text-mammoth-bone/80 leading-relaxed">
            Vegas has converted 2 of 5 power plays in the series (40%) while Utah is 0 for 5 (0%).
            Tonight&apos;s special-teams battle is the single highest-leverage matchup on the ice.
            Utah&apos;s penalty kill leaked in Game 1 (60%) then locked down in Game 2 — which version shows up at home?
          </p>
        </div>
      </div>
    </section>
  );
}
