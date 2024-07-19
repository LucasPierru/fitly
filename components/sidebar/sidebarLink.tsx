'use client';

import { ReactNode } from 'react';
import { Link, AppPathname, usePathname } from '@/navigation';

type SidebarLinkProps = {
  name: string;
  path: AppPathname;
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
