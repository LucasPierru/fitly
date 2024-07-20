'use client';

import { useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, usePathname, AppPathname } from '@/navigation';

const SearchInput = ({ ...otherProps }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="relative">
      <div className="absolute aspect-square h-full top-0 left-2 flex items-center ml-1">
        <MagnifyingGlassIcon className="absolute aspect-square h-3/5" />
      </div>
      <input
        ref={inputRef}
        className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0 indent-9 text-lg font-light"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            router.push({
              pathname: pathname as AppPathname,
              query: { query: inputRef?.current?.value }
            });
          }
        }}
        {...otherProps}
      />
    </div>
  );
};

export default SearchInput;
