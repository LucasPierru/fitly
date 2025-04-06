import { ReactNode } from 'react';
import Image from 'next/image';
import { Clock, EditIcon } from 'lucide-react';
import getImage from '@/lib/storage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IMeal } from '@/types';

type MealCardProps = {
  meal: IMeal;
  isOwner: boolean;
  children: ReactNode;
};

const MealCard = async ({ meal, isOwner, children }: MealCardProps) => {
  const {
    _id,
    image,
    title,
    description,
    cookingMinutes,
    preparationMinutes,
    servings,
    nutrition
  } = meal;

  const imageData = await getImage(_id.toString(), image);

  return (
    <Card>
      <div className="relative w-full h-48">
        <Image
          src={imageData.url || '/defaultImage.jpg'}
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
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{title}</h3>
        <p className="text-md text-muted-foreground mt-1 line-clamp-2">
          {description}
        </p>
        <div className="mt-4 flex items-center justify-between text-md">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{cookingMinutes + preparationMinutes} min</span>
          </div>
          <span className="font-medium">{servings} servings</span>
        </div>
        <span className="block font-semibold mt-4">
          Nutrition facts (per serving)
        </span>
        <div className="mt-4 flex gap-2 text-md justify-between">
          <div>
            <span className="text-muted-foreground">Calories</span>
            <p className="font-medium">
              {Math.round(nutrition.calories / servings)}kcal
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Protein</span>
            <p className="font-medium">
              {Math.round(nutrition.protein / servings)}g
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Carbs</span>
            <p className="font-medium">
              {Math.round(nutrition.carbs / servings)}g
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Fat</span>
            <p className="font-medium">
              {Math.round(nutrition.fat / servings)}g
            </p>
          </div>
        </div>
        {children}
      </div>
    </Card>
  );
};

export default MealCard;
