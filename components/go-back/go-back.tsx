'use client';

import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Button } from '../ui/button';

const GoBack = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      size="icon"
      variant="ghost"
      className="flex lg:hidden p-0"
    >
      <ChevronLeftIcon className="!h-8 !w-8" />
    </Button>
  );
};

export default GoBack;
