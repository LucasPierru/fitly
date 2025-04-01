'use client';

import { Edit2Icon, CheckIcon, XIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { Input } from '@/components/ui/input';
import { saveMealPlan } from '@/requests/meal-plan';
import { Button } from '@/components/ui/button';

const EditMetadata = ({
  value,
  name
}: {
  value: string;
  name: 'name' | 'description';
}) => {
  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const id: string = params.planId.toString();

  return (
    <div className="flex items-center gap-2">
      {!isEditing && (
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsEditing(true)}
        >
          <Edit2Icon className="h-4 w-4" />
        </Button>
      )}
      {isEditing && (
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={async () => {
              setIsEditing(false);
            }}
          >
            <XIcon className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={async () => {
              await saveMealPlan({
                _id: id,
                [name]: inputRef.current?.value
              });
              router.refresh();
              setIsEditing(false);
            }}
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      {isEditing ? <Input ref={inputRef} defaultValue={value} /> : value}
    </div>
  );
};

export default EditMetadata;
