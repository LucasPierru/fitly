import { searchRecipes } from '@/actions/food';
import RecipeCard from './recipeCard/recipeCard';

export default async function RecipesPage({
  params
}: {
  params: { query: string };
}) {
  const { query } = params;
  const recipes = await searchRecipes(query || '');

  return (
    <div className="flex-1 flex flex-col max-w-screen-xl w-full px-8 justify-center gap-2 py-8">
      <h1 className="text-3xl text-bold">Recipes</h1>
      <div className="grid grid-cols-5 gap-6">
        {recipes?.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </div>
  );
}
