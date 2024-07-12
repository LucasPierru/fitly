import { ReactNode, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import FormError from '../errors/formError/formError';

type FormInputProps = {
  id: string;
  children: ReactNode;
  error?: FieldError;
  type: string;
};

const FormInput = forwardRef(
  ({ id, children, error, type, ...otherProps }: FormInputProps, ref) => {
    return (
      <label htmlFor={id} className="w-full">
        {children}
        <input
          id={id}
          type={type}
          className="input bg-secondary text-white placeholder:text-white w-full focus:outline-0 mt-2"
          {...otherProps}
        />
        <FormError error={error} />
      </label>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
