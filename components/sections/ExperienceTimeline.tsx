"use client";

import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink, FiLayers, FiArrowUpRight } from 'react-icons/fi';
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiTailwindcss, SiFramer, SiMongodb, SiJavascript, SiWordpress, SiJira, SiMongoose, SiGraphql, SiHtml5, SiCss, SiCloudflare, SiCloudinary, SiPostgresql, SiExpress, SiZod, SiPayloadcms, SiShadcnui, SiReactrouter, SiLucide, SiVite, SiRedux, SiGooglegemini, SiPassport, SiBootstrap, SiMapbox, SiNetlify, SiThreedotjs, SiJsonwebtokens, SiRedis, SiOpenai, SiVercel, SiRender } from 'react-icons/si';
import { TbApi } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
import { DiResponsive } from "react-icons/di";
import { VscDebug } from "react-icons/vsc";
import { RiTeamLine } from "react-icons/ri";
import { LuGitPullRequestCreate } from "react-icons/lu";
import { GoVersions, GoWorkflow } from "react-icons/go";
import { TbQrcode, TbLayout, TbPalette, TbDatabase, TbSettings, TbChartLine, TbCode, TbBrandNextjs, TbBrandVscode } from 'react-icons/tb';
import { LuFlaskConical } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";
import { experiences, Experience } from '@/data/experience';
import { projects, Project } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';

