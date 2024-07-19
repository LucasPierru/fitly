import { ReactNode } from 'react';
import {
  HomeIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  UserIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import Sidebar from '@/components/sidebar/sidebar';
import { AppPathname } from '@/navigation';

export const metadata = {
  title: 'Fitly | Dashboard',
  description: 'Achieve your fitness goals with our workout and meal'
};

export default function DashboardLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const links = [
    {
      name: 'Home',
      path: '/dashboard' as AppPathname,
      icon: <HomeIcon className="w-6 h-6 p-0" />
    },
    {
      name: 'Meal Plans',
      path: '/dashboard/meal-plans' as AppPathname,
      icon: <BuildingStorefrontIcon className="w-6 h-6 p-0" />
    },
    {
      name: 'Meals',
      path: '/dashboard/meals' as AppPathname,
      icon: <BookOpenIcon className="w-6 h-6 p-0" />
    },
    {
      name: 'Profile',
      path: '/dashboard/profile' as AppPathname,
      icon: <UserIcon className="w-6 h-6 p-0" />
    },
    {
      name: 'Settings',
      path: '/dashboard/settings' as AppPathname,
      icon: <Cog6ToothIcon className="w-6 h-6 p-0" />
    }
  ];

  return (
    <div className="flex w-full py-8">
      <Sidebar links={links} />
      <main className="max-w-screen-xl w-full">{children}</main>
    </div>
  );
}
