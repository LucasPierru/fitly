import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { localePrefix, locales, pathnames } from './navigation';

const publicPages = ['/', '/login', '/signup', '/signup/subscribe'];

const intlMiddleware = createMiddleware({
  defaultLocale: 'fr',
  localePrefix,
  locales,
  pathnames
});

const authMiddleware = async (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers);
  const defaultLocale = request.headers.get('x-default-locale') || 'en';
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    if (!token) {
      request.nextUrl.pathname = `/${defaultLocale}/login`;
    }
    const intlResponse = intlMiddleware(request);
    intlResponse.headers.set('x-default-locale', defaultLocale);
    return intlResponse;
  } catch (error) {
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }
};

export default async function middleware(request: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(request);
  }
  return authMiddleware(request);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(fr|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
