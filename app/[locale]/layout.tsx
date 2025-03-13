import { ReactNode } from 'react';
import { Lexend } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import './globals.css';
import Navbar from '@/components/navbar/navbar';
import MobileNavbar from '@/components/navbar/mobileNavbar';
import { ThemeProvider } from '@/components/theme-provider/theme-provider';

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
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${lexend.className} bg-background`}
      suppressHydrationWarning
    >
      <body className="text-foreground h-screen overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Navbar locale={locale} />
            <div className="overflow-y-auto max-h-[var(--page-size)] h-full scrollbar scrollbar-smooth pb-16 lg:pb-0">
              <main className="max-w-7-xl mx-auto">
                {/*  px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 */}
                {children}
              </main>
              <footer className="bg-background">
                <div className="max-w-7xl mx-auto p-8">Footer</div>
              </footer>
            </div>
            <MobileNavbar locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
