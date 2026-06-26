"use client";

import { motion } from 'framer-motion';

import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center gap-8 py-10 bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[32px] shadow-sm px-6 md:px-12 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] pointer-events-none" />

      {/* Memoji Focal Point */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-50 dark:bg-gray-800/50 border-4 border-white dark:border-gray-800 shadow-xl flex items-center justify-center z-10"
      >
        <Image
          src="/memoji.png"
          alt="Jatin Nayal Memoji"
          fill
          sizes="160px"
          className="object-contain p-2 translate-y-2"
          priority
        />
      </motion.div>

      {/* Intro Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl z-10"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
          Hi, I'm Jatin.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
          A passionate <span className="text-gray-900 dark:text-white">Web Developer</span> dedicated to crafting premium, interactive, and high-performance digital experiences. 
          I specialize in the modern React ecosystem, focusing on clean architecture and polished UI/UX.
        </p>
      </motion.div>

      {/* Tech Stack Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap justify-center gap-3 mt-2 z-10"
      >
        {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map((tech) => (
          <span
            key={tech}
            className="px-4 py-2 bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-gray-700 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
