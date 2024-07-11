import { PlusIcon } from '@heroicons/react/24/outline';
import Filter from '@/components/filter/filter';
import { capitalizeWord } from '@/utils/utils';
import MealCard from './mealCard/mealCard';
import { Link } from '@/navigation';

export default function NutritionPage({
  searchParams
}: {
  searchParams: { time: string };
}) {
  const filters = ['all', 'breakfast', 'lunch', 'dinner', 'snack'];
  const defaultTimeFilter = 'breakfast';

  return (
    <div className="flex-1 flex flex-col max-w-screen-xl w-full px-8 justify-center gap-2 py-8">
      <h1 className="text-3xl text-bold">Setup your meals</h1>
      <div className="flex gap-2">
        <Filter
          selectedFilter={
            capitalizeWord(searchParams.time) ||
            capitalizeWord(defaultTimeFilter)
          }
          filters={filters}
        />
        <Link
          href="/nutrition"
          className="flex gap-2 bg-secondary w-fit px-4 py-2 rounded-2xl"
        >
          <PlusIcon className="w-6 h-6" />
          Add meal
        </Link>
      </div>
      <div>
        <MealCard
          title="Sweet and sour tofu"
          ingredients="Eggs, spinach, feta, tomatoes, coffee, almond milk"
          description="Scrambled eggs with spinach and feta, tomato slices, coffee with almond milk"
          imageUrl="/meals/sweet_sour_tofu.jpg"
        />
      </div>
    </div>
  );
}
