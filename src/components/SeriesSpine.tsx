'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { series, seriesScore } from '@/data/series';
import { teams } from '@/data/teams';
import type { Game } from '@/data/types';

function GameCard({ game, onClick }: { game: Game; onClick: () => void }) {
  const isPlayed = game.status === 'PLAYED';
  const isScheduled = game.status === 'SCHEDULED';
  const isIfNecessary = game.status === 'IF_NECESSARY';
  const isTonight = game.seriesGame === 3;

  const homeTeam = teams[game.home];
  const awayTeam = teams[game.away];

  const dateStr = new Date(game.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <button
      onClick={isIfNecessary ? undefined : onClick}
      disabled={isIfNecessary}
      className={`press-scale relative flex-shrink-0 w-64 md:w-72 rounded-xl border p-4 transition-all text-left ${
        isTonight
          ? 'border-ice-500 bg-surface-2 shadow-lg shadow-ice-500/10'
          : isPlayed
          ? 'border-surface-3 bg-surface-1 hover:border-ice-700'
          : isIfNecessary
          ? 'border-surface-3/50 bg-surface-1/50 opacity-50 cursor-not-allowed'
          : 'border-surface-3 bg-surface-1 hover:border-ice-700'
      }`}
      aria-label={`Game ${game.seriesGame}${isPlayed && game.score ? `: ${awayTeam.abbr} ${game.score.away} - ${homeTeam.abbr} ${game.score.home}` : ''}`}
    >
      {/* Tonight indicator */}
      {isTonight && (
        <div className="absolute -top-2 left-4 flex items-center gap-1.5 bg-ice-500 text-mammoth-black text-xs font-bold px-2 py-0.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-live absolute inline-flex h-full w-full rounded-full bg-mammoth-black opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-mammoth-black" />
          </span>
          TONIGHT
        </div>
      )}

      {/* Game number & date */}
      <div className="flex justify-between items-center mb-3">
        <span className="font-display text-lg text-ice-300">Game {game.seriesGame}</span>
        <span className="text-xs text-ice-400">{dateStr}</span>
      </div>

      {/* Teams & Score */}
      {isIfNecessary ? (
        <div className="flex flex-col items-center justify-center py-4">
          <span className="font-display text-lg text-surface-3">IF NECESSARY</span>
          <span className="text-xs text-ice-400/50 mt-1">Series must reach Game {game.seriesGame}</span>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Away team row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: game.away === 'UTA' ? '#0f2240' : '#333f48',
                  color: game.away === 'UTA' ? '#7bb3e8' : '#b4975a',
                }}
              >
                {awayTeam.abbr}
              </div>
              <span className="text-sm text-mammoth-bone">{awayTeam.name}</span>
            </div>
            {isPlayed && game.score && (
              <span className="font-display text-xl text-mammoth-bone tabular-nums">
                {game.score.away}
              </span>
            )}
          </div>

          {/* Home team row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: game.home === 'UTA' ? '#0f2240' : '#333f48',
                  color: game.home === 'UTA' ? '#7bb3e8' : '#b4975a',
                }}
              >
                {homeTeam.abbr}
              </div>
              <span className="text-sm text-mammoth-bone">{homeTeam.name}</span>
            </div>
            {isPlayed && game.score && (
              <span className="font-display text-xl text-mammoth-bone tabular-nums">
                {game.score.home}
              </span>
            )}
          </div>

          {/* Status badge */}
          <div className="pt-2 border-t border-surface-3 flex items-center justify-between">
            <span className="text-xs text-ice-400">{game.venue}</span>
            <span
              className={`text-xs font-semibold uppercase ${
                isPlayed ? 'text-ice-400' : isTonight ? 'text-ice-300' : 'text-ice-400/60'
              }`}
            >
              {isPlayed ? 'FINAL' : isTonight ? '7:30 PM MT' : isScheduled ? 'TBD' : ''}
            </span>
          </div>
        </div>
      )}
    </button>
  );
}

