'use client';

import { usePathname, Link } from '@/i18n/navigation';

const LocaleToggle = ({ newLocale }: { newLocale: string }) => {
  const pathname = usePathname();

  return (
    <Link
      className="text-lg p-2 px-4 rounded-full font-semibold"
      href={{ pathname }}
      locale={newLocale}
    >
      {newLocale.toUpperCase()}
    </Link>
  );
};

export default LocaleToggle;