export const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes('react router') || t.includes('router')) return <SiReactrouter className="text-[#CA4245]" />;
  if (t.includes('lucide')) return <SiLucide className="text-[#F56565]" />;
  if (t.includes('react hook form')) return <SiReact className="text-[#EC5990]" />;
  if (t.includes('react')) return <SiReact className="text-[#61DAFB]" />;
  if (t.includes('next.js') || t.includes('nextjs')) return <SiNextdotjs className="text-black dark:text-white" />;
  if (t.includes('nextauth')) return <TbBrandNextjs className="text-black dark:text-white" />;
  if (t.includes('typescript')) return <SiTypescript className="text-[#3178C6]" />;
  if (t.includes('javascript')) return <SiJavascript className="text-[#F7DF1E]" />;
  if (t.includes('node')) return <SiNodedotjs className="text-[#339933]" />;
  if (t.includes('tailwind')) return <SiTailwindcss className="text-[#06B6D4]" />;
  if (t.includes('framer')) return <SiFramer className="text-black dark:text-white" />;
  if (t.includes('mongo')) return <SiMongodb className="text-[#47A248]" />;
  if (t.includes('mongoose')) return <SiMongoose className="text-[#880000]" />;
  if (t.includes('postgres')) return <SiPostgresql className="text-[#4169E1]" />;
  if (t.includes('graphql')) return <SiGraphql className="text-[#E10098]" />;
  if (t.includes('express')) return <SiExpress className="text-black dark:text-white" />;
  if (t.includes('html')) return <SiHtml5 className="text-[#E34F26]" />;
  if (t.includes('css')) return <SiCss className="text-[#1572B6]" />;
  if (t.includes('cloudflare')) return <SiCloudflare className="text-[#F38020]" />;
  if (t.includes('cloudinary')) return <SiCloudinary className="text-[#3448C5]" />;
  if (t.includes('qr code')) return <TbQrcode className="text-gray-700 dark:text-gray-300" />;
  if (t.includes('ui/ux') || t.includes('design')) return <TbPalette className="text-pink-500" />;
  if (t.includes('wirefram')) return <TbLayout className="text-blue-500" />;
  if (t.includes('prototype') || t.includes('prototyping')) return <TfiWrite className="text-orange-500" />;
  if (t.includes('payload')) return <SiPayloadcms className="text-black dark:text-white" />;
  if (t.includes('cms')) return <TbDatabase className="text-gray-800 dark:text-white" />;
  if (t.includes('shadcn')) return <SiShadcnui className="text-black dark:text-white" />;
  if (t.includes('zod')) return <SiZod className="text-[#3068b7]" />;
  if (t.includes('rechart')) return <TbChartLine className="text-[#22b3b0]" />;
  if (t.includes('stitch')) return <LuFlaskConical className="text-pink-300" />;
  if (t.includes('nodemailer')) return <TbCode className="text-[#02B875]" />;
  
  if (t.includes('vite')) return <SiVite className="text-[#646CFF]" />;
  if (t.includes('redux')) return <SiRedux className="text-[#764ABC]" />;
  if (t.includes('gemini')) return <SiGooglegemini className="text-[#8E75B2]" />;
  if (t.includes('openai')) return <SiOpenai className="text-black dark:text-white" />;
  if (t.includes('monaco')) return <TbBrandVscode className="text-[#007ACC]" />;
  if (t.includes('tiptap')) return <TbLayout className="text-[#000000] dark:text-white" />;
  if (t.includes('shiki')) return <TbCode className="text-[#000000] dark:text-white" />;
  if (t.includes('passport')) return <SiPassport className="text-[#34E27A]" />;
  if (t.includes('ejs')) return <TbCode className="text-[#B4CA65]" />;
  if (t.includes('bootstrap')) return <SiBootstrap className="text-[#7952B3]" />;
  if (t.includes('multer')) return <TbDatabase className="text-gray-800 dark:text-white" />;
  if (t.includes('mapbox')) return <SiMapbox className="text-black dark:text-white" />;
  if (t.includes('netlify')) return <SiNetlify className="text-[#00C7B7]" />;
  if (t.includes('vercel')) return <SiVercel className="text-black dark:text-white" />;
  if (t.includes('render')) return <SiRender className="text-black dark:text-white" />;
  if (t.includes('three')) return <SiThreedotjs className="text-black dark:text-white" />;
  if (t.includes('rapier')) return <TbSettings className="text-gray-800 dark:text-white" />;
  if (t.includes('dnd')) return <TbLayout className="text-gray-800 dark:text-white" />;
  if (t.includes('jwt')) return <SiJsonwebtokens className="text-black dark:text-white" />;
  if (t.includes('redis')) return <SiRedis className="text-[#DC382D]" />;
  if (t.includes('smtp')) return <TbCode className="text-[#02B875]" />;

  if (t.includes('rest api')) return <TbApi className="text-[#007ACC]" />;
  if (t.includes('github')) return <FaGithub className="text-[#181717] dark:text-white" />;
  if (t === 'git') return <FiGithub className="text-[#F05032]" />;
  if (t.includes('wordpress')) return <SiWordpress className="text-[#21759B]" />;
  if (t.includes('jira')) return <SiJira className="text-[#0052CC]" />;
  if (t.includes('responsive')) return <DiResponsive className="text-[#06B6D4]" />;
  if (t.includes('debug')) return <VscDebug className="text-[#D4A373]" />;
  if (t.includes('team')) return <RiTeamLine className="text-[#10B981]" />;
  if (t.includes('feature')) return <LuGitPullRequestCreate className="text-[#8B5CF6]" />;
  if (t.includes('version control')) return <GoVersions className="text-[#F43F5E]" />;
  if (t.includes('agile')) return <GoWorkflow className="text-[#F59E0B]" />;

  return <FiLayers className="text-gray-500 dark:text-gray-400" />;
};

