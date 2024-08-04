import { PlusIcon } from '@heroicons/react/24/outline';
import { Link } from '@/navigation';
import MealPlanCard from './mealPlanCard/mealPlanCard';
import { getMealPlansDetails } from '@/actions/mealPlans';

export default async function MealPlansPage() {
  const { data } = await getMealPlansDetails();

  const mealPlanMeals = data?.map((mealPlan) => {
    const meals = mealPlan.meal_plan_meals?.flatMap(
      (mealPlanMeal) => mealPlanMeal.meals
    );
    return {
      recipes: meals?.reduce((acc, meal) => (acc + meal.og_id ? 1 : 0), 0),
      meals: mealPlan.meal_plan_meals?.reduce(
        (acc, mealPlanMeal) => acc + (mealPlanMeal.time !== 'snack' ? 1 : 0),
        0
      ),
      snacks: mealPlan.meal_plan_meals?.reduce(
        (acc, mealPlanMeal) => acc + (mealPlanMeal.time === 'snack' ? 1 : 0),
        0
      )
    };
  });

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
        {data?.map((meal, index) => (
          <MealPlanCard
            key={meal.id}
            id={meal.id}
            title={meal.name}
            description={meal.description}
            imageUrl={meal.meal_plan_meals[0].meals.picture}
            plan={mealPlanMeals?.[index]}
          />
        ))}
      </div>
    </div>
  );
}
