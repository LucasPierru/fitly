'use client';

import { Plus } from 'lucide-react';
import { Types } from 'mongoose';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { addMealToMealPlan } from '@/requests/meal-plan';

const AddMealButton = ({
  mealId,
  time
}: {
  mealId: Types.ObjectId;
  time: string;
}) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const day = searchParams.get('day') || 'monday';
  const router = useRouter();

  const addMealAction = async () => {
    const newMeals = [
      {
        meal: mealId,
        dishType: time,
        day
      }
    ];
    const { mealPlan } = await addMealToMealPlan({
      _id: params.planId as string,
      meals: newMeals
    });
    router.refresh();
  };

  return (
    <button
      type="button"
      className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 border border-primary rounded-md text-primary hover:bg-primary hover:text-white transition-all ease-in duration-100"
      onClick={addMealAction}
    >
      <Plus className="h-4 w-4" />
      Add to Plan
    </button>
  );
};
export default AddMealButton;
