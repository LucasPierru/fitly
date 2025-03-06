import MealCard from './mealCard/mealCard';
import { getRecipes } from '@/actions/recipes';
import { getIngredientsListString, getSelectNutrients } from '@/utils/utils';
import SearchInput from '@/components/inputs/searchInput/searchInput';
import CreateMealForm from './createMealForm/createMealForm';

export default async function MealsPage({
  searchParams
}: {
  searchParams: { query: string };
}) {
  const { query } = searchParams;

  const recipes = await getRecipes(query);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-screen px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 bg-background">
      <div className="col-span-full flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">My Meals</h1>
        <CreateMealForm />
      </div>
      <SearchInput
        className="col-span-full shadow-sm"
        placeholder="E.g. Butter Chicken"
      />
      {/* <MealFilters /> */}
      {recipes.map((recipe) => {
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
      })}
    </div>
  );
}
