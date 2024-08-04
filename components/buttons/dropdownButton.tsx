'use client';

import { ReactNode, useRef, useState } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import useOutsideClick from '@/hooks/useOutsideClick';

type DropdownButtonProps = {
  children: ReactNode;
};

const DropdownButton = ({ children }: DropdownButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const clickOutsideHandler = () => {
    setIsOpen(false);
  };

  useOutsideClick(ref, clickOutsideHandler);

  return (
    <button
      ref={ref}
      type="button"
      className="relative ml-auto"
      onClick={() => {
        setIsOpen((previousState) => !previousState);
      }}
    >
      {' '}
      <EllipsisHorizontalIcon className="w-6 h-6" />
      {isOpen && (
        <div className="flex flex-col gap-2 absolute bg-secondary rounded-xl px-4 py-2 right-0">
          {children}
        </div>
      )}
    </button>
  );
};

export default DropdownButton;
