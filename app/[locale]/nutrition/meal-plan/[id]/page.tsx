import { PlusIcon } from '@heroicons/react/24/outline';
import { Link } from '@/navigation';
import DayFilters from '@/components/filter/dayFilters/dayFilters';
import MealCard from '../../mealCard/mealCard';
import { capitalizeWord } from '@/utils/utils';

export default function MealPlanPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { day: string };
}) {
  const { id } = params;
  const { day } = searchParams;

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

  const getMealPlans = () => {
    return meals;
  };

  const filteredMeals = getMealPlans();

  return (
    <div className="flex-1 flex flex-col max-w-screen-xl w-full px-8 justify-center gap-2 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-bold px-4">Meal Plan</h1>
        <Link
          href="/nutrition/add-meal"
          className="flex gap-2 bg-secondary w-fit px-4 py-2 rounded-2xl"
        >
          <PlusIcon className="w-6 h-6" />
          Add Meal
        </Link>
      </div>
      <DayFilters currentDay={day} />
      <div className="mt-4">
        <span>Breakfast</span>
        {filteredMeals.map((meal) => {
          return (
            <MealCard
              key={meal.id}
              title={meal.title}
              ingredients={capitalizeWord(meal.ingredients.join(', '))}
              description={meal.description}
              imageUrl={meal.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}
