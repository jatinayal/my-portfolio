'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Lanyard from '@/components/3d/Lanyard';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBubble = () => {
  const [greeting, setGreeting] = useState("Welcome ✨");
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<'message' | 'typing'>('message');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning ☀️");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon 🌤️");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening 🌙");
    else setGreeting("Good Night 🌌");
  }, []);

  const messages = useMemo(() => [
    greeting,
    "I'm Jatin Nayal 👋",
    "Glad you're here ✨",
    "Full Stack Dev 🚀",
    "Building cool stuff 🔥",
    "Solving problems 🧩",
    "Open to Work 💼"
  ], [greeting]);

  useEffect(() => {
    if (!mounted) return;

    let timeout: NodeJS.Timeout;

    if (phase === 'message') {
      // Keep message visible for 4.5 seconds to allow comfortable reading
      timeout = setTimeout(() => {
        setPhase('typing');
      }, 4500);
    } else if (phase === 'typing') {
      // Keep typing indicator for 1.5 seconds before switching
      timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setPhase('message');
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [phase, messages.length, mounted]);

  return (
    <div className="relative flex flex-col items-start w-[210px] md:w-[280px] h-[80px] md:h-[96px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative bg-[#007AFF] text-white px-4 py-2 md:px-6 md:py-3 rounded-2xl md:rounded-3xl rounded-bl-lg md:rounded-bl-xl shadow-lg flex items-center justify-center w-full h-[44px] md:h-[52px] z-20"
      >
        <AnimatePresence mode="wait">
          {mounted && (
            <motion.span
              key={`msg-${currentIndex}`}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[13px] md:text-base font-medium text-center w-full absolute tracking-wide"
            >
              {messages[currentIndex]}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Subtle curved tail connecting bubble to Memoji */}
        <svg
          className="absolute -left-[5px] bottom-[0px] w-[14px] h-[16px] text-[#007AFF]"
          viewBox="0 0 14 16"
          fill="none"
        >
          <path d="M14 16C14 16 6 16 0 16C4 11 6 5 6 0H14V16Z" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Separate Typing Bubble below main message */}
      <AnimatePresence>
        {mounted && phase === 'typing' && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.8, filter: "blur(2px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white dark:bg-gray-800 mt-1.5 md:mt-2 ml-3 md:ml-4 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md flex items-center justify-center space-x-1 md:space-x-1.5 h-[28px] md:h-[32px] w-[50px] md:w-[60px] z-10 border border-gray-100 dark:border-gray-700/50"
          >
            <motion.div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }} />
            <motion.div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }} />
            <motion.div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Hero() {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between w-full min-h-[100svh] overflow-hidden pt-20 lg:pt-0">
      {/* Left Section - Lanyard (Strictly Isolated Dimensions) */}
      <div className="w-full lg:w-1/2 h-[45vh] lg:h-[100svh] flex-none relative z-0 flex items-center justify-center">
        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
      </div>

      {/* Right Section - Memoji & Profile Intro (Strictly Isolated Dimensions) */}
      <div className="w-full lg:w-1/2 flex-none flex flex-col justify-center items-start z-10 pointer-events-auto px-6 lg:px-16 pb-20 lg:pb-0">

        {/* Memoji and Chat Bubble Row */}
        <div className="flex items-start mb-6 z-10 pointer-events-auto mt-8 lg:mt-0 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 relative z-10"
          >
            <Image
              src="/memoji.png"
              alt="Jatin Nayal Memoji"
              fill
              className="object-contain drop-shadow-xl"
              priority
              sizes="(max-width: 768px) 96px, 112px"
            />
          </motion.div>

          {/* Position the bubble slightly above and perfectly beside the Memoji */}
          <div className="ml-3 mt-1 lg:mt-2">
            <ChatBubble />
          </div>
        </div>

        {/* Intro Text Area */}
        <div className="space-y-6 max-w-xl pointer-events-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 dark:text-gray-200 leading-snug"
          >
            I&apos;m <span className="font-bold text-black dark:text-white underline decoration-[#007AFF] decoration-wavy decoration-2 underline-offset-8">Jatin Nayal</span>, a Full Stack Developer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            I focus on building modern, scalable, and user-friendly web applications. I enjoy transforming ideas into polished digital experiences using React, Next.js, Node.js, MongoDB, and modern web technologies. My passion lies in creating products that are both visually appealing and technically robust.
          </motion.p>
        </div>
      </div>

      {/* Right Sidebar with Social Icons */}
      <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6 z-20 pointer-events-auto hidden md:flex">
        <Link href="https://www.linkedin.com/in/jatin-nayal-300438353/" target="_blank" className="text-black dark:text-gray-300 hover:text-[#007AFF] dark:hover:text-[#007AFF] transition-colors">
          <FaLinkedin className="w-6 h-6" />
        </Link>
        <Link href="https://www.instagram.com/jatinayal/" target="_blank" className="text-black dark:text-gray-300 hover:text-[#007AFF] dark:hover:text-[#007AFF] transition-colors">
          <FaInstagram className="w-6 h-6" />
        </Link>
        <Link href="https://github.com/jatinayal" target="_blank" className="text-black dark:text-gray-300 hover:text-[#007AFF] dark:hover:text-[#007AFF] transition-colors">
          <FaGithub className="w-6 h-6" />
        </Link>
      </div>
    </section>
  );
}
