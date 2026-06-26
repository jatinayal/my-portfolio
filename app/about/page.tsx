import { Metadata } from 'next';
import AboutHero from '@/components/sections/AboutHero';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import EducationList from '@/components/sections/EducationList';

export const metadata: Metadata = {
  title: 'About | Jatin Nayal',
  description: 'Learn more about my background, experience, and education.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] pt-24 pb-20">
      <main className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col gap-12">
        <AboutHero />
        
        {/* Two Column Layout for Experience and Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <ExperienceTimeline />
          <EducationList />
        </div>
      </main>
    </div>
  );
}
