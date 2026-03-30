import type { Metadata } from 'next';
import './globals.css';
import { getServerSessionUser } from '@/lib/session';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Ticker } from '@/components/layout/Ticker';

export const metadata: Metadata = {
  title: 'Know Your Commodity',
  description: 'Commodity intelligence platform for India.'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSessionUser();

  return (
    <html lang="en">
      <body>
        <Ticker />
        <Header session={session} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
