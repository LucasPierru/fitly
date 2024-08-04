import { Key } from 'react';
import Image from 'next/image';
import { getRecipe } from '@/actions/recipes';
import Checkbox from '@/components/buttons/checkbox/checkbox';
import DescriptionCard from '@/components/cards/descriptionCard/descriptionCard';
import AddToMealPlanForm from '@/components/forms/addToMealPlanForm/addToMealPlanForm';
import { getMealPlans } from '@/actions/mealPlans';

export default async function RecipePage({
  params
}: {
  params: { id: string };
}) {
  const { id } = params;

  const recipe = await getRecipe(id);
  const { data: mealPlans } = await getMealPlans();

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

  const convertMinutesToHoursAndMinutes = (minutes: number) => {
    return {
      hours: Math.floor(minutes / 60),
      minutes: minutes % 60
    };
  };

  const getHoursAndMinutesString = (mins: number) => {
    const { hours, minutes } = convertMinutesToHoursAndMinutes(mins);

    return `${hours ? `${hours}h ` : ''}${minutes ? `${minutes} mins` : ''}`;
  };

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
            {recipe.analyzedInstructions.map(
              (instruction, instructionIndex) => {
                return (
                  <div
                    key={instructionIndex as Key}
                    className="flex flex-col gap-4"
                  >
                    {instruction.name && <span>{instruction.name}</span>}
                    {instruction.steps.map((step) => {
                      // console.log(step.step.split('.'));
                      return (
                        <div
                          key={`${instructionIndex}-${step.number}` as Key}
                          className="flex gap-4 items-center"
                        >
                          <div className="bg-secondary text-lg py-4 px-6 rounded-box">
                            {step.number}
                          </div>
                          <span>{step.step.replace('.', '. ')}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <DescriptionCard
            title="Preparation time"
            description={getHoursAndMinutesString(recipe.readyInMinutes)}
          />
          <DescriptionCard
            title="Cost per serving"
            description={`${Math.round(recipe.pricePerServing) / 100} $`}
          />
          <DescriptionCard
            title="Servings"
            description={recipe.servings.toString()}
          />
        </div>
        <div>
          <span className="block text-xl font-semibold mb-4">
            Nutrition Facts
          </span>
          <div className="flex flex-col gap-4">
            {recipe.nutrition.nutrients.map((nutrient) => {
              return (
                nutrientsList.includes(nutrient.name) && (
                  <div
                    key={nutrient.name as Key}
                    className="flex justify-between"
                  >
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
        <AddToMealPlanForm mealPlans={mealPlans} recipe={recipe} />
      </div>
    )
  );
}
