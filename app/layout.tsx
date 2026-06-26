import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { CursorProvider } from '@/components/cursor/CursorProvider';
import CustomCursor from '@/components/cursor/CustomCursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jatin Nayal | Portfolio',
  description: 'Portfolio of Jatin Nayal - Full Stack Developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-[#0a0a0a] text-black dark:text-white antialiased`}>
        <ThemeProvider>
          <CursorProvider>
            <CustomCursor />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
