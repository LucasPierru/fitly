import Image from 'next/image';
import { Clock, EditIcon, Plus } from 'lucide-react';
import getImage from '@/lib/storage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type MealCardProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  readyInMinutes: number;
  macros: { calories: number; protein: number; carbs: number; fat: number };
  isOwner: boolean;
  addMealAction: () => void;
};

const MealCard = async ({
  id,
  title,
  description,
  image,
  readyInMinutes,
  macros,
  isOwner,
  addMealAction
}: MealCardProps) => {
  const imageData = await getImage(id, image);

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
        <p className="text-md text-gray-500 mt-1 truncate">{description}</p>
        <div className="mt-4 flex items-center justify-between text-md">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{readyInMinutes} min</span>
          </div>
          <span className="font-medium">{macros.calories} kcal</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-md">
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
        <button
          type="button"
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 border border-primary rounded-md text-primary hover:bg-primary hover:text-white transition-all ease-in duration-100"
          onClick={addMealAction}
        >
          <Plus className="h-4 w-4" />
          Add to Plan
        </button>
      </div>
    </Card>
  );
};

export default MealCard;
