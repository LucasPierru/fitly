import {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef
} from 'react';
import { FieldError } from 'react-hook-form';
import FormError from '../errors/formError/formError';

type FormInputProps = {
  id: string;
  className?: string;
  children?: ReactNode;
  error?: FieldError;
  type: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = forwardRef(
  (
    { id, className, children, error, type, ...otherProps }: FormInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <label htmlFor={id} className={`w-full ${className || ''}`}>
        {children}
        <input
          id={id}
          type={type}
          className="input bg-secondary text-foreground placeholder:text-foreground w-full focus:outline-0 mt-2"
          ref={ref}
          {...otherProps}
        />
        {error && <FormError error={error} />}
      </label>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
