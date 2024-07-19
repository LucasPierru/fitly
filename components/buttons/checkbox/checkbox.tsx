import { ReactNode } from 'react';

type CheckboxProps = {
  children: ReactNode;
};

const Checkbox = ({ children }: CheckboxProps) => {
  return (
    <div>
      <input
        id="checkbox"
        type="checkbox"
        className="checkbox checkbox-primary bg-secondary [--chkfg:white]"
      />
      <label htmlFor="checkbox" className="ml-2">
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
