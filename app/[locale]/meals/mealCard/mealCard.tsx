import Image from 'next/image';
import { Clock, Plus } from 'lucide-react';

type MealCardProps = {
  title: string;
  ingredientsString: string;
  imageUrl?: string;
  readyInMinutes: number;
  macros: { calories: number; protein: number; carbs: number; fat: number };
};

const MealCard = ({
  title,
  ingredientsString,
  imageUrl,
  readyInMinutes,
  macros
}: MealCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-sm overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={
            imageUrl
              ? imageUrl.replace('312x231', '556x370')
              : '/defaultImage.jpg'
          }
          alt={title}
          fill
          className="w-full h-full object-cover absolute"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{title}</h3>
        <p className="text-md text-gray-500 mt-1 truncate">
          {ingredientsString}
        </p>

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
        >
          <Plus className="h-4 w-4" />
          Add to Plan
        </button>
      </div>
    </div>
  );
};

export default MealCard;
