'use client';

import Image from 'next/image';
import { Clock, EditIcon, Plus } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import getImage from '@/lib/storage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IMeal } from '@/types';
import {
  addMealToMealPlan,
  addMealToSavedMealPlan
} from '@/requests/meal-plan';
import { DialogClose } from '@/components/ui/dialog';

type MealCardProps = {
  meal: IMeal & { isOwner: boolean };
  time: string;
};

const MealCard = ({ meal, time }: MealCardProps) => {
  const {
    _id: id,
    title,
    image,
    preparationMinutes,
    cookingMinutes,
    nutrition: macros,
    isOwner
  } = meal;

  const [imageData, setImageData] = useState('');

  const fetchImage = async () => {
    const data = await getImage(id.toString(), image);
    setImageData(data.url || '/defaultImage.jpg');
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const { planId } = useParams();
  const searchParams = useSearchParams();
  const day =
    dayjs(searchParams.get('start')).format('dddd').toLowerCase() ||
    searchParams.get('day') ||
    'monday';
  const router = useRouter();

  const addMealAction = async () => {
    const newMeals = [
      {
        meal: id,
        dishType: time,
        day
      }
    ];
    const data = !planId
      ? await addMealToMealPlan({
          meals: newMeals
        })
      : await addMealToSavedMealPlan({
          _id: planId as string,
          meals: newMeals
        });
    if (!data.error) router.refresh();
  };

  return (
    <Card>
      <div className="relative w-full h-32">
        <Image
          src={imageData || '/defaultImage.jpg'}
          alt={title}
          fill
          className="w-full h-full object-cover absolute rounded-t-xl"
        />
        {isOwner && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
          >
            <EditIcon className="h-6 w-6 text-foreground" />
          </Button>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-base truncate">{title}</h3>
        <div className="mt-2 flex items-center justify-between text-base">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{preparationMinutes + cookingMinutes} min</span>
          </div>
          <span className="font-medium">{macros.calories} kcal</span>
        </div>
        <div className="mt-2 flex gap-2 text-md justify-between">
          <div>
            <span className="text-gray-500">Protein</span>
            <p className="font-medium">{macros.protein}g</p>
          </div>
          <div>
            <span className="text-gray-500">Carbs</span>
            <p className="font-medium">{macros.carbs}g</p>
          </div>
          <div>
            <span className="text-gray-500">Fat</span>
            <p className="font-medium">{macros.fat}g</p>
          </div>
        </div>
        <DialogClose asChild>
          <button
            type="button"
            className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 border border-primary rounded-md text-primary hover:bg-primary hover:text-white transition-all ease-in duration-100"
            onClick={addMealAction}
          >
            <Plus className="h-4 w-4" />
            Add to Plan
          </button>
        </DialogClose>
      </div>
    </Card>
  );
};

export default MealCard;
