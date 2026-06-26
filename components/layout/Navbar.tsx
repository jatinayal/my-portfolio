'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../theme/ThemeToggle';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Wall', path: '/wall' },
  { name: 'About', path: '/about' },
  { name: 'Tools', path: '/tools' },
  { name: 'Projects', path: '/projects' },
];

const DownloadResumeButton = () => {
  const [status, setStatus] = useState<'idle' | 'downloading' | 'success'>('idle');

  const handleDownload = () => {
    if (status !== 'idle') return;
    setStatus('downloading');
    
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }, 400); 
  };

  return (
    <a
      href="/resume.pdf"
      download="Jatin-Nayal-Resume.pdf"
      onClick={handleDownload}
      className="relative p-2 w-10 h-10 flex items-center justify-center rounded-full overflow-hidden transition-colors hover:bg-gray-200/50 dark:hover:bg-gray-800/50 text-black dark:text-gray-200 outline-none focus:ring-2 focus:ring-purple-500/50"
      aria-label="Download Resume"
      title="Download Resume"
      data-cursor="Download Resume"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M12 4v16"
          initial={false}
          animate={{ pathLength: status === 'idle' ? 1 : 0, opacity: status === 'idle' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M6 14l6 6 6-6"
          initial={false}
          animate={{ pathLength: status === 'idle' ? 1 : 0, opacity: status === 'idle' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Checkmark */}
        <motion.path
          d="M20 6L9 17l-5-5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: status === 'success' ? 1 : 0, opacity: status === 'success' ? 1 : 0 }}
          transition={{ duration: 0.4, delay: status === 'success' ? 0.1 : 0, ease: 'easeOut' }}
        />
      </svg>
    </a>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.mobile-nav-container')) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [mobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-10 lg:px-12 py-6 flex justify-between items-center pointer-events-none">
      
      {/* Left Logo Area */}
      <div className="flex-1 flex justify-start pointer-events-auto">
        <Link href="/" data-cursor="Home">
          <div className="rounded-full p-1 cursor-pointer transition-transform duration-300 hover:scale-105 hover:bg-black/5 dark:hover:bg-white/10">
            <Image 
              src="/assets/logo.png"
              alt="Logo" 
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover" 
            />
          </div>
        </Link>
      </div>

      {/* Center Floating Navbar */}
      <div className="shrink-0 flex justify-center pointer-events-auto mobile-nav-container z-50">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center p-1.5 bg-gray-100/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md dark:border dark:border-gray-800/60 rounded-full shadow-sm">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                data-cursor={link.name}
                className={`relative px-5 py-2 text-sm font-medium transition-colors rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gray-400 ${
                  isActive 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute inset-0 bg-white dark:bg-[#1a1a1a] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-none dark:border dark:border-gray-700/50"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden relative">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-100/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border border-transparent dark:border-gray-800/60 rounded-full shadow-sm text-sm font-medium text-gray-900 dark:text-white"
          >
            <span className="relative z-10">{NAV_LINKS.find(link => link.path === pathname)?.name || 'Menu'}</span>
          </button>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border border-gray-200 dark:border-gray-800/60 rounded-2xl shadow-xl flex flex-col gap-1 z-50"
              >
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`relative px-4 py-2.5 text-sm font-medium rounded-xl transition-colors text-center ${
                        isActive 
                          ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-[#1a1a1a]' 
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Time & Theme Display Area */}
      <div className="flex-1 flex justify-end items-center gap-2 sm:gap-3 md:gap-4 pointer-events-auto">
        <ThemeToggle />
        <DownloadResumeButton />
        <div className="px-4 py-2 hidden md:block rounded-full bg-gray-100/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md dark:border dark:border-gray-800/60 shadow-sm">
          <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">{currentTime}</span>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
