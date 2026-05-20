import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'HypeMeter AI | Predict What Fashion Will Go Viral',
  description: 'AI-powered fashion trend and virality intelligence platform.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark antialiased`}>
      <body className="bg-[#0B0B0C] text-[#E6E6E6] selection:bg-[#39FF14]/30 selection:text-[#39FF14] min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
