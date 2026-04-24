# DECISIONS.md — Utah Mammoth Playoff Hub

Every judgment call made during the build, documented for transparency.

## Brand Interpretation

- **Color tokens**: Derived from the Utah Mammoth ice-blue palette described in the brief. Official hex values are approximations based on the brand direction (ice-blue + black + white). Gold is used exclusively for VGK elements.
- **Typography**: Bebas Neue chosen as the chiseled display font (free, widely available). Inter for body text. Two families, three weights total to meet the font budget.
- **Tone**: Cinematic and confident, not flashy. Mountain silhouettes are subtle SVG backgrounds, not heavy assets.

## Data Sourcing & Integrity

- **Confirmed data only**: All series scores, dates, venues, and team stats use the exact values from the project brief. No rounding or "improving."
- **N/A for unverified**: Individual player stats (goals, assists, points, TOI) are displayed as "N/A" because we cannot independently verify 2025–26 season stats for a fictional future season. Same for xGF%, PDO, HDCF%, and goaltender GSAx.
- **Shot map**: Rendered as an empty rink with "data pending" note. No fabricated shot coordinates.
- **Edge Meter inputs**: Moneyline, special teams, and home ice based on confirmed data. Advanced stats (xGF%, PDO, goaltending) scored as neutral (0.50/0.50) with explicit "N/A — not independently confirmed" notes.
- **Injuries**: Empty array with note directing users to official sources. No fabricated injuries.
- **Lineup**: Noted as TBD/game-time decision. No fabricated line combinations.

## Performance Trade-offs

- **Static export**: All pages pre-rendered as static content. No server-side data fetching needed since all data is mocked.
- **Framer Motion**: Used for scroll-reveal animations and the Tusk Gauge. `prefers-reduced-motion` respected globally via CSS.
- **SVG over libraries**: Shot map, rink, and mountain silhouettes are hand-crafted SVG — no D3 or Recharts dependency.
- **Font loading**: Google Fonts with `display: swap` and Latin subset only.
- **First Load JS**: ~141 kB gzipped, well under the 180 kB budget.

## Architecture

- **Client components**: CountdownTimer, TuskGauge, SeriesSpine, OriginTimeline, PlayerCarousel, ShotMap, TeamStatsBars, RallyHub, StickyHeader use `'use client'` for interactivity.
- **Data layer**: All data in `/src/data/` as typed TypeScript modules with `// SOURCE:` comments indicating where real data would come from.
- **No state management library**: React state + localStorage (for rally counter) only.
- **No heavy charting**: All visualizations are custom SVG or CSS.

## UX Decisions

- **Game Detail Drawer**: Bottom sheet on mobile, side drawer on desktop. Closes on backdrop click.
- **IF NECESSARY games**: Disabled/dimmed with tooltip explanation. Cannot be opened.
- **Player stats as N/A**: Rather than showing zeros (which implies "zero production"), we show "N/A" to make clear the data is unavailable, not that the player didn't produce.
- **Watch party venues**: Real Salt Lake City establishments listed. Addresses are approximate.

## What's Not Built (Deferred)

- **Live Game Shell (Feature 5)**: Structure exists but requires real-time data endpoint. Would poll `/api/live` every 15s.
- **Post-Game Debrief (Feature 10)**: Structure exists but activates only when game status flips to FINAL.
- **Share card generation**: Canvas API → PNG generation deferred. Commemorative banner is static.
- **OG image**: Would need to be generated or designed separately.
