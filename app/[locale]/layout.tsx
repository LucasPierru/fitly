import { ReactNode } from 'react';
import { Lexend } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import './globals.css';
import Navbar from '@/components/navbar/navbar';
import MobileNavbar from '@/components/navbar/mobileNavbar';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Fitly',
  description: 'Achieve your fitness goals with our workout and meal'
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
          <div className="overflow-y-auto max-h-[var(--page-size)] scrollbar scrollbar-smooth pb-16 lg:pb-0">
            <main className="max-w-7-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
          <MobileNavbar locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
