import { Key } from 'react';
import Link from 'next/link';
import { Link as NavLink, pathnames } from '@/navigation';

type LinkProps = {
  name: string;
  path: keyof typeof pathnames;
};

const Navbar = async ({ locale }: { locale: string }) => {
  /* const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: users } = await supabase
    .from('Users')
    .select('*')
    .eq('id', user?.id);
 */
  const newLocale = locale === 'en' ? 'fr' : 'en';
  const links: LinkProps[] = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Workouts',
      path: '/workouts'
    },
    {
      name: 'Nutrition',
      path: '/nutrition'
    },
    {
      name: 'Community',
      path: '/community'
    }
  ];

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-20">
      <div className="w-full mx-12 flex justify-between items-center p-3 text-sm">
        <Link href="/" className="font-semibold text-xl">
          FitLy
        </Link>
        <div className="hidden lg:flex gap-6">
          {links.map((link, index) => {
            return (
              <NavLink
                key={index as Key}
                className="text-lg p-2 px-4 rounded-full font-base"
                href={link.path}
              >
                {link.name}
              </NavLink>
            );
          })}
          <NavLink href="/login" className="btn btn-primary text-foreground">
            Log In
          </NavLink>
          <NavLink href="/signup" className="btn btn-secondary text-foreground">
            Sign Up
          </NavLink>
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
