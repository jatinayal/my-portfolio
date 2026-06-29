'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
  FaEnvelope
} from 'react-icons/fa';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
} from 'react-icons/si';
import { FiArrowUpRight, FiCode, FiGlobe } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const ContactModal = dynamic(() => import('@/components/ui/ContactModal'), { ssr: false });

const INITIAL_TILES = [
  'project-1',
  'maps',
  'tools',
  'project-2',
  'instagram',
  'linkedin',
  'github',
  'contact'
];

export default function WallBentoGrid() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [tiles, setTiles] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Hydration and localStorage persistence
  useEffect(() => {
    const saved = localStorage.getItem('wall-layout');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only keep tiles that still exist in INITIAL_TILES
        const validParsed = parsed.filter((t: string) => INITIAL_TILES.includes(t));
        // Ensure missing tiles are appended
        const missingTiles = INITIAL_TILES.filter(t => !validParsed.includes(t));
        setTiles([...validParsed, ...missingTiles]);
      } catch (e) {
        setTiles(INITIAL_TILES);
      }
    } else {
      setTiles(INITIAL_TILES);
    }
  }, []);

  const handleOpenContactModal = useCallback(() => {
    setIsContactModalOpen(true);
  }, []);

  const handleCloseContactModal = useCallback(() => {
    setIsContactModalOpen(false);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts, allows clicks to pass through
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // Long press of 250ms required to start dragging on touch devices
        tolerance: 5, // Allow 5px of movement during the long press
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTiles((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        localStorage.setItem('wall-layout', JSON.stringify(newItems));
        return newItems;
      });
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  // Only render once client-side hydrated to avoid mismatch
  if (tiles.length === 0) {
    return (
      <section className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-0 h-auto lg:h-[calc(100vh-120px)] flex items-center justify-center opacity-0" />
    );
  }

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 py-8 lg:py-16 flex items-center justify-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 w-full md:auto-rows-[320px] lg:auto-rows-[340px] md:grid-flow-row-dense">
          <SortableContext items={tiles} strategy={rectSortingStrategy}>
            {tiles.map((id) => (
              <SortableTile key={id} id={id}>
                <TileContent id={id} handleOpenContactModal={handleOpenContactModal} />
              </SortableTile>
            ))}
          </SortableContext>
        </div>

        <DragOverlay dropAnimation={{
          ...defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.4',
              },
            },
          }),
        }}>
          {activeId ? (
            <div className={`w-full h-full ${TILE_CLASSES[activeId]} cursor-grabbing scale-105 shadow-2xl rounded-[32px] overflow-hidden`}>
              <TileContent id={activeId} handleOpenContactModal={handleOpenContactModal} isOverlay />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {isContactModalOpen && (
        <ContactModal isOpen={isContactModalOpen} onClose={handleCloseContactModal} />
      )}
    </section>
  );
}

// -------------------------------------------------------------
// Sortable Wrapper
// -------------------------------------------------------------

const TILE_CLASSES: Record<string, string> = {
  'project-1': 'h-[320px] md:h-full lg:col-span-2',
  'maps': 'h-[320px] md:h-full',
  'tools': 'h-[460px] md:h-full md:row-span-2 lg:row-span-2',
  'linkedin': 'h-[320px] md:h-full',
  'instagram': 'h-[320px] md:h-full',
  'github': 'h-[320px] md:h-full',
  'project-2': 'h-[460px] md:h-full md:row-span-2 lg:row-span-2',
  'contact': 'h-[220px] md:h-full lg:col-span-2'
};

