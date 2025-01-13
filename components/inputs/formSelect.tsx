import {
  ForwardedRef,
  ReactNode,
  SelectHTMLAttributes,
  forwardRef
} from 'react';
import { FieldError } from 'react-hook-form';
import FormError from '../errors/formError/formError';

type Option = {
  name: string;
  value: string | number;
};

type FormInputProps = {
  id: string;
  children?: ReactNode;
  error?: FieldError;
  options: Option[];
} & SelectHTMLAttributes<HTMLSelectElement>;

const FormSelect = forwardRef(
  (
    { id, children, error, options, ...otherProps }: FormInputProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <label htmlFor={id} className="w-full">
        {children}
        <select
          id={id}
          className="select bg-secondary text-foreground placeholder:text-foreground w-full focus:outline-0 mt-2"
          ref={ref}
          {...otherProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <FormError error={error} />}
      </label>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
