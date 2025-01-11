import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';

export const locales = ['fr', 'en'] as const;
export const localePrefix = 'as-needed';

export const pathnames = {
  '/': '/',
  '/login': '/login',
  '/signup': '/signup',
  '/workouts': '/workouts',
  '/nutrition': '/nutrition',
  '/nutrition/recipes': '/nutrition/recipes',
  '/nutrition/recipes/[id]': '/nutrition/recipes/[id]',
  '/nutrition/products': '/nutrition/products',
  '/nutrition/products/[id]': '/nutrition/products/[id]',
  '/dashboard': '/dashboard',
  '/dashboard/meal-plans': '/dashboard/meal-plans',
  '/dashboard/meal-plans/create': '/dashboard/meal-plans/create',
  '/dashboard/meal-plans/[id]': '/dashboard/meal-plans/[id]',
  '/dashboard/meals': '/dashboard/meals',
  '/dashboard/meals/create': '/dashboard/meals/create',
  '/dashboard/meals/[id]': '/dashboard/meals/[id]',
  '/community': '/community',
  '/meals': '/meals',
  '/planner': '/planner',
  '/profile': '/profile'
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;

export type AppPathname = string extends AppPathnames ? string : never;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames
  });
