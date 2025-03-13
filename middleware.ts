import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getSubscription } from './requests/subscription';
import { routing } from './i18n/routing';

const publicPages = ['/', '/login', '/signup'];

const intlMiddleware = createMiddleware(routing);

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

    const { subscription, error } = await getSubscription();

    if (error) {
      request.nextUrl.pathname = `/${defaultLocale}`;
      return NextResponse.redirect(request.nextUrl);
    }

    if (subscription.status !== 'active') {
      request.nextUrl.pathname = `/${defaultLocale}`;
      return NextResponse.redirect(request.nextUrl);
    }

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
    `^(/(${routing.locales.join('|')}))?(${publicPages
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