function SortableTile({ id, children }: { id: string, children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 0 : 1,
  };

  const getTileContext = () => {
    switch(id) {
      case 'github': return { color: '#000000', label: 'Drag GitHub' };
      case 'linkedin': return { color: '#0A66C2', label: 'Drag LinkedIn' };
      case 'instagram': return { color: '#d6249f', label: 'Drag Instagram' };
      case 'contact': return { color: '#FF6B6B', label: 'Drag Contact' };
      case 'project-1': return { color: '#3b82f6', label: 'Drag Project' };
      case 'project-2': return { color: '#10b981', label: 'Drag Project' };
      case 'tools': return { color: '#8b5cf6', label: 'Drag Tools' };
      case 'maps': return { color: '#34d399', label: 'Drag Map' };
      default: return { color: '#FFD13B', label: 'Drag Tile' };
    }
  };

  const context = getTileContext();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${TILE_CLASSES[id]} cursor-grab ${isDragging ? 'opacity-30 scale-95' : ''} outline-none`}
      {...attributes}
      {...listeners}
      data-cursor={isDragging ? "Grabbing..." : context.label}
      data-cursor-type={isDragging ? "grabbing" : "drag"}
      data-cursor-color={context.color}
    >
      {/* Disable pointer events on children during drag to prevent interference */}
      <div className={`w-full h-full ${isDragging ? 'pointer-events-none' : ''}`}>
        {children}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Tile Contents
// -------------------------------------------------------------

function TileContent({ id, handleOpenContactModal, isOverlay = false }: { id: string, handleOpenContactModal: () => void, isOverlay?: boolean }) {
  const [mapImgSrc, setMapImgSrc] = useState('/map.memoji.png');

  switch (id) {
    case 'project-1':
      return (
        <div className="h-full relative rounded-[32px] overflow-hidden bg-gray-100 dark:bg-[#111] border border-gray-100 dark:border-gray-800 shadow-sm group w-full">
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
            <Image
              src="/project1.png"
              alt="Project 1"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          <Link href="/projects" onClick={(e) => { if (isOverlay) e.preventDefault(); e.stopPropagation(); }} className="absolute top-6 right-6 w-12 h-12 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 shadow-md border border-gray-100 dark:border-gray-800 z-30 hover:scale-110 hover:bg-white dark:hover:bg-black cursor-pointer pointer-events-auto" data-cursor="Open Projects" data-cursor-type="pointer" data-cursor-color="#3b82f6">
            <FiArrowUpRight className="text-gray-900 dark:text-white text-lg" />
          </Link>
        </div>
      );

    case 'maps':
      return (
        <div className="relative h-full w-full rounded-[32px] overflow-hidden bg-gray-100 shadow-sm border border-gray-100 dark:border-gray-800 group">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 pointer-events-none">
            <iframe
              src="https://maps.google.com/maps?q=Noida,%20India&t=&z=11&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full opacity-90 dark:opacity-80"
              tabIndex={-1}
            />
          </div>
          <div className="absolute inset-0 bg-blue-500/10 mix-blend-multiply transition-colors duration-500 group-hover:bg-blue-500/20 pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-40 scale-150" />
              <div className="w-24 h-24 bg-blue-100/80 dark:bg-blue-900/80 backdrop-blur-md rounded-full border-[3px] border-white dark:border-gray-800 shadow-xl flex items-center justify-center relative z-10 overflow-hidden">
                <Image
                  src={mapImgSrc}
                  alt="My Location"
                  fill
                  sizes="96px"
                  className="object-contain translate-y-1 p-2"
                  onError={() => setMapImgSrc('/memoji.png')}
                />
              </div>
              <FaMapMarkerAlt className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[#FF3B30] text-3xl drop-shadow-md z-20" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-center z-20 pointer-events-none">
            <span className="px-3 py-1.5 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900 dark:text-white shadow-sm inline-block">
              📍 Noida, India
            </span>
          </div>
          <Link href="https://maps.app.goo.gl/gq4LnGJngTD3mefSA" target="_blank" onClick={(e) => { if (isOverlay) e.preventDefault(); e.stopPropagation(); }} className="absolute top-6 right-6 w-10 h-10 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-30 hover:bg-white dark:hover:bg-black hover:scale-110 cursor-pointer pointer-events-auto shadow-md" data-cursor="Open Google Maps" data-cursor-type="pointer" data-cursor-color="#34d399">
            <FiArrowUpRight className="text-gray-900 dark:text-white text-lg" />
          </Link>
        </div>
      );
    case 'tools':
      return (
        <div className="relative h-full w-full rounded-[32px] overflow-hidden bg-[#FAFAFA] dark:bg-[#111] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center p-8 group">
          <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="relative z-10 text-center mb-8 pointer-events-none">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Tech Arsenal</h3>
            <p className="text-xs lg:text-sm text-gray-500 mt-1">Tools I use daily</p>
          </div>
          <div className="relative w-full flex-1 flex items-center justify-center min-h-[300px] lg:min-h-0 pointer-events-none">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[5%] left-[10%] w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center text-[#61DAFB] text-3xl border border-gray-100 dark:border-gray-700"><SiReact /></motion.div>
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] right-[5%] w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-black dark:text-white text-4xl border border-gray-100 dark:border-gray-700"><SiNextdotjs /></motion.div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[40%] left-[5%] w-12 h-12 bg-white dark:bg-gray-800 rounded-[18px] shadow-lg flex items-center justify-center text-[#3178C6] text-2xl border border-gray-100 dark:border-gray-700"><SiTypescript /></motion.div>
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[45%] right-[10%] w-12 h-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center text-[#339933] text-2xl border border-gray-100 dark:border-gray-700"><SiNodedotjs /></motion.div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[25%] left-[15%] w-14 h-14 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-[#47A248] text-3xl border border-gray-100 dark:border-gray-700"><SiMongodb /></motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[20%] right-[15%] w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center text-[#38B2AC] text-3xl border border-gray-100 dark:border-gray-700"><SiTailwindcss /></motion.div>
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black dark:bg-white rounded-[24px] shadow-xl flex items-center justify-center text-white dark:text-black text-4xl z-10 border-4 border-[#FAFAFA] dark:border-[#111]"><FiCode /></motion.div>
          </div>
          <Link href="/tools" onClick={(e) => { if (isOverlay) e.preventDefault(); e.stopPropagation(); }} className="absolute top-6 right-6 w-10 h-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-30 hover:bg-white dark:hover:bg-black hover:scale-110 cursor-pointer pointer-events-auto shadow-md" data-cursor="View Tools" data-cursor-type="pointer" data-cursor-color="#8b5cf6">
            <FiArrowUpRight className="text-gray-900 dark:text-white text-lg" />
          </Link>
        </div>
      );
    case 'linkedin':
      return (
        <div className="h-full w-full rounded-[32px] bg-[#0A66C2] text-white p-8 flex flex-col justify-between group relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl transform translate-x-10 -translate-y-10 pointer-events-none" />
          <div className="flex-1 flex items-center justify-center relative z-10 pointer-events-none">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
              <FaLinkedin className="text-4xl lg:text-6xl drop-shadow-md" />
            </div>
          </div>
          <Link href="https://linkedin.com" target="_blank" onClick={(e) => { if (isOverlay) e.preventDefault(); e.stopPropagation(); }} className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-30 hover:bg-white/40 hover:scale-110 cursor-pointer pointer-events-auto" data-cursor="View LinkedIn" data-cursor-type="pointer" data-cursor-color="#0A66C2">
            <FiArrowUpRight className="text-white text-lg" />
          </Link>
        </div>
      );
    case 'instagram':
      return (
        <div className="h-full w-full rounded-[32px] text-white p-8 flex flex-col justify-between group relative overflow-hidden shadow-sm" style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)' }}>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
          <div className="flex-1 flex items-center justify-center relative z-10 pointer-events-none">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
              <FaInstagram className="text-4xl lg:text-6xl drop-shadow-md" />
            </div>
          </div>
          <Link href="https://instagram.com" target="_blank" onClick={(e) => { if (isOverlay) e.preventDefault(); e.stopPropagation(); }} className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-30 hover:bg-white/40 hover:scale-110 cursor-pointer pointer-events-auto" data-cursor="View Instagram" data-cursor-type="pointer" data-cursor-color="#d6249f">
            <FiArrowUpRight className="text-white text-lg" />
          </Link>
        </div>
      );
    case 'github':
      return (
        <div className="h-full w-full rounded-[32px] bg-[#0D1117] text-white p-8 flex flex-col justify-between group relative overflow-hidden shadow-sm">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#58A6FF]/20 rounded-full blur-3xl transform translate-x-10 translate-y-10 pointer-events-none" />
          <div className="flex-1 flex items-center justify-center relative z-10 pointer-events-none">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
              <FaGithub className="text-4xl lg:text-6xl drop-shadow-md" />
            </div>
          </div>
          <Link href="https://github.com" target="_blank" onClick={(e) => { if (isOverlay) e.preventDefault(); e.stopPropagation(); }} className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-30 hover:bg-white/20 hover:scale-110 cursor-pointer pointer-events-auto" data-cursor="View GitHub" data-cursor-type="pointer" data-cursor-color="#000000">
            <FiArrowUpRight className="text-white text-lg" />
          </Link>
        </div>
      );
    case 'project-2':
      return (
        <div className="h-full w-full relative rounded-[32px] overflow-hidden bg-gray-100 dark:bg-[#1A1A1A] border border-transparent dark:border-gray-800 shadow-sm group">
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
            <Image
              src="/project2.png"
              alt="Project 2"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>
          <Link href="/projects" onClick={(e) => { if (isOverlay) e.preventDefault(); e.stopPropagation(); }} className="absolute top-6 right-6 w-12 h-12 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 shadow-md border border-gray-100 dark:border-gray-700 z-30 hover:scale-110 hover:bg-white dark:hover:bg-black cursor-pointer pointer-events-auto" data-cursor="Open Projects" data-cursor-type="pointer" data-cursor-color="#10b981">
            <FiArrowUpRight className="text-gray-900 dark:text-white text-lg" />
          </Link>
        </div>
      );
    case 'contact':
      return (
        <div className="h-full w-full relative rounded-[32px] overflow-hidden bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center p-8 lg:p-12 group">
          <div className="flex-1 z-10 pointer-events-none">
            <h3 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-3">Let's Connect</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 lg:mb-8 max-w-xs text-xs lg:text-base leading-relaxed">
              Reach out for collaborations, project inquiries, or just to say hi!
            </p>
            <button 
              onClick={(e) => { 
                if (isOverlay) e.preventDefault(); 
                else handleOpenContactModal();
                e.stopPropagation();
              }}
              className="px-5 py-2.5 lg:px-6 lg:py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold text-sm lg:text-base hover:scale-105 transition-transform duration-300 flex items-center space-x-2 shadow-md cursor-pointer pointer-events-auto"
              data-cursor="Let's Connect"
              data-cursor-color="#FF6B6B"
            >
              <FaEnvelope className="text-xs lg:text-sm" />
              <span>Reach Out</span>
            </button>
          </div>
          <div className="w-[45%] lg:w-1/2 h-full flex items-center justify-center relative z-0 pointer-events-none">
            <div className="absolute inset-0 bg-gray-500/5 dark:bg-gray-500/10 rounded-full blur-[60px] transform translate-x-10" />
            <div className="relative w-full max-w-[280px] aspect-[5/4] mt-2 lg:mt-8">
              
              {/* Envelope Back */}
              <div className="absolute bottom-0 left-0 w-full h-[65%] bg-[#F0F0F0] dark:bg-[#2A2A2A] rounded-2xl shadow-inner border border-gray-200 dark:border-gray-800" />

              {/* Card 3 (Left - Purple) */}
              <div className="absolute bottom-[20%] left-[5%] w-[65%] h-[75%] bg-[#5D5FEF] rounded-2xl shadow-lg border border-white/10 p-4 lg:p-5 flex flex-col justify-between transform -rotate-[10deg] group-hover:-translate-y-6 group-hover:-translate-x-1 group-hover:-rotate-[12deg] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[100ms] z-0">
                <span className="text-white/80 font-semibold text-xs lg:text-sm">Inbox</span>
                <span className="text-white font-bold text-lg lg:text-xl tracking-tight">Messages</span>
              </div>

              {/* Card 2 (Middle - Orange) */}
              <div className="absolute bottom-[25%] left-[18%] w-[65%] h-[75%] bg-[#FF6B6B] rounded-2xl shadow-xl border border-white/20 p-4 lg:p-5 flex flex-col justify-between transform -rotate-[4deg] group-hover:-translate-y-8 group-hover:-rotate-[6deg] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[50ms] z-10">
                <div className="flex justify-between items-start">
                  <span className="text-white/90 font-medium text-xs lg:text-sm">Reach Out</span>
                  <span className="text-white/90 text-sm lg:text-base">✦</span>
                </div>
                <span className="text-white font-bold text-xl lg:text-2xl tracking-tight">Collaborate</span>
              </div>

              {/* Card 1 (Right - White) */}
              <div className="absolute bottom-[30%] right-[5%] w-[65%] h-[75%] bg-white dark:bg-[#F8F9FA] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-200 p-4 lg:p-5 flex flex-col justify-between transform rotate-[6deg] group-hover:-translate-y-10 group-hover:rotate-[8deg] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-0 z-20">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 font-medium text-xs lg:text-sm">Say Hi!</span>
                  <div className="w-8 h-4 bg-gray-200 rounded-full flex items-center p-0.5"><div className="w-3 h-3 bg-gray-400 rounded-full" /></div>
                </div>
                <span className="text-black font-black text-2xl lg:text-3xl tracking-tighter flex items-center gap-1">Hi! <span className="text-xl text-black">✦</span></span>
              </div>

              {/* Envelope Front */}
              <div className="absolute bottom-0 left-0 w-full h-[70%] z-30 drop-shadow-2xl">
                <svg viewBox="0 0 200 120" preserveAspectRatio="none" className="w-full h-full text-white dark:text-[#222]">
                  <path d="M0,0 L100,70 L200,0 L200,110 Q200,120 190,120 L10,120 Q0,120 0,110 Z" fill="currentColor" />
                  <path d="M0,120 L100,70 L200,120" stroke="rgba(0,0,0,0.04)" strokeWidth="2" fill="none" />
                  <path d="M0,0 L100,70 L200,0" stroke="rgba(0,0,0,0.02)" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
          </div>
          <button onClick={(e) => { 
            if (isOverlay) e.preventDefault(); 
            else handleOpenContactModal();
            e.stopPropagation();
          }} className="absolute top-6 right-6 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 border border-gray-100 dark:border-gray-700 z-30 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer pointer-events-auto shadow-sm" data-cursor="Let's Connect" data-cursor-type="pointer" data-cursor-color="#FF6B6B">
            <FiArrowUpRight className="text-gray-900 dark:text-white text-base lg:text-lg" />
          </button>
        </div>
      );
    default:
      return null;
  }
}
