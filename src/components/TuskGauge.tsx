'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { edgeInputs, compositeEdge } from '@/data/markets';

export default function TuskGauge() {
  const [expanded, setExpanded] = useState(false);
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);

  const utaPct = compositeEdge.uta * 100;
  const vgkPct = compositeEdge.vgk * 100;

  return (
    <div className="w-full bg-surface-1 border border-surface-3 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-ice-300">The Tusk Gauge</h3>
        <span className="text-xs text-ice-400 uppercase tracking-wider">Confidence / Edge Meter</span>
      </div>

      {/* Main Gauge */}
      <div className="relative mb-4">
        {/* Labels */}
        <div className="flex justify-between mb-2">
          <span className="font-display text-xl text-ice-300">UTA {utaPct.toFixed(1)}%</span>
          <span className="font-display text-xl text-vegas-gold">VGK {vgkPct.toFixed(1)}%</span>
        </div>

        {/* Bar */}
        <div className="relative h-8 rounded-full overflow-hidden bg-surface-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${utaPct}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-ice-600 to-ice-400 rounded-l-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${vgkPct}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute right-0 top-0 h-full bg-gradient-to-l from-vegas-gold to-vegas-gold/70 rounded-r-full"
          />
          {/* Needle / center marker */}
          <div
            className="absolute top-0 h-full w-0.5 bg-mammoth-bone z-10"
            style={{ left: `${utaPct}%` }}
          />
        </div>
      </div>

      {/* Edge Label */}
      <p className="text-center font-display text-lg text-mammoth-bone mb-2">
        {compositeEdge.label}
      </p>

      {/* Why Paragraph */}
      <p className="text-sm text-mammoth-bone/70 leading-relaxed mb-4">
        {compositeEdge.whyParagraph}
      </p>

      {/* Disclaimer */}
      <p className="text-xs text-ice-400 italic mb-4">
        {compositeEdge.caveat}
      </p>

      {/* Expand / Collapse Inputs */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="press-scale w-full text-center text-sm text-ice-400 hover:text-ice-300 transition-colors py-2 border-t border-surface-3"
        aria-expanded={expanded}
        aria-controls="edge-inputs"
      >
        {expanded ? 'Hide Breakdown ▲' : 'Show Breakdown ▼'}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            id="edge-inputs"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              {edgeInputs.map((input) => {
                const isHovered = hoveredInput === input.key;
                const utaW = input.utaScore * 100;
                const vgkW = input.vgkScore * 100;

                return (
                  <div
                    key={input.key}
                    className={`p-3 rounded-lg border transition-colors cursor-default ${
                      isHovered ? 'border-ice-500 bg-surface-2' : 'border-surface-3 bg-surface-1'
                    }`}
                    onMouseEnter={() => setHoveredInput(input.key)}
                    onMouseLeave={() => setHoveredInput(null)}
                    onFocus={() => setHoveredInput(input.key)}
                    onBlur={() => setHoveredInput(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${input.label}: Utah ${utaW.toFixed(1)}%, Vegas ${vgkW.toFixed(1)}%`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-mammoth-bone">{input.label}</span>
                      <span className="text-xs text-ice-400">
                        Weight: {(input.weight * 100).toFixed(0)}%
                      </span>
                    </div>

                    {/* Mini bar */}
                    <div className="h-2 rounded-full overflow-hidden bg-surface-3 mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-ice-600 to-ice-400 rounded-l-full transition-all"
                        style={{ width: `${utaW}%` }}
                      />
                    </div>

                    {isHovered && (
                      <p className="text-xs text-mammoth-bone/60 mt-1">{input.explanation}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
