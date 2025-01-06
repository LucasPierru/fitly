import { Plus, Search } from 'lucide-react';
import MealCard from './mealCard/mealCard';

export default function MealsPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div className="col-span-full flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">My Meals</h1>
        <button type="button" className="btn btn-primary text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Meal
        </button>
      </div>
      <div className="col-span-full flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search meals..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {/* <MealFilters /> */}
      </div>
      <MealCard />
      <MealCard />
      <MealCard />
      <MealCard />
      <MealCard />
      <MealCard />
      <MealCard />
      <MealCard />
    </div>
  );
}
