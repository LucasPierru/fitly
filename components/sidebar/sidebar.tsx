import { ReactNode } from 'react';
import { AppPathname } from '@/navigation';
import SidebarLink from './sidebarLink';

type SidebarLinkProps = {
  name: string;
  path: AppPathname;
  icon: ReactNode;
};

type SidebarProps = {
  links: SidebarLinkProps[];
};

const Sidebar = ({ links }: SidebarProps) => {
  return (
    <ul className="menu rounded-box w-96 px-8 gap-2">
      {links.map((link) => {
        return (
          <SidebarLink
            key={link.path}
            path={link.path}
            icon={link.icon}
            name={link.name}
          />
        );
      })}
    </ul>
  );
};

export default Sidebar;
