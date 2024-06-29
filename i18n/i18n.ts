import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['fr', 'en'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as string)) notFound();

  const messages = {
    ...(await import(`./locales/${locale}/home.json`)).default,
    ...(await import(`./locales/${locale}/common.json`)).default
  };

  return {
    messages
  };
});