export default function ExperienceTimeline() {
  const [selectedExpId, setSelectedExpId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const selectedExp = useMemo(() => experiences.find(e => e.id === selectedExpId) || null, [selectedExpId]);
  const selectedProject = useMemo(() => projects.find(p => p.id === selectedProjectId) || null, [selectedProjectId]);

  // Callbacks to prevent re-rendering modal components unnecessarily
  const handleCloseExp = useCallback(() => setSelectedExpId(null), []);
  const handleSelectProject = useCallback((id: string) => setSelectedProjectId(id), []);
  const handleCloseProject = useCallback(() => setSelectedProjectId(null), []);

  // Handle ESC key close & background scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProjectId) {
          setSelectedProjectId(null);
        } else if (selectedExpId) {
          setSelectedExpId(null);
        }
      }
    };

    if (selectedExpId || selectedProjectId) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedExpId, selectedProjectId]);

  return (
    <>
      <section className="w-full flex flex-col h-full bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[32px] p-6 md:p-10 shadow-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Experience</h2>

          <div className="flex flex-col gap-4">
            {experiences.map((exp, idx) => (
              <ExperienceItem
                key={exp.id}
                experience={exp}
                index={idx}
                onClick={() => setSelectedExpId(exp.id)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Experience Modal */}
      <AnimatePresence>
        {selectedExp && (
          <ExperienceModal
            experience={selectedExp}
            onClose={handleCloseExp}
            onSelectProject={handleSelectProject}
            // Hide visibility if project modal is on top to reduce render workload
            isHidden={!!selectedProject}
          />
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseProject}
          />
        )}
      </AnimatePresence>
    </>
  );
}

const ExperienceItem = memo(function ExperienceItem({
  experience,
  index,
  onClick
}: {
  experience: Experience,
  index: number,
  onClick: () => void
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="w-full flex items-center justify-between p-5 md:p-6 bg-gray-50 dark:bg-[#161616] hover:bg-gray-100 dark:hover:bg-[#1f1f1f] border border-transparent dark:border-gray-800 rounded-2xl transition-colors focus:outline-none text-left group"
    >
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-xl font-bold text-gray-500 shadow-sm relative overflow-hidden">
          {experience.logoUrl ? (
            <Image src={experience.logoUrl} alt={experience.company} fill className="object-cover" />
          ) : (
            experience.company.charAt(0)
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {experience.role}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            {experience.company}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${experience.status === 'Current' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
          {experience.status}
        </span>
        <span className="text-xs text-gray-500 font-medium hidden sm:block">
          {experience.startDate} — {experience.endDate || 'Present'}
        </span>
      </div>
    </motion.button>
  );
});

// Memoized Project Card for Carousel
const ProjectCarouselCard = memo(function ProjectCarouselCard({
  project,
  onClick
}: {
  project: Project,
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="snap-center shrink-0 w-[260px] h-[180px] relative rounded-2xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500 will-change-transform"
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="260px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        quality={60} // Lower quality for thumbnails to load instantly
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
        <h4 className="font-bold text-white text-lg translate-y-1 group-hover:translate-y-0 transition-transform">{project.title}</h4>
      </div>
    </button>
  );
});

const ExperienceModal = memo(function ExperienceModal({
  experience,
  onClose,
  onSelectProject,
  isHidden
}: {
  experience: Experience,
  onClose: () => void,
  onSelectProject: (id: string) => void,
  isHidden: boolean
}) {
  const relatedProjects = useMemo(() => {
    return experience.projectIds
      .map(id => projects.find(p => p.id === id))
      .filter(Boolean) as Project[];
  }, [experience.projectIds]);

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 sm:py-12 ${isHidden ? 'pointer-events-none' : ''}`}
      style={{ opacity: isHidden ? 0.3 : 1, transition: 'opacity 0.2s' }}
    >
      {/* 
        PERFORMANCE FIX: Removed backdrop-blur-md from full-screen overlay.
        Full screen backdrop blurs cause massive paint operations and GPU lag. 
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/60 dark:bg-black/80"
        style={{ willChange: 'opacity' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        // PERFORMANCE FIX: Changed expensive spring to a smooth, lightweight tween
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-4xl max-h-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-[32px] shadow-2xl flex flex-col overflow-hidden will-change-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#111] z-10 sticky top-0">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#161616] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-2xl font-bold text-gray-400 shadow-sm flex-shrink-0 relative overflow-hidden">
              {experience.logoUrl ? (
                <Image src={experience.logoUrl} alt={experience.company} fill className="object-cover" />
              ) : (
                experience.company.charAt(0)
              )}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">
                {experience.role}
              </h2>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-300">
                  {experience.company}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 hidden sm:block" />
                <span className="text-xs sm:text-sm text-gray-500 font-medium">
                  {experience.startDate} — {experience.endDate || 'Present'}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${experience.status === 'Current' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                  {experience.status}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-200/50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 transition-colors focus:outline-none flex-shrink-0"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 bg-gray-50/30 dark:bg-[#0a0a0a]">

          {experience.overview && (
            <section className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[24px] p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                Overview
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base font-medium">
                {experience.overview}
              </p>
            </section>
          )}

          <section className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[24px] p-6 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
              My Role
            </h3>
            <ul className="space-y-4">
              {experience.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  <span className="mr-4 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 flex-shrink-0" />
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </section>

          {relatedProjects.length > 0 && (
            <section className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[24px] p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                Projects
              </h3>

              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 px-2 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] will-change-scroll">
                {relatedProjects.map((project) => (
                  <ProjectCarouselCard
                    key={project.id}
                    project={project}
                    onClick={() => onSelectProject(project.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {experience.technologies && experience.technologies.length > 0 && (
            <section className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[24px] p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                Skills Acquired
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {experience.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 px-3.5 py-2 bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1f1f1f] transition-colors group cursor-default"
                  >
                    <span className="opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center text-lg">
                      {getTechIcon(tech)}
                    </span>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </motion.div>
    </div>
  );
});

export const ProjectModal = memo(function ProjectModal({
  project,
  onClose
}: {
  project: Project,
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 sm:py-12">
      {/* Removed backdrop-blur for performance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/80 dark:bg-black/90"
        style={{ willChange: 'opacity' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        // Lightweight tween animation instead of heavy spring
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-4xl max-h-full bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-[32px] shadow-2xl flex flex-col overflow-hidden will-change-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md flex items-center justify-center text-white transition-colors focus:outline-none z-50 border border-white/10"
        >
          <FiX className="text-xl" />
        </button>

        <div className="w-full h-full overflow-y-auto flex flex-col">
          <div className="relative w-full bg-gray-200 dark:bg-gray-800 shrink-0">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              priority // Load banner instantly
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
                {project.title}
              </h2>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                {project.timeline && (
                  <span className="text-sm text-gray-300 font-medium bg-black/40 px-3 py-1 rounded-full border border-white/10">
                    {project.timeline}
                  </span>
                )}
                {project.status && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10 ${project.status === 'Live' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>
                    {project.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex-1 space-y-6 sm:space-y-8 bg-gray-50/30 dark:bg-[#0a0a0a]">

            {(project.liveUrl || project.github) && (
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                    title="Live Demo"
                    data-cursor="Live Demo"
                    data-cursor-type="pointer"
                    data-cursor-color="#3b82f6"
                  >
                    <FiArrowUpRight className="text-xl" />
                  </Link>
                )}
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    className="w-12 h-12 rounded-full bg-gray-900 hover:bg-black dark:bg-[#161616] dark:hover:bg-[#222] text-white dark:text-gray-300 border border-transparent dark:border-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                    title="GitHub Repository"
                    data-cursor="View GitHub"
                    data-cursor-type="pointer"
                    data-cursor-color="#000000"
                  >
                    <FiGithub className="text-xl" />
                  </Link>
                )}
              </div>
            )}

            {(project.overview || project.purpose) && (
              <section className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[24px] p-6 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  Overview
                </h3>
                <div className="space-y-4">
                  {project.overview && (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                      {project.overview}
                    </p>
                  )}
                  {project.purpose && (
                    <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                      <p className="text-blue-800 dark:text-blue-300 leading-relaxed text-sm font-medium">
                        <span className="font-bold mr-2">Goal:</span>
                        {project.purpose}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {project.description && (
              <section className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[24px] p-6 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  Detailed Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>
              </section>
            )}

            {project.responsibilities && project.responsibilities.length > 0 && (
              <section className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[24px] p-6 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                  My Role
                </h3>
                <ul className="space-y-4">
                  {project.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      <span className="mr-4 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 flex-shrink-0" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features && project.features.length > 0 && (
                <section className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[24px] p-6 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((feat, i) => (
                      <li key={i} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                        <span className="mr-3 mt-1.5 w-1 h-1 rounded-full bg-purple-500 flex-shrink-0" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.challenges && project.challenges.length > 0 && (
                <section className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[24px] p-6 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                    Challenges Solved
                  </h3>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, i) => (
                      <li key={i} className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                        <span className="mr-3 mt-1.5 w-1 h-1 rounded-full bg-orange-500 flex-shrink-0" />
                        <span className="leading-relaxed">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {project.technologies && project.technologies.length > 0 && (
              <section className="bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[24px] p-6 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-5 flex items-center gap-2">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 px-3.5 py-2 bg-gray-50 dark:bg-[#161616] border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1f1f1f] transition-colors group cursor-default"
                    >
                      <span className="opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center text-lg">
                        {getTechIcon(tech)}
                      </span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </motion.div>
    </div>
  );
});
