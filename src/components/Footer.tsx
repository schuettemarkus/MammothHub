export default function Footer() {
  return (
    <footer className="border-t border-surface-3 py-8 mt-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Brand lockup */}
        <div className="mb-4">
          <span className="font-display text-2xl text-ice-300">UTAH MAMMOTH</span>
          <p className="text-xs text-ice-400 mt-1 uppercase tracking-widest">Tusks Up · Made For More</p>
        </div>

        {/* Disclaimers */}
        <div className="space-y-2 text-xs text-ice-400/60">
          <p>
            This is an unofficial fan-built playoff hub. Not affiliated with the NHL, Utah Mammoth, or Vegas Golden Knights.
          </p>
          <p>
            Team stats sourced from confirmed series results. Market data represents consensus public lines and is not betting advice.
          </p>
          <p>
            Advanced analytics marked N/A where not independently verified. Shot map data pending API integration.
          </p>
          <p>
            Data sources: NHL Stats API, Natural Stat Trick (planned), public sportsbook consensus.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-surface-3">
          <p className="text-xs text-surface-3">
            &copy; 2026 Mammoth Hub. Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
