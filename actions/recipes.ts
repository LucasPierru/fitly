'use server';

import { FoodInformation } from '@/types/foods';
import { RecipeSummary, RecipeInformation } from '@/types/recipes';
import { capitalizeWord, getMealTypeList } from '@/utils/utils';
import { createRecipeWithTransaction } from './ingredients';
import { createClient } from '@/utils/supabase/server';

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
    const data:RecipeInformation = await res.json();

    const mealData = await getMealFromRecipes(Number(id));

    if(mealData && mealData.id) {
      const { 
        id: recipeId,
        title, 
        image, 
        servings, 
        readyInMinutes,
        vegetarian,
        vegan,
        glutenFree,
        dairyFree, 
        extendedIngredients,
        analyzedInstructions,
        dishTypes
      } = data;
  
      const steps = analyzedInstructions.flatMap(instruction => instruction.steps);
  
      const instructions = steps.map(instruction => ({
        content: instruction.step
      }));
  
      const formattedIngredients = extendedIngredients.map(ingredient=> ({
        ingredient: {
          id: ingredient.id,
          name: capitalizeWord(ingredient.name),
          possibleUnits: []
        },
        quantity: ingredient.measures.metric.amount,
        unit: ingredient.measures.metric.unitShort,
      }))

      const mealTypes = getMealTypeList();

      const filteredTypes = mealTypes.filter(value => dishTypes.includes(value));
  
      const recipe = {
        title,
        description: title,
        picture: image,
        ingredients: formattedIngredients,
        mealTime: '',
        vegetarian,
        vegan,
        glutenFree,
        dairyFree,
        servings,
        preparationTime: readyInMinutes,
        instructions,
        recipeId,
        mealTypes: filteredTypes
      }
      await createRecipeWithTransaction(recipe);
    }

    return data;
  } catch (error) {
    return null;
  }
};

export const getMealFromRecipes = async(id: number) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('meals').select('id').eq('og_id', id).single();
    if(error) throw error;
    return data;
  } catch(error) {
    return null;
  }
}

