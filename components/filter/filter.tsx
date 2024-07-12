'use client';

import { Key, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link, usePathname } from '@/navigation';
import { capitalizeWord } from '@/utils/utils';

type FilterProps = {
  selectedFilter: string;
  filters: string[];
};

const Filter = ({ selectedFilter, filters }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <button
      type="button"
      onClick={() => {
        setIsOpen((previousState) => !previousState);
      }}
      className={`flex justify-between relative gap-2 bg-secondary min-w-36 px-4 py-2 ${isOpen ? 'rounded-t-2xl' : 'rounded-2xl'}`}
    >
      <span>{selectedFilter}</span>
      <ChevronDownIcon className="w-6 h-6" />
      {isOpen && (
        <div className="absolute flex flex-col bg-secondary top-10 pt-1 pb-3 left-0 w-full rounded-b-2xl gap-0 z-20">
          {filters.map((filter, index) => {
            return (
              <Link
                key={index as Key}
                href={{ pathname, query: { time: filter } }}
                className="text-left px-4 py-1 hover:bg-primary"
              >
                {capitalizeWord(filter)}
              </Link>
            );
          })}
        </div>
      )}
    </button>
  );
};

export default Filter;
