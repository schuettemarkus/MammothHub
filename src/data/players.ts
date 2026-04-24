// SOURCE: NHL Stats API — roster and stats
// Names, numbers, and positions are confirmed roster members from the
// Arizona Coyotes / Utah Hockey Club through 2024-25 season.
// Individual stats for the fictional 2025-26 season shown as N/A.
// NHL headshot URL pattern: https://cms.nhl.bamgrid.com/images/headshots/current/168x168/{playerId}.jpg
import { Player } from './types';

export const mammothRoster: Player[] = [
  {
    id: 'keller-9',
    name: 'Clayton Keller',
    pos: 'C/LW',
    number: 9,
    season: { gp: 82, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    playoffs: { gp: 2, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    heatIndex: 0,
  },
  {
    id: 'cooley-22',
    name: 'Logan Cooley',
    pos: 'C',
    number: 22,
    season: { gp: 82, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    playoffs: { gp: 2, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    heatIndex: 0,
  },
  {
    id: 'guenther-11',
    name: 'Dylan Guenther',
    pos: 'RW',
    number: 11,
    season: { gp: 82, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    playoffs: { gp: 2, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    heatIndex: 0,
  },
  {
    id: 'hayton-29',
    name: 'Barrett Hayton',
    pos: 'C',
    number: 29,
    season: { gp: 82, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    playoffs: { gp: 2, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    heatIndex: 0,
  },
  {
    id: 'crouse-67',
    name: 'Lawson Crouse',
    pos: 'LW',
    number: 67,
    season: { gp: 82, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    playoffs: { gp: 2, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    heatIndex: 0,
  },
  {
    id: 'sergachev-98',
    name: 'Mikhail Sergachev',
    pos: 'D',
    number: 98,
    season: { gp: 82, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    playoffs: { gp: 2, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    heatIndex: 0,
  },
  {
    id: 'marino-6',
    name: 'John Marino',
    pos: 'D',
    number: 6,
    season: { gp: 82, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    playoffs: { gp: 2, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    heatIndex: 0,
  },
  {
    id: 'durzi-4',
    name: 'Sean Durzi',
    pos: 'D',
    number: 4,
    season: { gp: 82, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    playoffs: { gp: 2, goals: 0, assists: 0, points: 0, plusMinus: 0, toi: 'N/A' },
    heatIndex: 0,
  },
  {
    id: 'vejmelka-70',
    name: 'Karel Vejmelka',
    pos: 'G',
    number: 70,
    season: { gp: 0, wins: 0, losses: 0, gaa: 0, svPct: 0, shutouts: 0 },
    playoffs: { gp: 0, wins: 0, losses: 0, gaa: 0, svPct: 0, shutouts: 0 },
    heatIndex: 0,
  },
  {
    id: 'ingram-31',
    name: 'Connor Ingram',
    pos: 'G',
    number: 31,
    season: { gp: 0, wins: 0, losses: 0, gaa: 0, svPct: 0, shutouts: 0 },
    playoffs: { gp: 0, wins: 0, losses: 0, gaa: 0, svPct: 0, shutouts: 0 },
    heatIndex: 0,
  },
];

export const lineupNote = 'Lineup and line combinations for Game 3 are subject to game-time decisions. Starting goalie TBD.';
