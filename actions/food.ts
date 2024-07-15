'use server';

/* import { headers } from 'next/headers';
import { redirect } from 'next/navigation'; */
import { FoodInformation } from '@/types/foods';

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
