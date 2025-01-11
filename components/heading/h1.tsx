import { ReactNode } from 'react';

type H1Props = {
  children: ReactNode;
  className?: string;
};

const H1 = ({ children, className }: H1Props) => {
  return (
    <h1 className={`text-xl font-bold text-foreground ${className}`}>
      {children}
    </h1>
  );
};

export default H1;
