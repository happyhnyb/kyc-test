import type { Metadata } from 'next';
import './globals.css';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Ticker } from '@/components/layout/Ticker';

export const metadata: Metadata = {
  title: 'Know Your Commodity',
  description: 'Commodity intelligence platform for India.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Ticker />
        <Header session={null} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
