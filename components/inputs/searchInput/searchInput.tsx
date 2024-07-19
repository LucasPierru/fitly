'use client';

import { useRef } from 'react';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import { useRouter, usePathname, AppPathname } from '@/navigation';

const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="relative">
      <div className="absolute aspect-square h-full top-0 flex items-center ml-1">
        <MagnifyingGlassCircleIcon className="absolute aspect-square h-5/6" />
      </div>
      <input
        ref={inputRef}
        className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0 indent-9 text-lg font-light"
        placeholder="Search for recipes"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            router.push({
              pathname: pathname as AppPathname,
              query: { query: inputRef?.current?.value }
            });
          }
        }}
      />
    </div>
  );
};

export default SearchInput;
