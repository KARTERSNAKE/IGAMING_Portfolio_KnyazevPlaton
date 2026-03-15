/**
 * App.tsx
 *
 * Orchestrates:
 *  - localStorage visitCount tracking (persists across sessions)
 *  - Show intro on first visit; skip intro on subsequent visits
 *  - Replay button in Portfolio triggers intro again
 *  - AnimatePresence handles the fade-out/fade-in transitions
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import Portfolio from './components/Portfolio';
import './index.css';

const VISIT_COUNT_KEY = 'plato_visit_count';

export default function App() {
  const [visitCount, setVisitCount] = useState(0);
  const [showIntro, setShowIntro] = useState<boolean | null>(null); // null = loading

  // ── On mount: read & increment visitCount, decide whether to show intro ──
  useEffect(() => {
    let count = 0;
    try {
      count = parseInt(localStorage.getItem(VISIT_COUNT_KEY) ?? '0', 10) || 0;
    } catch { /* private mode */ }

    const newCount = count + 1;
    try { localStorage.setItem(VISIT_COUNT_KEY, String(newCount)); } catch { /* */ }

    setVisitCount(newCount);

    // First visit (count was 0 before increment) → show intro
    // Returning visit → skip straight to portfolio
    setShowIntro(count === 0);
  }, []);

  const handleSkip = () => setShowIntro(false);

  // Replay: increment count again (so easter egg becomes available)
  const handleReplay = () => {
    let count = visitCount;
    try {
      count = parseInt(localStorage.getItem(VISIT_COUNT_KEY) ?? '0', 10) || visitCount;
      localStorage.setItem(VISIT_COUNT_KEY, String(count + 1));
    } catch { /* */ }
    setVisitCount(count + 1);
    setShowIntro(true);
  };

  // Still determining state
  if (showIntro === null) return null;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroScreen
            key="intro"
            visitCount={visitCount}
            onSkip={handleSkip}
          />
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Portfolio onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
