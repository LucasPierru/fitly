import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';

const FormError = ({ error }: { error?: string }) => {
  return (
    <Alert variant="destructive">
      {error && <AlertCircle className="h-4 w-4" />}
      <AlertDescription>{error}&nbsp;</AlertDescription>
    </Alert>
  );
};

export default FormError;
