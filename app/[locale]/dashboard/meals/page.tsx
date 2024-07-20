import { PlusIcon } from '@heroicons/react/24/outline';
import { Link } from '@/navigation';
import MealCard from './mealCard/mealCard';
import SearchInput from '@/components/inputs/searchInput/searchInput';
import { capitalizeWord } from '@/utils/utils';

export default function MealsPage({
  searchParams
}: {
  searchParams: { day: string };
}) {
  const { day, query } = searchParams;
  const mealTimes = ['all', 'breakfast', 'lunch', 'dinner', 'snack'];

  const mealsMock = [
    {
      id: '1',
      title: 'Sweet and sour tofu',
      description:
        'Scrambled eggs with spinach and feta, tomato slices, coffee with almond milk',
      ingredients: [
        'eggs',
        'spinach',
        'feta',
        'tomatoes',
        'coffee',
        'almond milk'
      ],
      imageUrl: '/meals/sweet_sour_tofu.jpg',
      time: 'lunch'
    },
    {
      id: '2',
      title: 'Honey garlic chicken',
      description:
        'Scrambled eggs with spinach and feta, tomato slices, coffee with almond milk',
      ingredients: ['chicken', 'honey', 'garlic'],
      imageUrl: '/meals/honey_garlic_chicken.jpg',
      time: 'dinner'
    },
    {
      id: '3',
      title: 'French toasts',
      description:
        'Scrambled eggs with spinach and feta, tomato slices, coffee with almond milk',
      ingredients: ['bread', 'milk', 'eggs', 'sugar', 'maple syrup'],
      imageUrl: '/meals/french_toast.jpg',
      time: 'breakfast'
    }
  ];

  const getMealPlans = () => {
    return mealsMock;
  };

  const getTimeMeals = (meals: typeof mealsMock, time: string) => {
    if (time === 'all' || time === '') return meals;
    return meals.filter((meal) => meal.time === time);
  };

  const meals = getMealPlans();

  return (
    <div className="flex-1 flex flex-col max-w-screen-xl px-8 w-full justify-center gap-4">
      <SearchInput placeholder="Search for meals" />
      <div className="flex justify-between">
        <div className="flex">
          {mealTimes.map((mealTime) => {
            return (
              <Link
                key={mealTime}
                className={`px-4 py-2 bg-secondary rounded-2xl mr-2 ${mealTime === day ? 'bg-foreground text-black' : ''}`}
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
          href="/dashboard/meal-plans/create"
          className="flex gap-2 bg-secondary w-fit px-4 py-2 rounded-2xl"
        >
          <PlusIcon className="w-6 h-6" />
          Create Meal
        </Link>
      </div>
      <div>
        {getTimeMeals(meals, day || '').map((meal) => {
          return (
            <MealCard
              key={meal.id}
              title={meal.title}
              ingredients={meal.ingredients.join(', ')}
              description={meal.description}
              imageUrl={meal.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}
