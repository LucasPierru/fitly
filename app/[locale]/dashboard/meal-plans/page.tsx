import { PlusIcon } from '@heroicons/react/24/outline';
import { Link } from '@/navigation';
import MealPlanCard from './mealPlanCard/mealPlanCard';

export default function MealPlansPage() {
  const mealPlans = [
    {
      id: '1',
      title: 'Bulking plan',
      description: 'High calories meals that hit daily protein intake',
      imageUrl: '/meals/sweet_sour_tofu.jpg',
      plan: {
        recipes: 1,
        meals: 5,
        snacks: 3
      }
    },
    {
      id: '2',
      title: 'Cutting meal plan',
      description:
        'Healthy meals for a daily calorie deficit while still hitting the protein intake',
      imageUrl: '/meals/honey_garlic_chicken.jpg',
      plan: {
        recipes: 1,
        meals: 5,
        snacks: 3
      }
    },
    {
      id: '3',
      title: "Kids' meal plan",
      description: 'Meal preparation for the kids',
      imageUrl: '/meals/french_toast.jpg',
      plan: {
        recipes: 1,
        meals: 5,
        snacks: 3
      }
    }
  ];

  const getMealPlans = () => {
    return mealPlans;
  };

  const filteredMeals = getMealPlans();

  return (
    <div className="flex flex-col flex-1 px-8 justify-center gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-bold">Setup your meal plans</h1>
        <Link
          href="/dashboard/meal-plans/create"
          className="flex gap-2 bg-secondary w-fit px-4 py-2 rounded-2xl"
        >
          <PlusIcon className="w-6 h-6" />
          Create Meal Plan
        </Link>
      </div>
      <div>
        {filteredMeals.map((meal) => (
          <MealPlanCard
            key={meal.id}
            id={meal.id}
            title={meal.title}
            description={meal.description}
            imageUrl={meal.imageUrl}
            plan={meal.plan}
          />
        ))}
      </div>
    </div>
  );
}
