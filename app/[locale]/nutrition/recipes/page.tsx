import { searchRecipes } from '@/actions/recipes';
import RecipeCard from './recipeCard/recipeCard';
import SearchInput from '@/components/inputs/searchInput/searchInput';

export default async function RecipesPage({
  searchParams
}: {
  searchParams: { query: string };
}) {
  const { query } = searchParams;
  const recipes = await searchRecipes(query || '');

  return (
    <div className="flex-1 flex flex-col max-w-screen-xl w-full px-8 justify-center gap-2 py-8">
      <SearchInput placeholder="Search for recipes" />
      <h1 className="text-3xl text-bold">Recipes</h1>
      <div className="grid grid-cols-5 gap-6">
        {recipes?.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </div>
    </div>
  );
}
