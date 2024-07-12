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
  const defaultTimeFilter = 'all';
  const { time } = searchParams;

  const meals = [
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

  const getMeals = () => {
    if (!time || time === 'all') {
      return meals;
    }
    return meals.filter((meal) => meal.time === time);
  };

  const filteredMeals = getMeals();

  return (
    <div className="flex-1 flex flex-col max-w-screen-xl w-full px-8 justify-center gap-2 py-8">
      <h1 className="text-3xl text-bold">Setup your meals</h1>
      <div className="flex gap-2 mb-4">
        <Filter
          selectedFilter={
            time ? capitalizeWord(time) : capitalizeWord(defaultTimeFilter)
          }
          filters={filters}
        />
        <Link
          href="/nutrition/add-meal"
          className="flex gap-2 bg-secondary w-fit px-4 py-2 rounded-2xl"
        >
          <PlusIcon className="w-6 h-6" />
          Add meal
        </Link>
      </div>
      <div>
        {filteredMeals.map((meal) => (
          <MealCard
            key={meal.id}
            title={meal.title}
            ingredients={capitalizeWord(meal.ingredients.join(', '))}
            description={meal.description}
            imageUrl={meal.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
