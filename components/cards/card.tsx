import { ReactNode } from 'react';

type CardProps = {
  className?: string;
  children: ReactNode;
};

const Card = ({ className, children }: CardProps) => (
  <div
    className={`bg-background-secondary rounded-lg shadow-sm p-6 ${className || ''}`}
  >
    {children}
  </div>
);

export default Card;
