import { PlusIcon } from '@heroicons/react/24/outline';
import { Link } from '@/navigation';
import MealCard from './mealCard/mealCard';
import SearchInput from '@/components/inputs/searchInput/searchInput';
import { capitalizeWord } from '@/utils/utils';
import { getMeals } from '@/actions/ingredients';

export default async function MealsPage({
  searchParams
}: {
  searchParams: { day: string };
}) {
  const { day, query } = searchParams;
  const mealTimes = ['all', 'breakfast', 'lunch', 'dinner', 'snack'];

  const mealsFinal = await getMeals(day);

  return (
    <div className="flex-1 flex flex-col max-w-screen-xl px-8 w-full justify-center gap-4">
      <SearchInput placeholder="Search for meals" />
      <div className="flex justify-between">
        <div className="flex">
          {mealTimes.map((mealTime) => {
            return (
              <Link
                key={mealTime}
                className={`px-4 py-2 rounded-2xl mr-2 ${mealTime === day ? 'bg-foreground text-black' : 'bg-secondary'}`}
                href={{
                  pathname: '/dashboard/meals',
                  query: { day: mealTime }
                }}
              >
                {capitalizeWord(mealTime)}
              </Link>
            );
          })}
        </div>
        <Link
          href="/dashboard/meals/create"
          className="flex gap-2 bg-secondary w-fit px-4 py-2 rounded-2xl"
        >
          <PlusIcon className="w-6 h-6" />
          Create Meal
        </Link>
      </div>
      <div>
        {mealsFinal?.map((meal) => {
          const ingredients = meal.meal_foods.map(
            (ingredient) => ingredient.ingredients.name
          );
          return (
            <MealCard
              key={meal.id}
              title={meal.name}
              ingredients={ingredients.join(', ')}
              description={meal.description}
              imageUrl={meal.picture}
            />
          );
        })}
      </div>
    </div>
  );
}
