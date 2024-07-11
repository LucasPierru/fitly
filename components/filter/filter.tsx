'use client';

import { Key, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type FilterProps = {
  selectedFilter: string;
  filters: string[];
  selectFilter: (filter: string) => void;
};

const Filter = ({ selectedFilter, filters, selectFilter }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setIsOpen((previousState) => !previousState);
      }}
      className={`flex relative gap-2 bg-secondary w-fit px-4 py-2 ${isOpen ? 'rounded-t-2xl' : 'rounded-2xl'}`}
    >
      <span>{selectedFilter}</span>
      <ChevronDownIcon className="w-6 h-6" />
      {isOpen && (
        <div className="absolute flex flex-col bg-secondary top-10 pt-1 pb-3 left-0 w-full rounded-b-2xl gap-0">
          {filters.map((filter, index) => {
            return (
              <button
                key={index as Key}
                type="button"
                className="text-left px-4 py-1  hover:bg-primary"
                onClick={() => {
                  selectFilter(filter);
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>
      )}
    </button>
  );
};

export default Filter;
