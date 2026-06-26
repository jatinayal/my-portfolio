'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeTransitionOverlay } from './ThemeTransitionOverlay';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  const [transitionState, setTransitionState] = useState<{
    active: boolean;
    x: number;
    y: number;
    newTheme: Theme | null;
    iconVisible: boolean;
  }>({
    active: false,
    x: 0,
    y: 0,
    newTheme: null,
    iconVisible: false,
  });

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
    setMounted(true);
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    // Prevent overlapping transitions
    if (transitionState.active) return;

    const isDark = theme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';

    // Start transition overlay
    setTransitionState({
      active: true,
      x: e.clientX,
      y: e.clientY,
      newTheme,
      iconVisible: true,
    });

    // Wait for the wave to cover the screen (0.9s)
    setTimeout(() => {
      // 1. Swap the actual DOM theme underneath
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // 2. Trigger the icon to fade out
      setTransitionState(prev => ({ ...prev, iconVisible: false }));

      // 3. Wait for icon to finish fading out, then unmount overlay
      setTimeout(() => {
        setTransitionState({
          active: false,
          x: 0,
          y: 0,
          newTheme: null,
          iconVisible: false,
        });
      }, 500);
    }, 900);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeTransitionOverlay {...transitionState} />
      <div className={!mounted ? "invisible" : ""}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
