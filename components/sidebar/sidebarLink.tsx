'use client';

import { ReactNode } from 'react';
import { Link, usePathname } from '@/i18n/navigation';

type SidebarLinkProps = {
  name: string;
  path: string;
  icon: ReactNode;
};

const SidebarLink = ({ name, path, icon }: SidebarLinkProps) => {
  const pathname = usePathname();

  return (
    <li key={path}>
      <Link
        href={path}
        className={`${pathname === path ? 'active' : ''} active:bg-secondary`}
      >
        {icon}
        {name}
      </Link>
    </li>
  );
};

export default SidebarLink;
