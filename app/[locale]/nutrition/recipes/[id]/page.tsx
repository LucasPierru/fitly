import { Key } from 'react';
import Image from 'next/image';
import { getRecipe } from '@/actions/food';
import Checkbox from '@/components/buttons/checkbox/checkbox';

export default async function RecipePage({
  params
}: {
  params: { id: string };
}) {
  const { id } = params;

  const recipe = await getRecipe(id);

  // console.log({ recipe });

  return (
    recipe && (
      <div className="flex-1 flex flex-col max-w-screen-xl w-full px-8 justify-center gap-4 py-8">
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
      </div>
    )
  );
}
