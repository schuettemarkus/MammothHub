'use client';

import { useState, useEffect } from 'react';

const PUCK_DROP = new Date('2026-04-24T19:30:00-06:00').getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft | null {
  const now = Date.now();
  const diff = PUCK_DROP - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function getGameState(): 'PRE' | 'LIVE' | 'POST' {
  const now = Date.now();
  if (now < PUCK_DROP) return 'PRE';
  // Approximate: game lasts ~3 hours
  if (now < PUCK_DROP + 3 * 60 * 60 * 1000) return 'LIVE';
  return 'POST';
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [gameState, setGameState] = useState<'PRE' | 'LIVE' | 'POST'>('PRE');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    setGameState(getGameState());

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
      setGameState(getGameState());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-display text-2xl md:text-3xl text-ice-300">GAME 3 TONIGHT</span>
      </div>
    );
  }

  if (gameState === 'LIVE') {
    return (
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
        </span>
        <span className="font-display text-3xl md:text-4xl text-red-400">LIVE NOW</span>
      </div>
    );
  }

  if (gameState === 'POST') {
    return (
      <span className="font-display text-3xl md:text-4xl text-ice-300">FINAL</span>
    );
  }

  if (!timeLeft) return null;

  const units = [
    { label: 'D', value: timeLeft.days },
    { label: 'H', value: timeLeft.hours },
    { label: 'M', value: timeLeft.minutes },
    { label: 'S', value: timeLeft.seconds },
  ].filter((u) => u.value > 0 || u.label !== 'D');

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs uppercase tracking-widest text-ice-400">Puck Drop In</span>
      <div className="flex items-baseline gap-1 md:gap-2">
        {units.map((u) => (
          <div key={u.label} className="flex items-baseline gap-0.5">
            <span className="font-display text-3xl md:text-5xl text-mammoth-bone tabular-nums">
              {String(u.value).padStart(2, '0')}
            </span>
            <span className="text-xs md:text-sm text-ice-400 font-semibold">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
