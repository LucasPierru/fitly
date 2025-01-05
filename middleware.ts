import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { localePrefix, locales, pathnames } from './navigation';

const publicPages = ['/', '/login', '/signup'];

const intlMiddleware = createMiddleware({
  defaultLocale: 'fr',
  localePrefix,
  locales,
  pathnames
});

/* const authMiddleware = async (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-next-pathname', request.nextUrl.pathname);
  try {
    return null;
  } catch (e) {
    return NextResponse.error(e);
  }
}; */

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
  return intlMiddleware(request);
  /* return authMiddleware(request); */
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
