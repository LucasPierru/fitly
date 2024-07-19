import { Key } from 'react';
import Image from 'next/image';
import { getRecipe } from '@/actions/food';
import Checkbox from '@/components/buttons/checkbox/checkbox';
import { Flavonoid } from '@/types/foods';
import { RecipeInformation } from '@/types/recipes';

export default async function RecipePage({
  params
}: {
  params: { id: string };
}) {
  const { id } = params;

  const recipe = await getRecipe(id);

  const nutrientsList = [
    'Calories',
    'Protein',
    'Fat',
    'Saturated Fat',
    'Carbohydrates',
    'Sugar',
    'Fiber',
    'Sodium',
    'Cholesterol'
  ];

  const findMacroAmount = (name: string, nutrients: Flavonoid[]) => {
    const value =
      nutrients.find((nutrient) => nutrient.name === name)?.amount || 0;
    return value;
  };

  /* const getMacros = (currentRecipe: RecipeInformation) => {
    const macros = currentRecipe.nutrition?.ingredients.reduce(
      (acc, ingredient) => {
        return {
          kcal: acc.kcal + findMacroAmount('Calories', ingredient.nutrients),
          protein:
            acc.protein + findMacroAmount('Protein', ingredient.nutrients),
          fat: acc.fat + findMacroAmount('Fat', ingredient.nutrients),
          carbs:
            acc.carbs + findMacroAmount('Carbohydrates', ingredient.nutrients)
        };
      },
      { kcal: 0, protein: 0, fat: 0, carbs: 0 }
    );
    return macros;
  };
 */
  return (
    recipe && (
      <div className="flex-1 flex flex-col max-w-screen-xl w-full px-8 justify-center gap-8 py-8">
        <div className="relative h-96">
          <Image
            src={`https://img.spoonacular.com/recipes/${recipe.id}-636x393.${recipe.imageType}`}
            alt={recipe.title}
            fill
            className="absolute object-cover rounded-box"
          />
          <span className="absolute bottom-0 px-4 py-4 text-white text-xl font-semibold">
            {recipe.title}
          </span>
        </div>
        <div>
          <span className="block text-xl font-semibold mb-4">Ingredients</span>
          <div className="flex flex-col gap-4">
            {recipe.extendedIngredients.map((ingredient) => {
              return (
                <Checkbox key={ingredient.id}>
                  {ingredient.measures.metric.amount}{' '}
                  {ingredient.measures.metric.unitShort}{' '}
                  {ingredient.measures.us.unitShort &&
                    ingredient.measures.us.unitShort !==
                      ingredient.measures.metric.unitShort &&
                    `(${ingredient.measures.us.amount} ${
                      ingredient.measures.us.unitShort
                    })`}{' '}
                  of {ingredient.originalName}
                </Checkbox>
              );
            })}
          </div>
        </div>
        <div>
          <span className="block text-xl font-semibold mb-4">Instructions</span>
          <div className="flex flex-col gap-4">
            {recipe.analyzedInstructions.map((instruction) => {
              return instruction.steps.map((step) => (
                <div key={step.number} className="flex gap-4 items-center">
                  <div className="bg-secondary text-lg py-4 px-6 rounded-box">
                    {step.number}
                  </div>
                  <span>{step.step}</span>
                </div>
              ));
            })}
          </div>
        </div>
        <div>
          <span className="block text-xl font-semibold mb-4">
            Nutrition Facts
          </span>
          <div className="flex flex-col gap-4">
            {recipe.nutrition.nutrients.map((nutrient, index) => {
              return (
                nutrientsList.includes(nutrient.name) && (
                  <div key={index as Key} className="flex justify-between">
                    <span className="text-secondary-content">
                      {nutrient.name}
                    </span>
                    <span>
                      {nutrient.amount} {nutrient.unit}
                    </span>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    )
  );
}
