"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiLayers } from 'react-icons/fi';
import { 
  SiTypescript, 
  SiJavascript, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiDocker,
  SiVercel,
  SiOpenai,
  SiAnthropic,
  SiFigma
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';
import { tools, Tool } from '@/data/tools';
import Link from 'next/link';
import Image from 'next/image';

// Map icon strings to actual React components
const getToolIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'typescript': return <SiTypescript className="text-[#3178C6]" />;
    case 'javascript': return <SiJavascript className="text-[#F7DF1E]" />;
    case 'react': return <SiReact className="text-[#61DAFB]" />;
    case 'next.js': return <SiNextdotjs className="text-black dark:text-white" />;
    case 'tailwind': return <SiTailwindcss className="text-[#06B6D4]" />;
    case 'framer': return <SiFramer className="text-black dark:text-white" />;
    case 'node.js': return <SiNodedotjs className="text-[#339933]" />;
    case 'express': return <SiExpress className="text-black dark:text-white" />;
    case 'postgresql': return <SiPostgresql className="text-[#4169E1]" />;
    case 'mongodb': return <SiMongodb className="text-[#47A248]" />;
    case 'git': return <SiGit className="text-[#F05032]" />;
    case 'docker': return <SiDocker className="text-[#2496ED]" />;
    case 'vercel': return <SiVercel className="text-black dark:text-white" />;
    case 'vscode': return <TbBrandVscode className="text-[#007ACC]" />;
    case 'cursor': return <TbBrandVscode className="text-black dark:text-white" />; // Fallback as Cursor icon might not be in SimpleIcons yet
    case 'openai': return <SiOpenai className="text-black dark:text-white" />;
    case 'anthropic': return <SiAnthropic className="text-[#D4A373]" />; // Anthropic theme color
    case 'figma': return <SiFigma className="text-[#F24E1E]" />;
    default: return <FiLayers className="text-gray-500" />;
  }
};

export default function ToolsGrid() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-0 h-auto lg:min-h-[calc(100vh-120px)] flex items-center justify-center">
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-[auto]">

        {/* 1. INTRODUCTION CARD (Spans 2 columns on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:col-span-2 relative rounded-[32px] overflow-hidden bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 shadow-sm p-8 lg:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8 group"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-800/50 flex items-center justify-center overflow-hidden shadow-inner">
            <Image
              src="/memoji.png"
              alt="Memoji"
              width={120}
              height={120}
              className="object-contain pt-2"
              priority
            />
          </div>
          
          <div className="flex-1 text-center sm:text-left z-10">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              Tools & Technologies
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed max-w-lg">
              A curated look at the programming languages, frameworks, AI models, and software architectures I utilize to architect scalable, high-performance applications and premium digital experiences.
            </p>
          </div>

          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        </motion.div>

        {/* 2. TOOL CARDS */}
        {tools.map((tool, index) => (
          <ToolCard key={tool.id} tool={tool} index={index} />
        ))}

      </div>
    </section>
  );
}

// Extracted ToolCard component with memoization and separate animations
const ToolCard = React.memo(function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  return (
    <Link href={tool.website} target="_blank" className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[32px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: (index % 8) * 0.05 }} // Staggered entrance, capped at 8 to avoid massive delays
        className="h-full bg-gray-50 dark:bg-[#161616] hover:bg-white dark:hover:bg-[#1f1f1f] border border-gray-200/50 dark:border-gray-800 rounded-[32px] p-6 lg:p-8 flex flex-col justify-between group transition-colors shadow-sm hover:shadow-md relative overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Logo Container */}
          <div className="w-14 h-14 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-700/50 rounded-[18px] shadow-sm flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500 ease-out z-10">
            {getToolIcon(tool.logo)}
          </div>

          {/* Tool Info */}
          <div className="mt-auto z-10">
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 block">
              {tool.category}
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
              {tool.description}
            </p>
          </div>
        </div>

        {/* External Link Arrow */}
        <div className="absolute top-6 right-6 w-10 h-10 bg-white/50 dark:bg-[#111]/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2 z-20">
          <FiArrowUpRight className="text-gray-900 dark:text-white text-lg" />
        </div>
      </motion.div>
    </Link>
  );
});
