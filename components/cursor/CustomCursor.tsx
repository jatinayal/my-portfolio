'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from './useCursor';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const { type, label, color, setType, setLabel, setColor } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouse = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const smoothedMouse = useRef({ x: mouse.current.x, y: mouse.current.y });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorEl = target.closest('[data-cursor]');
      const typeEl = target.closest('[data-cursor-type]');
      const colorEl = target.closest('[data-cursor-color]');

      if (cursorEl) {
        setLabel(cursorEl.getAttribute('data-cursor') || null);
      } else {
        setLabel(null);
      }

      if (typeEl) {
        setType(typeEl.getAttribute('data-cursor-type') as any || 'pointer');
      } else if (target.closest('a, button, input[type="submit"], input[type="button"], [role="button"], [role="tab"]')) {
        setType('pointer');
      } else if (target.closest('input[type="text"], input[type="email"], textarea, [contenteditable="true"]')) {
        setType('text');
      } else {
        setType('default');
      }

      if (colorEl) {
        setColor(colorEl.getAttribute('data-cursor-color') || null);
      } else {
        setColor(null);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    // Render loop
    let animationFrameId: number;
    const render = () => {
      const lerpAmount = 1; 
      
      smoothedMouse.current.x += (mouse.current.x - smoothedMouse.current.x) * lerpAmount;
      smoothedMouse.current.y += (mouse.current.y - smoothedMouse.current.y) * lerpAmount;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${smoothedMouse.current.x}px, ${smoothedMouse.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, setColor, setLabel, setType]);

  // Hide browser cursor
  useEffect(() => {
    if (isTouchDevice) return;
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  const activeColor = color || '#0EA5E9'; // sleek light blue matching reference

  return (
    <div 
      ref={cursorRef} 
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'transform' }}
    >
      <motion.div 
        className="relative"
        animate={{
          scale: type === 'pointer' ? 0.9 : type === 'drag' || type === 'grabbing' ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {type === 'default' || type === 'pointer' ? (
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill={activeColor}
            xmlns="http://www.w3.org/2000/svg"
            className="transform origin-top-left transition-colors duration-300"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))' }}
          >
            {/* Minimal pointer arrow inspired by reference */}
            <path 
              d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.45 0 .67-.54.35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinejoin="round" 
            />
          </svg>
        ) : type === 'text' ? (
          <div className="w-0.5 h-6 bg-black dark:bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/90 border border-gray-200 dark:border-gray-800 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-xl backdrop-blur-md">
            <span className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              {type === 'grabbing' ? 'Hold' : 'Drag'}
            </span>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {label && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 10, y: 15 }}
            animate={{ opacity: 1, scale: 1, x: 20, y: 24 }}
            exit={{ opacity: 0, scale: 0.8, x: 10, y: 15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute top-0 left-0 px-4 py-2 bg-[#FFD13B] text-black font-bold text-sm tracking-tight rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.15)] whitespace-nowrap pointer-events-none border border-yellow-300/50"
            style={{ 
              backgroundColor: color ? color : '#FFD13B',
              color: color ? '#ffffff' : '#000000',
              textShadow: color ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
              borderColor: color ? 'rgba(255,255,255,0.2)' : 'rgba(255,209,59,0.5)'
            }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
