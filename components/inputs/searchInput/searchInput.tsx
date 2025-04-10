'use client';

import { InputHTMLAttributes, useRef } from 'react';
import { Search } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Input } from '@/components/ui/input';

type SearchInputProps = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({ className, ...otherProps }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={`relative ${className || ''} h-fit`}>
      <div className="absolute aspect-square h-full top-0 left-2 flex items-center ml-1">
        <Search className="absolute aspect-square h-3/5" />
      </div>
      <Input
        ref={inputRef}
        className="input bg-card text-foreground placeholder:text-foreground w-full focus:outline-0 indent-9 text-lg font-light"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            router.push({
              pathname,
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
