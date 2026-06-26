'use client';

import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 w-10 h-10 flex items-center justify-center rounded-full overflow-hidden transition-colors hover:bg-gray-200/50 dark:hover:bg-gray-800/50 text-black dark:text-gray-200 outline-none focus:ring-2 focus:ring-purple-500/50"
      aria-label="Toggle theme"
    >
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          rotate: isDark ? 360 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Sun and Moon Overlay Morph */}
        
        {/* Sun Rays */}
        <motion.g
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.3,
            rotate: isDark ? 0 : -45
          }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
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

        {/* Center Sun Circle */}
        <motion.circle
          cx="12"
          cy="12"
          r="5"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        />

        {/* Moon Crescent Outline */}
        <motion.path
          d="M 21 12.79 A 9 9 0 1 1 11.21 3 A 7 7 0 0 0 21 12.79 Z"
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1,
            rotate: isDark ? 45 : 0
          }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        />
      </motion.svg>
    </button>
  );
}
