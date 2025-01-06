import { Clock, Plus } from 'lucide-react';
import Image from 'next/image';

const MealCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
          alt="Meal"
          fill
          className="w-full h-full object-cover absolute"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">Healthy Bowl</h3>
        <p className="text-md text-gray-500 mt-1">
          Fresh vegetables, quinoa, avocado
        </p>

        <div className="mt-4 flex items-center justify-between text-md">
          <div className="flex items-center gap-2 text-gray-500">
            <Clock className="h-4 w-4" />
            <span>25 min</span>
          </div>
          <span className="font-medium">450 kcal</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-md">
          <div>
            <span className="text-gray-500">Protein</span>
            <p className="font-medium">25g</p>
          </div>
          <div>
            <span className="text-gray-500">Carbs</span>
            <p className="font-medium">45g</p>
          </div>
          <div>
            <span className="text-gray-500">Fat</span>
            <p className="font-medium">15g</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 border border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-50"
        >
          <Plus className="h-4 w-4" />
          Add to Plan
        </button>
      </div>
    </div>
  );
};

export default MealCard;
