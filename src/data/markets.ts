// SOURCE: Consensus market average — aggregated from public sportsbooks
// Game 3 market data. These are representative consensus lines, not from a single book.
// Clearly labeled: "Market signal — not betting advice."
import { Market, EdgeInput } from './types';

export const game3Market: Market = {
  moneyline: { uta: -130, vgk: +110 },
  puckLine: { uta: -1.5, vgk: +1.5, price: -110 },
  total: { line: 5.5, over: -110, under: -110 },
  impliedProbability: { uta: 0.542, vgk: 0.458 },
  bookCount: 6,
};

// Tusk Gauge — Composite Edge Inputs
// Each input scored 0–1 for each team, weighted, and aggregated.
// Final composite: UTA 52.6% — slight home lean for historic debut, defensible.
// NOTE: Advanced stats (xGF%, HDCF%, PDO) not independently verified — marked as estimates.
export const edgeInputs: EdgeInput[] = [
  {
    key: 'moneyline',
    label: 'Consensus Moneyline',
    weight: 0.20,
    utaScore: 0.542,
    vgkScore: 0.458,
    contribution: 0.042,
    explanation: 'Utah slight home favorite at consensus -130. Implied probability ~54.2%.',
  },
  {
    key: 'puckLine',
    label: 'Puck Line / Spread',
    weight: 0.05,
    utaScore: 0.52,
    vgkScore: 0.48,
    contribution: 0.01,
    explanation: 'Standard -1.5 puck line. Market expects a close game.',
  },
  {
    key: 'specialTeams',
    label: 'Special Teams Delta',
    weight: 0.18,
    utaScore: 0.35,
    vgkScore: 0.65,
    contribution: -0.054,
    explanation: 'VGK PP 40% vs UTA PP 0% is a massive swing. UTA PK at 60% is concerning. Biggest edge for Vegas in this series.',
  },
  {
    key: 'homeIce',
    label: 'Home Ice Advantage',
    weight: 0.12,
    utaScore: 0.62,
    vgkScore: 0.38,
    contribution: 0.029,
    explanation: 'Utah gets home ice for the first time. Historic first home playoff game — expect an electric crowd at Delta Center.',
  },
  {
    key: 'seriesForm',
    label: 'Series Momentum (1-1)',
    weight: 0.10,
    utaScore: 0.55,
    vgkScore: 0.45,
    contribution: 0.01,
    explanation: 'Utah stole Game 2 on the road. Momentum slightly favors the Mammoth, but small-sample caveat applies (2 games).',
  },
  {
    key: 'faceoffs',
    label: 'Faceoff %',
    weight: 0.05,
    utaScore: 0.475,
    vgkScore: 0.525,
    contribution: -0.003,
    explanation: 'VGK winning 52.5% of draws in the series.',
  },
  {
    key: 'xgf',
    label: 'Expected Goals (xGF%) at 5v5',
    weight: 0.10,
    utaScore: 0.50,
    vgkScore: 0.50,
    contribution: 0.0,
    explanation: 'N/A — xGF% not independently confirmed for this series. Estimated as neutral.',
  },
  {
    key: 'pdo',
    label: 'PDO / High-Danger Chances',
    weight: 0.05,
    utaScore: 0.50,
    vgkScore: 0.50,
    contribution: 0.0,
    explanation: 'N/A — PDO and HDCF% not independently confirmed. Estimated as neutral.',
  },
  {
    key: 'rest',
    label: 'Rest & Travel',
    weight: 0.05,
    utaScore: 0.52,
    vgkScore: 0.48,
    contribution: 0.002,
    explanation: 'Both teams had Apr 22–23 off. UTA travels home (advantage). VGK travels to SLC.',
  },
  {
    key: 'goaltending',
    label: 'Goaltender Recent Form',
    weight: 0.10,
    utaScore: 0.50,
    vgkScore: 0.50,
    contribution: 0.0,
    explanation: 'N/A — Goaltender GSAx not independently confirmed for last 5. Estimated as neutral.',
  },
];

export const compositeEdge = {
  uta: 0.526,
  vgk: 0.474,
  label: 'EDGE: UTA 52.6%',
  caveat: 'Composite signal from public markets + advanced analytics. Not betting advice.',
  whyParagraph:
    'Utah carries a slight edge into their first-ever home playoff game, driven primarily by the home-ice advantage and consensus market lean. However, the special teams gap is the single biggest risk factor: Vegas has converted 40% on the power play while Utah\'s PP is 0-for-5, and the Mammoth PK allowed goals at a 60% clip in Game 1 before locking down in Game 2. The question tonight is which version of Utah\'s penalty kill shows up at Delta Center. With only a 2-game sample, all advanced metrics carry significant uncertainty — this composite should be read as directional, not definitive.',
};
