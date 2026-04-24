// SOURCE: NHL Stats API — /api/v1/tournaments/playoff-series
// All scores and dates confirmed from the project brief. Unplayed games have no scores.
import { Game } from './types';

export const series: Game[] = [
  {
    id: 'r1-g1',
    seriesGame: 1,
    status: 'PLAYED',
    date: '2026-04-19T19:00:00-07:00', // Vegas local
    venue: 'T-Mobile Arena',
    home: 'VGK',
    away: 'UTA',
    broadcast: ['TBS', 'HBO Max'],
    score: { home: 4, away: 2 },
    boxscore: {
      shots: { home: 32, away: 28 },
      faceoffs: { home: 31, away: 27 },
      hits: { home: 24, away: 19 },
      blocks: { home: 14, away: 18 },
      pim: { home: 6, away: 10 },
    },
    storylines: [
      'Vegas controlled Game 1 with a dominant power play, converting 2-for-3.',
      'Utah struggled on the penalty kill, allowing two PP goals in the second period.',
      'First-ever playoff game in Utah Mammoth franchise history.',
    ],
  },
  {
    id: 'r1-g2',
    seriesGame: 2,
    status: 'PLAYED',
    date: '2026-04-21T19:00:00-07:00',
    venue: 'T-Mobile Arena',
    home: 'VGK',
    away: 'UTA',
    broadcast: ['TBS', 'HBO Max'],
    score: { home: 2, away: 3 },
    boxscore: {
      shots: { home: 30, away: 34 },
      faceoffs: { home: 30, away: 27 },
      hits: { home: 21, away: 27 },
      blocks: { home: 12, away: 16 },
      pim: { home: 8, away: 4 },
    },
    storylines: [
      'Utah steals Game 2 in Vegas — first playoff win in franchise history.',
      'The Mammoth penalty kill locked down after a shaky Game 1.',
      'Series tied 1-1 heading back to Salt Lake City.',
    ],
  },
  {
    id: 'r1-g3',
    seriesGame: 3,
    status: 'SCHEDULED',
    date: '2026-04-24T19:30:00-06:00', // Mountain Time, Salt Lake City
    venue: 'Delta Center',
    home: 'UTA',
    away: 'VGK',
    broadcast: ['TBS', 'HBO Max', 'UTAH16', 'Scripps'],
    storylines: [
      'First home playoff game in Utah Mammoth franchise history.',
      'VGK power play humming at 40%; Utah\'s PP still searching for its first goal of the series.',
      'Delta Center has never hosted a playoff game. Tonight it does.',
    ],
  },
  {
    id: 'r1-g4',
    seriesGame: 4,
    status: 'SCHEDULED',
    date: '2026-04-27T00:00:00-06:00', // Time TBD
    venue: 'Delta Center',
    home: 'UTA',
    away: 'VGK',
    broadcast: [],
    storylines: [],
  },
  {
    id: 'r1-g5',
    seriesGame: 5,
    status: 'IF_NECESSARY',
    date: '2026-04-29T00:00:00-07:00',
    venue: 'T-Mobile Arena',
    home: 'VGK',
    away: 'UTA',
    broadcast: [],
    storylines: [],
  },
  {
    id: 'r1-g6',
    seriesGame: 6,
    status: 'IF_NECESSARY',
    date: '2026-05-01T00:00:00-06:00',
    venue: 'Delta Center',
    home: 'UTA',
    away: 'VGK',
    broadcast: [],
    storylines: [],
  },
  {
    id: 'r1-g7',
    seriesGame: 7,
    status: 'IF_NECESSARY',
    date: '2026-05-03T00:00:00-07:00',
    venue: 'T-Mobile Arena',
    home: 'VGK',
    away: 'UTA',
    broadcast: [],
    storylines: [],
  },
];

export const seriesScore = { UTA: 1, VGK: 1 };
