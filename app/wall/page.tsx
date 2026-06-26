import WallBentoGrid from '@/components/sections/WallBentoGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wall | Jatin Nayal',
  description: 'A curated showcase of my projects, tools, and social links.',
};

export default function WallPage() {
  return (
    <main className="min-h-screen pt-20">
      <WallBentoGrid />
    </main>
  );
}
