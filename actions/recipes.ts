'use server';

import { AxiosError } from 'axios';
import { createApiError } from '@/requests/common';
import { RecipeInformation } from '@/types-old/recipes';

export const getRecipes = async (
  query?: string
): Promise<RecipeInformation[]> => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${query ? `query=${query}&` : ''}number=9&addRecipeNutrition=true&addRecipeInformation=true&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw createApiError(error as AxiosError);
  }
};
