import { Key } from 'react';
import Link from 'next/link';
import { Link as NavLink, pathnames, AppPathname } from '@/navigation';

type LinkProps = {
  name: string;
  path: keyof typeof pathnames;
};

const Navbar = async ({ locale }: { locale: string }) => {
  const newLocale = locale === 'en' ? 'fr' : 'en';
  const links: LinkProps[] = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Dashboard',
      path: '/dashboard'
    },
    {
      name: 'Meals',
      path: '/meals'
    },
    {
      name: 'Planner',
      path: '/planner'
    },
    {
      name: 'Community',
      path: '/community'
    }
  ];

  return (
    <nav className="flex items-center bg-background-secondary h-20 shadow-sm">
      <div className="w-full mx-8 flex justify-between items-center text-sm">
        <Link href="/" className="font-semibold text-xl">
          FitLy
        </Link>
        <div className="hidden lg:flex gap-6">
          {links.map((link, index) => {
            return (
              <NavLink
                key={index as Key}
                className="text-lg p-2 px-4 rounded-full font-base"
                href={link.path as AppPathname}
                locale={locale as 'en' | 'fr'}
              >
                {link.name}
              </NavLink>
            );
          })}
          {'test'.includes('t') ? (
            <form>
              <button
                className="btn btn-secondary text-foreground"
                type="submit"
              >
                Log out
              </button>
            </form>
          ) : (
            <>
              <NavLink
                href="/login"
                className="btn btn-primary text-foreground"
              >
                Log In
              </NavLink>
              <NavLink
                href="/signup"
                className="btn btn-secondary text-foreground"
              >
                Sign Up
              </NavLink>
            </>
          )}

          <NavLink
            className="text-lg p-2 px-4 rounded-full font-semibold"
            href="/"
            locale={newLocale}
          >
            {newLocale.toUpperCase()}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
