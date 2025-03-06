import { Key } from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Link as NavLink, pathnames, AppPathname } from '@/navigation';
import { logout } from '@/requests/auth';
import { getSubscription } from '@/requests/subscription';
import { ModeToggle } from '../mode-toggle/mode-toggle';
import { Button } from '../ui/button';

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
      name: 'Profile',
      path: '/profile'
    }
    /* {
      name: 'Community',
      path: '/community'
    } */
  ];

  const { subscription } = await getSubscription();

  return (
    <nav className="flex items-center bg-background h-20 shadow-sm">
      <div className="w-full mx-8 flex justify-between items-center text-sm">
        <Link href="/" className="font-semibold text-xl">
          FitLy
        </Link>
        <div className="hidden lg:flex gap-6 items-center">
          {subscription &&
            subscription.status === 'active' &&
            links.map((link, index) => {
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
          {cookies().get('token') ? (
            <form action={logout}>
              <Button variant="secondary" type="submit">
                Log out
              </Button>
            </form>
          ) : (
            <>
              <NavLink
                href="/login"
                className="py-3 px-4 rounded-lg text-base bg-primary hover:bg-primary/50 transition-all ease-in duration-200 text-white outline-0"
              >
                Log In
              </NavLink>
              <NavLink
                href="/signup"
                className="py-3 px-4 rounded-lg text-base bg-secondary hover:bg-secondary/50 transition-all ease-in duration-200 outline-0"
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
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
