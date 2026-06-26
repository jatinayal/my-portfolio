import ToolsGrid from '@/components/sections/ToolsGrid';

export const metadata = {
  title: 'Tools | Modern Portfolio',
  description: 'A showcase of the programming languages, frameworks, AI models, and software architectures I utilize.',
};

export default function ToolsPage() {
  return (
    <main className="w-full flex-col items-center justify-center pt-32 pb-16">
      <ToolsGrid />
    </main>
  );
}