function GameDetailDrawer({ game, onClose }: { game: Game; onClose: () => void }) {
  const homeTeam = teams[game.home];
  const awayTeam = teams[game.away];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end md:items-center md:justify-end"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-mammoth-black/80" />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 w-full md:w-[480px] md:h-full bg-surface-1 border-t md:border-l border-surface-3 rounded-t-2xl md:rounded-none p-6 max-h-[80vh] md:max-h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ice-400 hover:text-mammoth-bone transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        <h3 className="font-display text-2xl text-ice-300 mb-1">
          Game {game.seriesGame}
        </h3>
        <p className="text-sm text-ice-400 mb-6">
          {new Date(game.date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}{' '}
          · {game.venue}
        </p>

        {/* Score */}
        {game.status === 'PLAYED' && game.score && (
          <div className="bg-surface-2 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-lg text-mammoth-bone">{awayTeam.abbr}</span>
              <span className="font-display text-3xl text-mammoth-bone tabular-nums">{game.score.away}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-display text-lg text-mammoth-bone">{homeTeam.abbr}</span>
              <span className="font-display text-3xl text-mammoth-bone tabular-nums">{game.score.home}</span>
            </div>
            <div className="text-center mt-2">
              <span className="text-xs uppercase tracking-wider text-ice-400">Final</span>
            </div>
          </div>
        )}

        {/* Boxscore */}
        {game.boxscore && (
          <div className="mb-6">
            <h4 className="font-display text-sm text-ice-400 mb-3">Box Score</h4>
            <div className="space-y-2">
              {Object.entries(game.boxscore).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="text-ice-400 capitalize">{key}</span>
                  <div className="flex gap-8">
                    <span className="text-mammoth-bone tabular-nums w-8 text-right">{val.away}</span>
                    <span className="text-mammoth-bone tabular-nums w-8 text-right">{val.home}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Storylines */}
        {game.storylines.length > 0 && (
          <div>
            <h4 className="font-display text-sm text-ice-400 mb-3">Storylines</h4>
            <ul className="space-y-2">
              {game.storylines.map((line, i) => (
                <li key={i} className="flex gap-2 text-sm text-mammoth-bone/80">
                  <span className="text-ice-500 shrink-0">▸</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Scheduled game note */}
        {game.status === 'SCHEDULED' && !game.score && (
          <div className="bg-surface-2 rounded-xl p-4 text-center">
            <p className="text-sm text-ice-400">
              {game.seriesGame === 3 ? 'Tonight — 7:30 PM MT' : 'Time TBD'}
            </p>
            <p className="text-xs text-ice-400/60 mt-1">Pre-game details will be available closer to game time.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function SeriesSpine() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <section id="series" className="py-12 md:py-20" aria-label="Playoff Series">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-display-lg text-mammoth-bone mb-2 text-center">
          The Best of Seven
        </h2>
        <p className="text-center text-ice-400 mb-8">
          Round 1 · Utah Mammoth vs Vegas Golden Knights
        </p>

        {/* Horizontal scroll on mobile, flex on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:flex-wrap md:justify-center">
          {series.map((game) => (
            <div key={game.id} className="snap-start">
              <GameCard game={game} onClick={() => setSelectedGame(game)} />
            </div>
          ))}
        </div>

        {/* Series Score Footer */}
        <div className="mt-8 text-center">
          <span className="font-display text-2xl tracking-wider">
            <span className="text-ice-300">UTA {seriesScore.UTA}</span>
            <span className="text-surface-3 mx-3">—</span>
            <span className="text-vegas-gold">{seriesScore.VGK} VGK</span>
          </span>
          <p className="text-sm text-ice-400 mt-1 uppercase tracking-wider">Series Tied 1-1</p>
        </div>
      </div>

      {/* Game Detail Drawer */}
      <AnimatePresence>
        {selectedGame && (
          <GameDetailDrawer game={selectedGame} onClose={() => setSelectedGame(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
