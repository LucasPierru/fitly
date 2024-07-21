'use server';

import { FoodInformation, FoodInformationDetails } from '@/types/foods';
import { createClient } from '@/utils/supabase/server';

const BASE_URL = 'https://api.spoonacular.com';

export const getIngredientInformation = async (
  id: number,
  amount: number,
  unit: string
): Promise<FoodInformationDetails | null> => {
  try {
    const res = await fetch(
      `${BASE_URL}/food/ingredients/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&amount=${amount}&unit=${unit}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const createRecipe = async ({
  title,
  description,
  ingredients
}: {
  title: string;
  description: string;
  ingredients: {
    ingredient: Pick<FoodInformation, 'name' | 'id' | 'possibleUnits'>;
    quantity: number;
    unit: string;
  }[];
}) => {
  try {
    const supabase = createClient();
    const ingredientsData = await Promise.all(
      ingredients.map(async (ingredient) => {
        const ingredientInformation = await getIngredientInformation(
          ingredient.ingredient.id,
          ingredient.quantity,
          ingredient.unit
        );
        return ingredientInformation;
      })
    );

    console.log(ingredientsData);

    return;
    /* const { data, error } = await supabase.from('ingredients').upsert();
    if (error) throw error;
    return data; */
  } catch (error) {
    return null;
  }
};
