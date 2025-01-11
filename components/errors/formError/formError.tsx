import { CircleAlert } from 'lucide-react';
import { FieldError } from 'react-hook-form';

const FormError = ({ error }: { error?: FieldError }) => {
  return (
    <div className="flex gap-2 justify-end text-red-400 mt-2">
      <div className="w-6 h-6">
        {error && <CircleAlert className="h-6 w-6" />}
      </div>
      {error && error.message}
    </div>
  );
};

export default FormError;
