'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const NavLink = ({
  children,
  ...linkProps
}: { children: ReactNode } & LinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      {...linkProps}
      className={`text-lg p-2 px-4 hover:bg-gray-200 rounded-full ${pathname === linkProps.href ? 'font-semibold hover:bg-background' : ''}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
