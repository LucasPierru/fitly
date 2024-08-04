import { ReactNode } from 'react';
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

type RadioButtonProps = {
  id: string;
  name: string;
  selectedValue: string;
  value: string;
  children: ReactNode;
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
};

const RadioButton = ({
  id,
  name,
  selectedValue,
  value,
  children,
  register
}: RadioButtonProps) => {
  return (
    <label
      htmlFor={id}
      className={`cursor-pointer border-secondary border-2 rounded-lg p-3 ${selectedValue === value ? 'bg-primary' : ''}`}
    >
      {children}
      <input
        id={id}
        type="radio"
        value={value}
        className="hidden"
        {...register(name, {
          required: true
        })}
      />
    </label>
  );
};

export default RadioButton;
