import { ReactNode } from 'react';
import { Lexend } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import './globals.css';
import Navbar from '@/components/navbar/navbar';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Fitly',
  description: 'The fastest way to build apps with Next.js and Supabase'
};

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();
  return (
    <html lang={locale} className={`bg-background ${lexend.className}`}>
      <body className="bg-background text-foreground overflow-hidden">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar locale={locale} />
          <main className="overflow-y-auto max-h-[var(--page-size)] flex flex-col items-center scrollbar scrollbar-smooth">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
