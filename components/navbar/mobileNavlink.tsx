'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const MobileNavLink = ({
  children,
  ...linkProps
}: { children: ReactNode } & LinkProps) => {
  const pathname = usePathname();
  const path = `/${linkProps.locale}${linkProps.href}`;

  return (
    <Link
      {...linkProps}
      className={`flex flex-col items-center ${
        pathname === path ? 'text-primary' : 'text-foreground-secondary'
      }`}
    >
      {children}
    </Link>
  );
};

export default MobileNavLink;
