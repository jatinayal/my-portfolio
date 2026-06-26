'use client';

import { motion, AnimatePresence } from 'framer-motion';

function AnimatedMoon() {
  return (
    <motion.svg
      width="240"
      height="240"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white opacity-90 drop-shadow-2xl"
      initial={{ scale: 0.8, rotate: -30, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
    >
      <motion.path
        d="M 21 12.79 A 9 9 0 1 1 11.21 3 A 7 7 0 0 0 21 12.79 Z"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

    </motion.svg>
  );
}

function AnimatedSun() {
  return (
    <motion.svg
      width="240"
      height="240"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-black opacity-90 drop-shadow-2xl"
      initial={{ scale: 0.8, rotate: 45, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
    >
      <motion.circle 
        cx="12" cy="12" r="5" 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      >
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
      </motion.g>

    </motion.svg>
  );
}

export function ThemeTransitionOverlay({
  active,
  x,
  y,
  newTheme,
  iconVisible
}: {
  active: boolean;
  x: number;
  y: number;
  newTheme: 'light' | 'dark' | null;
  iconVisible: boolean;
}) {
  if (!active || !newTheme) return null;

  const maxRadius = typeof window !== 'undefined' ? Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) : 1000;

  return (
    <motion.div
      initial={{ clipPath: `circle(0px at ${x}px ${y}px)` }}
      animate={{ clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      className={`fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center ${
        newTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
    >
      <AnimatePresence>
        {iconVisible && (
          newTheme === 'dark' ? <AnimatedMoon key="moon" /> : <AnimatedSun key="sun" />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
