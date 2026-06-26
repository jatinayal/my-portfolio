"use client";

import { motion } from 'framer-motion';
import { educations } from '@/data/education';

export default function EducationList() {
  return (
    <section className="w-full flex flex-col h-full bg-white dark:bg-[#111] border border-gray-100 dark:border-gray-800 rounded-[32px] p-6 md:p-10 shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Education</h2>
        
        <div className="flex flex-col gap-4">
          {educations.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 bg-gray-50 dark:bg-[#161616] border border-transparent dark:border-gray-800 rounded-2xl gap-4 group"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-xl font-bold text-gray-500 shadow-sm mt-1 sm:mt-0">
                  {edu.institution.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    {edu.institution}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-500 mt-3 max-w-sm leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2 ml-17 sm:ml-0">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
