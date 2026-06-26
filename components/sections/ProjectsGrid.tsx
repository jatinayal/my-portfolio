"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiGithub, FiLayers } from 'react-icons/fi';
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
  SiDocker,
  SiVercel,
  SiOpenai,
  SiAnthropic,
  SiFigma
} from 'react-icons/si';
import { TbBrandVscode } from 'react-icons/tb';
import { projects, Project } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';

const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('react')) return <SiReact className="text-[#61DAFB]" />;
  if (t.includes('next.js') || t.includes('nextjs')) return <SiNextdotjs className="text-black dark:text-white" />;
  if (t.includes('typescript')) return <SiTypescript className="text-[#3178C6]" />;
  if (t.includes('javascript')) return <SiJavascript className="text-[#F7DF1E]" />;
  if (t.includes('node')) return <SiNodedotjs className="text-[#339933]" />;
  if (t.includes('tailwind')) return <SiTailwindcss className="text-[#06B6D4]" />;
  if (t.includes('framer')) return <SiFramer className="text-black dark:text-white" />;
  if (t.includes('mongo')) return <SiMongodb className="text-[#47A248]" />;
  if (t.includes('postgres')) return <SiPostgresql className="text-[#4169E1]" />;
  if (t.includes('docker')) return <SiDocker className="text-[#2496ED]" />;
  if (t.includes('vercel')) return <SiVercel className="text-black dark:text-white" />;
  if (t.includes('express')) return <SiExpress className="text-black dark:text-white" />;
  if (t.includes('vscode')) return <TbBrandVscode className="text-[#007ACC]" />;
  if (t.includes('cursor')) return <TbBrandVscode className="text-black dark:text-white" />;
  return <FiLayers className="text-gray-500" />;
};

export default function ProjectsGrid() {
  // Sort projects: Personal first, then others
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const typeA = a.type || 'professional';
      const typeB = b.type || 'professional';
      if (typeA === 'personal' && typeB !== 'personal') return -1;
      if (typeA !== 'personal' && typeB === 'personal') return 1;
      return 0;
    });
  }, []);

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 auto-rows-[auto]">
        {sortedProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

const ProjectCard = React.memo(function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isPersonal = project.type === 'personal';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex flex-col bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative"
    >
      {/* Abstract decorative background behind the card text */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white dark:from-[#161616]/50 dark:to-[#111] pointer-events-none z-0" />

      {/* TOP SECTION: Image (Left) + Details (Right) */}
      <div className="flex flex-col sm:flex-row flex-1 p-5 lg:p-6 gap-6 z-10">
        
        {/* Left Side: Thumbnail */}
        <div className="w-full sm:w-[180px] lg:w-[220px] xl:w-[240px] shrink-0 order-1 aspect-video sm:aspect-auto sm:h-full relative rounded-2xl overflow-hidden shadow-sm bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, 240px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            quality={75}
          />
          <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-2xl pointer-events-none" />
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 flex flex-col justify-between order-2">
          <div>
            <h3 className="text-xl lg:text-2xl font-extrabold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-[13px] lg:text-sm leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Icons (Sticker Style) */}
          <div className="flex flex-wrap gap-3 mt-auto">
            {project.technologies?.map((tech) => (
              <div 
                key={tech} 
                title={tech}
                className="flex items-center justify-center text-[22px] opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-help"
              >
                {getTechIcon(tech)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 lg:px-6 lg:py-4 border-t border-gray-100 dark:border-gray-800/80 bg-gray-50/80 dark:bg-[#0a0a0a]/50 z-10 gap-4 sm:gap-0">
        
        {/* Left Side: Buttons */}
        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <Link 
              href={project.liveUrl} 
              target="_blank" 
              className="w-10 h-10 rounded-full bg-white dark:bg-[#161616] hover:bg-gray-50 dark:hover:bg-[#222] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 transition-all hover:scale-105 shadow-sm group/btn"
              aria-label={`Visit ${project.title} live site`}
            >
              <FiArrowUpRight className="text-lg group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          )}
          
          {project.github && (
            <Link 
              href={project.github} 
              target="_blank" 
              className="w-10 h-10 rounded-full bg-gray-900 hover:bg-black dark:bg-[#161616] dark:hover:bg-[#222] text-white dark:text-gray-300 border border-transparent dark:border-gray-700 flex items-center justify-center transition-all hover:scale-105 shadow-sm"
              aria-label={`View ${project.title} GitHub repository`}
            >
              <FiGithub className="text-lg" />
            </Link>
          )}
        </div>

        {/* Right Side: Meta */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {project.timeline && (
            <span className="text-[11px] font-bold tracking-wider uppercase text-gray-400 dark:text-gray-500">
              {project.timeline}
            </span>
          )}
          
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${isPersonal ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
            {project.type || 'Professional'}
          </span>
        </div>
      </div>
    </motion.div>
  );
});
