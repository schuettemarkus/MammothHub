import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'TUSKS UP — Utah Mammoth Playoff Hub | Game 3 Tonight',
  description:
    'The first home playoff game in Utah Mammoth franchise history. Game 3 vs Vegas Golden Knights — April 24, 2026, 7:30 PM MT at Delta Center.',
  openGraph: {
    title: 'TUSKS UP — Utah Mammoth Playoff Hub',
    description: 'Game 3 · First Home Playoff Game Ever · 7:30 PM MT',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-mammoth-black text-mammoth-bone antialiased">
        {children}
      </body>
    </html>
  );
}
