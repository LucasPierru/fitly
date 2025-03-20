'use client';

import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createMealPlan } from '@/requests/meal-plan';
import { useRouter } from '@/i18n/navigation';

const CreateMealButton = () => {
  const router = useRouter();

  return (
    <Button
      type="button"
      onClick={async () => {
        const newPlan = {
          name: 'New Plan',
          description: 'test'
        };
        console.log({ newPlan });
        const { mealPlan } = await createMealPlan(newPlan);
        if (mealPlan) router.push(`/planner/${mealPlan._id}`);
      }}
    >
      <PlusIcon className="h-6 w-6 text-white" /> Create Plan
    </Button>
  );
};

export default CreateMealButton;
