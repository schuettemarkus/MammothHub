# Performance Budget — Utah Mammoth Playoff Hub

## Targets vs Actuals

| Metric | Target | Actual | Status |
|---|---|---|---|
| LCP | < 1.2s | TBD (static site, expected sub-1s) | Likely meets |
| CLS | < 0.05 | 0 (no layout shifts — fonts swap, images have dimensions) | Meets |
| INP | < 200ms | TBD (all interactions are simple state updates) | Likely meets |
| Total JS (initial) | < 180 KB gzipped | ~141 KB gzipped | **Meets** |
| Lighthouse Mobile Perf | ≥ 95 | TBD (run after deployment) | — |
| Lighthouse A11y | ≥ 95 | TBD | — |

## Bundle Breakdown

| Chunk | Size |
|---|---|
| Shared framework (React + Next.js) | ~87 KB |
| Page JS (all components) | ~54 KB |
| **Total First Load** | **~141 KB** |

## Optimization Strategies Applied

- Static export (pre-rendered HTML, no SSR overhead)
- Two font families only (Bebas Neue + Inter), `display: swap`, Latin subset
- No heavy charting libraries — all SVG is hand-crafted
- Framer Motion tree-shaken (only `motion`, `AnimatePresence`, `useInView`, `useScroll` imported)
- Images: none loaded (placeholder silhouettes used for player cards)
- Passive scroll listeners for header scroll state
- `prefers-reduced-motion` disables all animations globally
- Lazy sections below fold use `useInView` for reveal (IntersectionObserver)

## Notes

- Lighthouse scores should be measured after GitHub Pages deployment on a real network
- Shot map and player cards use no external images, eliminating image-load LCP risk
- The countdown timer re-renders every second but only updates a small DOM subtree
