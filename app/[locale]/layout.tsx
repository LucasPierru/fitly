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
          <div className="overflow-y-auto max-h-[var(--page-size)] scrollbar scrollbar-smooth">
            <main className="flex flex-col items-center">{children}</main>
            <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
              <p>
                Powered by{' '}
                <a
                  href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Supabase
                </a>
              </p>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
