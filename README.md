# TUSKS UP — Utah Mammoth Playoff Hub

A single-page, mobile-first interactive hub for the 2026 Stanley Cup Playoffs, Round 1: **Utah Mammoth vs Vegas Golden Knights**.

**Game 3 — First Home Playoff Game in Franchise History**
April 24, 2026 · 7:30 PM MT · Delta Center, Salt Lake City

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

1. **Hero Command Center** — Countdown to puck drop, matchup card, broadcast info, key storylines
2. **Playoff Series Spine** — All 7 potential games as interactive cards with detail drawers
3. **Origin Timeline** — Scroll-animated franchise history from acquisition to tonight
4. **Tusk Gauge** — Composite confidence meter aggregating markets + analytics
5. **Player Spotlight Carousel** — Key Mammoth skaters with playoff stats
6. **Shot Map** — Interactive SVG rink (data pending API integration)
7. **Team Stats Bars** — Animated head-to-head comparison with confirmed series stats
8. **Rally Hub** — Delta Center info, watch parties, chant guide, fan energy meter

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with custom design tokens
- Framer Motion for animations
- Hand-crafted SVG for all data visualizations
- No heavy charting libraries

## Data Integrity

All data displayed is either:
- **Confirmed**: Series scores, dates, team stats from the project brief
- **N/A**: Anything not independently verifiable (player stats, advanced analytics, shot locations)

No fabricated or hallucinated data. See [DECISIONS.md](./DECISIONS.md) for full rationale.

## Swapping Mocks for Real APIs

All data lives in `/src/data/`. Each file has `// SOURCE:` comments indicating the real data source:

| File | Real Source |
|---|---|
| `series.ts` | NHL Stats API — playoff series endpoint |
| `teamStats.ts` | NHL Stats API — team stats |
| `players.ts` | NHL Stats API — roster + player stats |
| `markets.ts` | Aggregated sportsbook consensus |
| `shotmap.ts` | Natural Stat Trick / NHL Stats API |
| `timeline.ts` | Static content (franchise history) |
| `rally.ts` | Static content (venue info) |

Replace the static exports with `fetch()` calls to real endpoints. Types are already defined in `types.ts`.

## Deploy to GitHub Pages

The project is configured for static export via GitHub Actions. Push to `main` to trigger deployment.

## Performance

- First Load JS: ~141 KB gzipped (budget: 180 KB)
- Static pre-rendered pages
- See [perf-budget.md](./perf-budget.md) for full breakdown
