import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { FieldError } from 'react-hook-form';

const FormError = ({ error }: { error?: FieldError }) => {
  return (
    <div className="flex gap-2 justify-end text-red-400">
      <div className="w-6 h-6">{error && <ExclamationCircleIcon />}</div>
      {error && error.message}
    </div>
  );
};

export default FormError;
