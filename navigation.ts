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
  '/nutrition/add-meal': '/nutrition/add-meal',
  '/nutrition/edit-meal/[id]': '/nutrition/edit-meal/[id]',
  '/community': '/community'
} satisfies Pathnames<typeof locales>;

export type AppPathnames = keyof typeof pathnames;

export type AppPathname = string extends AppPathnames ? string : never;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames
  });
