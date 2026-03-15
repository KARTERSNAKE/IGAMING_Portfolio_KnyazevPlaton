/**
 * IntroScreen.tsx
 *
 * Handles:
 *  - Lottie slot machine (click-to-play, no autoplay)
 *  - Inactivity "Skip" timer (5s of no mouse/click/key → fade in Skip)
 *  - Post-animation random message (+ easter egg for visitCount >= 2)
 *  - Casino ambient background via <CasinoDecor />
 *  - Framer Motion fade-out transition on skip
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import Lottie from 'lottie-react';
import type { LottieRefCurrentProps } from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import CasinoDecor from './CasinoDecor';

// ── Message pools ──────────────────────────────────────────
const BASE_MESSAGES = [
  'looking sharp today! 😎',
  'great day, great vibes 😉',
  'are you a model? 😳',
  'perfect day for a coffee break ☕️',
  'work won’t finish itself 👨🏻‍💻',
];
const EASTER_EGG_MSG = 'there’s an easter egg hidden here 🌝';

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface Props {
  visitCount: number;
  onSkip: () => void;
}

export default function IntroScreen({ visitCount, onSkip }: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [animData, setAnimData] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showSkip, setShowSkip] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  const afkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const AFK_DELAY = 5000;

  // ── Fetch animation JSON ──────────────────────────────
  useEffect(() => {
    fetch('/animation.json')
      .then((r) => r.json())
      .then(setAnimData)
      .catch(console.error);
  }, []);

  // ── Build message pool ────────────────────────────────
  const messagePool = visitCount >= 2
    ? [...BASE_MESSAGES, EASTER_EGG_MSG]
    : BASE_MESSAGES;

  // ── AFK Timer ────────────────────────────────────────
  const resetAfkTimer = useCallback(() => {
    if (afkTimerRef.current) clearTimeout(afkTimerRef.current);
    if (!isPlaying && !isComplete) {
      afkTimerRef.current = setTimeout(() => setShowSkip(true), AFK_DELAY);
    }
  }, [isPlaying, isComplete]);

  useEffect(() => {
    resetAfkTimer();
    const h = () => resetAfkTimer();
    window.addEventListener('mousemove', h);
    window.addEventListener('mousedown', h);
    window.addEventListener('keydown', h);
    window.addEventListener('touchstart', h);
    return () => {
      if (afkTimerRef.current) clearTimeout(afkTimerRef.current);
      window.removeEventListener('mousemove', h);
      window.removeEventListener('mousedown', h);
      window.removeEventListener('keydown', h);
      window.removeEventListener('touchstart', h);
    };
  }, [resetAfkTimer]);

  useEffect(() => {
    if (isPlaying && afkTimerRef.current) clearTimeout(afkTimerRef.current);
  }, [isPlaying]);

  // ── Handlers ──────────────────────────────────────────
  const handleLottieClick = () => {
    if (isPlaying || isComplete) return;
    setIsPlaying(true);
    setShowSkip(false);
    if (afkTimerRef.current) clearTimeout(afkTimerRef.current);
    lottieRef.current?.goToAndPlay(0, true);
  };

  const handleComplete = () => {
    setIsComplete(true);
    setIsPlaying(false);
    setMessage(randomFrom(messagePool));
    setTimeout(() => setShowSkip(true), 1200);
  };

  const interactive = !isPlaying && !isComplete;

  return (
    <motion.div
      className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      style={{ gap: 'clamp(16px, 3vw, 40px)' }}
    >
      <CasinoDecor />

      {/* ── Lottie container ──────────────────────────── */}
      <motion.div
        id="lottie-container"
        onClick={handleLottieClick}
        onMouseEnter={() => interactive && setPressed(true)}
        onMouseLeave={() => setPressed(false)}
        onMouseDown={() => interactive && setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onTouchStart={() => interactive && setPressed(true)}
        onTouchEnd={() => setPressed(false)}
        initial={{ scale: 2.2, opacity: 0 }}
        animate={{
          scale: !animData ? 2.2 : (!interactive ? 1 : pressed ? 0.92 : 1),
          opacity: animData ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
        onAnimationComplete={() => {
          if (animData && isEntering) setIsEntering(false);
        }}
        className="relative z-10 mx-auto flex flex-col items-center justify-center"
        style={{
          /* Wrapper limits how much space it takes in layout */
          width: 'min(1000px, 95vw)',
          height: 'min(800px, 70vh)',
          cursor: interactive ? 'pointer' : 'default',
          filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.40)) drop-shadow(0 12px 30px rgba(212,168,67,0.25))',
        }}
      >
        {animData && (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <Lottie
              lottieRef={lottieRef}
              animationData={animData}
              loop={false}
              autoplay={false}
              onComplete={handleComplete}
              style={{ width: '100%', height: '100%' }}
              rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
            />
          </div>
        )}

        {/* Hints */}
        <AnimatePresence>
          {isEntering && animData && (
            <motion.div
              key="tap-tap"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="absolute whitespace-nowrap
                         text-[14px] font-bold tracking-[0.25em] uppercase text-[#c99a35]
                         pointer-events-none drop-shadow-md"
              style={{ bottom: '10%' }}
            >
              TAP, TAP!
            </motion.div>
          )}
          {interactive && animData && !isEntering && (
            <motion.div
              key="hint"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="absolute whitespace-nowrap
                         text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c99a35]/70
                         pointer-events-none"
              style={{ bottom: '10%' }}
            >
              Click to spin
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Post-animation message ─────────────────────── */}
      <AnimatePresence>
        {message && (
          <motion.p
            key="message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative z-10 text-center text-base font-medium text-[#333]
                       tracking-wide max-w-xs leading-relaxed"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Skip button ────────────────────────────────── */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            key="skip"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={onSkip}
            className="relative z-10 px-9 py-3 rounded-full text-[11px] font-semibold
                       tracking-[0.2em] uppercase text-[#a07825] border border-[#d4a843]/50
                       hover:scale-[1.04] active:scale-[0.97] transition-all duration-200
                       overflow-hidden bg-transparent"
          >
            <span className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(120deg, transparent 0%, rgba(212,168,67,0.13) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s linear infinite',
              }}
            />
            <span className="relative">Skip →</span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
