import { Key } from 'react';
import { cookies } from 'next/headers';
import { Link } from '@/i18n/navigation';
import { logout } from '@/requests/auth';
import { getSubscription } from '@/requests/subscription';
import { ModeToggle } from '../mode-toggle/mode-toggle';
import { Button } from '../ui/button';
import LocaleToggle from '../locale-toggle/locale-toggle';

type LinkProps = {
  name: string;
  path: string;
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
    <nav className="flex items-center bg-background h-20 drop-shadow-md">
      <div className="w-full mx-8 flex justify-between items-center text-sm">
        <Link href="/" className="font-semibold text-xl">
          FitLy
        </Link>
        <div className="hidden lg:flex gap-6 items-center">
          {subscription &&
            subscription.status === 'active' &&
            links.map((link, index) => {
              return (
                <Link
                  key={index as Key}
                  className="text-lg p-2 px-4 rounded-full font-base"
                  href={link.path}
                  locale={locale as 'en' | 'fr'}
                >
                  {link.name}
                </Link>
              );
            })}
          {cookies().get('token') ? (
            <form action={logout}>
              <Button
                variant="secondary"
                type="submit"
                className="py-3 px-4 text-base min-h-fit"
              >
                Log out
              </Button>
            </form>
          ) : (
            <>
              <Link
                href="/login"
                className="py-3 px-4 rounded-lg text-base bg-primary hover:bg-primary/50 transition-all ease-in duration-200 text-white outline-0"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="py-3 px-4 rounded-lg text-base bg-secondary hover:bg-secondary/50 transition-all ease-in duration-200 outline-0"
              >
                Sign Up
              </Link>
            </>
          )}

          <LocaleToggle newLocale={newLocale} />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
