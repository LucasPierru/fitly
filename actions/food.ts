'use server';

/* import { headers } from 'next/headers';
import { redirect } from 'next/navigation'; */
import { FoodInformation } from '@/types/foods';
import { RecipeSummary, RecipeInformation } from '@/types/recipes';

const BASE_URL = 'https://api.spoonacular.com';

export const ingredientSearchAutocomplete = async (
  query: string
): Promise<FoodInformation[] | null> => {
  try {
    const res = await fetch(
      `${BASE_URL}/food/ingredients/autocomplete?query=${query}&number=5&metaInformation=true&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );
    return res.json();
  } catch (error) {
    return null;
  }
};

export const searchRecipes = async (
  query: string
): Promise<RecipeSummary[] | null> => {
  try {
    const res = await fetch(
      `${BASE_URL}/recipes/complexSearch?query=${query}&number=10&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );
    const data: { results: RecipeSummary[] } = await res.json();
    return data.results;
  } catch (error) {
    return null;
  }
};

export const getRecipe = async (
  id: string
): Promise<RecipeInformation | null> => {
  try {
    const res = await fetch(
      `${BASE_URL}/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&includeNutrition=true`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
};
