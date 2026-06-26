import ProjectsGrid from '@/components/sections/ProjectsGrid';

export const metadata = {
  title: 'Projects | Modern Portfolio',
  description: 'A curated selection of personal and professional projects.',
};

export default function ProjectsPage() {
  return (
    <main className="w-full flex-col items-center justify-center pt-32 pb-16">
      <ProjectsGrid />
    </main>
  );
}
