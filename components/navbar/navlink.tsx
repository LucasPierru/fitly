'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const NavLink = ({
  children,
  ...linkProps
}: { children: ReactNode } & LinkProps) => {
  const pathname = usePathname();
  const path = `/${linkProps.locale}${linkProps.href}`;

  return (
    <Link
      {...linkProps}
      className={`text-lg p-2 px-4 hover:bg-gray-200 rounded-full ${pathname === path ? 'font-semibold hover:bg-background' : ''}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
