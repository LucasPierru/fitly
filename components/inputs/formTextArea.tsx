import {
  ForwardedRef,
  TextareaHTMLAttributes,
  ReactNode,
  forwardRef
} from 'react';
import { FieldError } from 'react-hook-form';
import FormError from '../errors/formError/formError';

type FormTextAreaProps = {
  id: string;
  children: ReactNode;
  error?: FieldError;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const FormTextArea = forwardRef(
  (
    { id, children, error, ...otherProps }: FormTextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <label htmlFor={id} className="w-full">
        {children}
        <textarea
          id={id}
          ref={ref}
          className="textarea resize-none text-base bg-secondary text-white placeholder:text-white w-full focus:outline-0 mt-2"
          {...otherProps}
        />
        <FormError error={error} />
      </label>
    );
  }
);

FormTextArea.displayName = 'FormInput';

export default FormTextArea;
