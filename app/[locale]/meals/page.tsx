import MealCard from './mealCard/mealCard';
import { getRecipes } from '@/actions/recipes';
import SearchInput from '@/components/inputs/searchInput/searchInput';
import CreateMealForm from './createMealForm/createMealForm';
import { getMeals } from '@/requests/meal';
import { Link } from '@/i18n/navigation';

export default async function MealsPage({
  searchParams
}: {
  searchParams: { query: string; own: string; protein: string };
}) {
  const { query, own, protein } = searchParams;

  const recipes = await getRecipes(query);
  const { meals } = await getMeals();

  console.log({ meals });

  return (
    <div className="flex flex-col gap-6 min-h-screen px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 auto-rows-min">
      <div className="col-span-full flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">My Meals</h1>
        <CreateMealForm />
      </div>
      <SearchInput
        className="col-span-full"
        placeholder="E.g. Butter Chicken"
      />
      <div className="flex gap-4">
        <Link
          href={{ pathname: 'meals', query: { own: true } }}
          className={`${own ? 'bg-primary text-white' : 'bg-background text-primary'} border border-primary py-2 px-3 rounded-md`}
        >
          My meals
        </Link>
        <Link
          href={{ pathname: 'meals', query: { protein: true } }}
          className={`${protein ? 'bg-primary text-white' : 'bg-background text-primary'} border border-primary py-2 px-3 rounded-md`}
        >
          High protein
        </Link>
        <Link
          href={{ pathname: 'meals', query: { carbs: true } }}
          className={`${protein ? 'bg-primary text-white' : 'bg-background text-primary'} border border-primary py-2 px-3 rounded-md`}
        >
          High carbs
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {meals &&
          meals.map((meal) => {
            return (
              <MealCard
                key={meal._id}
                id={meal._id}
                title={meal.title}
                description={meal.description}
                image={meal.image}
                readyInMinutes={meal.cookingMinutes + meal.preparationMinutes}
                macros={meal.nutrition}
                isOwner={meal.isOwner}
              />
            );
          })}
      </div>
      {/* {recipes.map((recipe) => {
        const macros = getSelectNutrients(recipe);
        const ingredientsString = getIngredientsListString(recipe);

        return (
          <MealCard
            key={recipe.id}
            title={recipe.title}
            ingredientsString={ingredientsString}
            imageUrl={recipe.image}
            readyInMinutes={recipe.readyInMinutes}
            macros={macros}
          />
        );
      })} */}
    </div>
  );
}
