'use client';

import { useState } from 'react';
import { Types } from 'mongoose';
import { useParams, useRouter } from 'next/navigation';
import { XIcon, LoaderCircleIcon } from 'lucide-react';
import { IMeal } from '@/types';
import {
  removeMealFromMealPlan,
  removeMealFromSavedMealPlan
} from '@/requests/meal-plan';
import { Button } from '@/components/ui/button';

const MinMealCard = ({
  meal,
  mealPlanMealId
}: {
  meal: IMeal;
  mealPlanMealId: Types.ObjectId;
}) => {
  const { planId } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative flex flex-col justify-center border border-border rounded-lg p-4 min-h-32">
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin text-primary self-center h-12 w-12" />
      ) : (
        <>
          <div className="flex justify-between">
            <span className="text-base mb-2 block truncate line-clamp-1">
              {meal?.title}
            </span>
            <span>
              {Math.round(meal.nutrition.calories / meal.servings)}kcal
            </span>
          </div>
          <div className="flex gap-2 text-md justify-between">
            <div>
              <span className="text-gray-500">Protein</span>
              <p className="font-medium">
                {Math.round(meal.nutrition.protein / meal.servings)}g
              </p>
            </div>
            <div>
              <span className="text-gray-500">Carbs</span>
              <p className="font-medium">
                {Math.round(meal.nutrition.carbs / meal.servings)}g
              </p>
            </div>
            <div>
              <span className="text-gray-500">Fat</span>
              <p className="font-medium">
                {Math.round(meal.nutrition.fat / meal.servings)}g
              </p>
            </div>
          </div>
          <Button
            type="button"
            onClick={async () => {
              setIsLoading(true);
              const data = planId
                ? await removeMealFromSavedMealPlan({
                    mealPlanId: planId as string,
                    mealPlanMealId: mealPlanMealId.toString()
                  })
                : await removeMealFromMealPlan({
                    mealPlanMealId: mealPlanMealId.toString()
                  });
              if (!data.error) {
                router.refresh();
              }
            }}
            size="icon"
            variant="destructive"
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full"
          >
            <XIcon />
          </Button>
        </>
      )}
    </div>
  );
};

export default MinMealCard;
