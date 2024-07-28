'use server';

import { Database } from '@/types/supabase';
import { FoodInformation, FoodInformationDetails } from '@/types/foods';
import { createClient } from '@/utils/supabase/server';
import { capitalizeWord, checkExternalUrl, getMacrosList } from '@/utils/utils';
import { DishTypes } from '@/types/recipes';

const BASE_URL = 'https://api.spoonacular.com';

type Ingredient = {ingredient: Database['public']['Tables']['ingredients']['Row']; possible_units: string[]; categories: string[];}

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

export const createRecipeWithTransaction = async({
  title,
  description,
  picture,
  ingredients,
  mealTypes,
  vegetarian,
  vegan,
  glutenFree,
  dairyFree,
  servings,
  preparationTime,
  instructions,
  recipeId
}: {
  title: string;
  description: string;
  picture: string;
  ingredients: {
    ingredient: Pick<FoodInformation, 'name' | 'id' | 'possibleUnits'>;
    quantity: number;
    unit: string;
  }[];
  mealTypes: DishTypes[]
  vegetarian: boolean;
  vegan: boolean;
  glutenFree:boolean;
  dairyFree: boolean;
  servings: number;
  preparationTime: number;
  instructions?: { content: string }[];
  recipeId?: number;
}) => {
  try {
    const supabase = createClient();
    const macrosList = getMacrosList();
    const userId  = (await supabase.auth.getUser()).data.user?.id
    const ingredientsData = await Promise.all(
      ingredients.map(async (ingredient) => {
        const ingredientInformation = await getIngredientInformation(
          ingredient.ingredient.id,
          100,
          'g'
        );
        const nutrients: Ingredient['ingredient'] = ingredientInformation?.nutrition.nutrients.reduce(
          (acc: Ingredient['ingredient'], nutrient) => {
            if (macrosList.includes(nutrient.name)) {
              return {
                ...acc,
                [`${nutrient.name.toLowerCase().replace(' ', '_')}_${nutrient.unit}`]:
                  nutrient.amount
              };
            }
            return acc;
          },
          {} as Ingredient['ingredient']
        ) as Ingredient['ingredient'];
        return {
          ...nutrients,
          name: capitalizeWord(ingredientInformation?.originalName as string),
          price: ingredientInformation?.estimatedCost.value as number,
          og_id: ingredientInformation?.id as number,
          possible_units: ingredientInformation?.possibleUnits,
          categories: ingredientInformation?.categoryPath,
          quantity: ingredient.quantity,
          unit: ingredient.unit
        };
      })
    );

    const costPerServing = ingredientsData.reduce((acc, currentValue) => {
      return acc + currentValue.price
    }, 0) / servings;

    const meal = {
      name: title,
      description,
      picture,
      preparation_time: preparationTime,
      servings,
      cost_per_serving: costPerServing,
      vegetarian,
      vegan,
      gluten_free: glutenFree,
      dairy_free: dairyFree,
      instructions: instructions?.map((ins, index) => ({
        instruction: ins.content,
        step: index+1
      })),
      author_id: userId,
      meal_types: mealTypes.map(type => ({content: type})),
      og_id: recipeId,
    }

    const { data, error } = await supabase
    .rpc('insert_meal', {
      meal_data: meal,
      ingredients_data: ingredientsData,
    })
    if (error) throw error;
    return data;
  } catch(error) {
    return null
  }
}

export const getMeals = async(mealType?: string) => {
  type Meal = {
    id: string; 
    name: string; 
    description: string; 
    picture: string; 
    meal_foods: {
      ingredients: {
        id: string; 
        name: string;
      }
    }[],
    meal_types: {
      id: string
      meal_type: DishTypes
    }[]
  };

  try {
    const supabase = createClient();
    const userId  = (await supabase.auth.getUser()).data.user?.id
    let query = supabase.from('meals').select('id, name, description, picture, meal_foods(ingredients(id, name)), meal_types!inner(id, meal_type)').eq('author_id', userId);
    if(mealType && mealType !== 'all') {
      query = query.eq('meal_types.meal_type', mealType)
    }
    const { data, error } = await query.returns<Meal[]>()
    if(error) throw error;
    const finalData = await Promise.all(data.map(async(meal) => {
      const picture = checkExternalUrl(meal.picture) ? meal.picture : (await selectMealPicture(meal.picture)) as string;
      return {
        
        ...meal,
        picture
      }
    }));
    return finalData;
  } catch(error) {
    return null;
  }
}

export const uploadMealPicture = async(file: File) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.storage.from('meals').upload(file.name, file);
    if(error) throw error;
    return data;
  } catch(error) {
    return null
  }
}

export const selectMealPicture = async(fileName: string) => {
  try {
    const supabase = createClient();
    const {data, error} = await supabase.storage.from('meals').createSignedUrl(fileName, 86400);
    if(error) throw error;
    return data.signedUrl;
  } catch(error) {
    return null
  }
}