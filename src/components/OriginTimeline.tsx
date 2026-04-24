'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { milestones } from '@/data/timeline';

function TimelineNode({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isTonight = milestone.tone === 'history' && milestone.date === '2026-04-24';

  const toneColors: Record<string, string> = {
    origin: 'border-ice-600 bg-ice-900/50',
    identity: 'border-ice-500 bg-ice-800/50',
    milestone: 'border-ice-400 bg-ice-700/30',
    history: 'border-ice-300 bg-ice-600/20',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative pl-8 md:pl-12 pb-8 last:pb-0 ${isTonight ? 'scale-[1.02]' : ''}`}
    >
      {/* Timeline line */}
      <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-ice-600 to-surface-3" />

      {/* Timeline dot */}
      <div
        className={`absolute left-1 md:left-3 top-1.5 w-5 h-5 rounded-full border-2 ${
          isTonight ? 'border-ice-300 bg-ice-500 animate-pulse-live' : toneColors[milestone.tone]?.split(' ')[0] + ' bg-surface-1'
        }`}
      />

      {/* Content */}
      <div
        className={`rounded-xl border p-4 md:p-5 ${
          isTonight
            ? 'border-ice-400 bg-surface-2 shadow-lg shadow-ice-500/10'
            : 'border-surface-3 bg-surface-1'
        }`}
      >
        <span className="text-xs uppercase tracking-wider text-ice-400 font-semibold">
          {milestone.date}
        </span>
        <h3
          className={`font-display text-lg md:text-xl mt-1 ${
            isTonight ? 'text-ice-200' : 'text-mammoth-bone'
          }`}
        >
          {milestone.title}
        </h3>
        <p className="text-sm text-mammoth-bone/70 mt-2 leading-relaxed">{milestone.body}</p>
      </div>
    </motion.div>
  );
}

export default function OriginTimeline() {
  return (
    <section id="timeline" className="py-12 md:py-20 relative" aria-label="Origin Timeline">
      {/* Parallax mountain background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-64 opacity-5"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon
            points="0,200 150,100 300,160 450,40 600,130 750,30 900,110 1050,60 1200,80 1200,200"
            fill="currentColor"
            className="text-ice-700"
          />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <h2 className="font-display text-display-lg text-mammoth-bone mb-2 text-center">
          From Idea to Ice
        </h2>
        <p className="text-center text-ice-400 mb-12">
          The journey to tonight
        </p>

        <div className="relative">
          {milestones.map((milestone, index) => (
            <TimelineNode key={milestone.date} milestone={milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
