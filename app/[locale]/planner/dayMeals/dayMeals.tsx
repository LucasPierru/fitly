import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import AddMeal from './add-meal/add-meal';
import { getMeals } from '@/requests/meal';
import MealCard from '@/components/mealCard/mealCard';
import { IMeal, IMealPlan } from '@/types';
import AddMealButton from '@/components/mealCard/add-meal-button/add-meal-button';

export default async function DayMeals({
  mealPlanMeals
}: {
  mealPlanMeals: IMealPlan['meals'];
}) {
  const timeSlots = [
    { time: '08:00', name: 'Breakfast', value: 'breakfast' },
    { time: '13:00', name: 'Lunch', value: 'lunch' },
    { time: '16:00', name: 'Snack', value: 'snack' },
    { time: '19:00', name: 'Dinner', value: 'dinner' }
  ];

  const { meals } = await getMeals({});

  const filteredMeals = (time: string) => {
    return mealPlanMeals.filter((meal) => meal.dishType === time);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
      {timeSlots.map((slot) => (
        <Card key={slot.time}>
          <CardHeader className="flex-row items-start justify-between mb-2">
            <div>
              <CardTitle className="font-medium">{slot.name}</CardTitle>
              <CardDescription className="text-md">{slot.time}</CardDescription>
            </div>
            <AddMeal>
              {meals &&
                meals.map((meal) => (
                  <MealCard
                    key={meal._id.toString()}
                    id={meal._id}
                    title={meal.title}
                    description={meal.description}
                    image={meal.image}
                    readyInMinutes={
                      meal.cookingMinutes + meal.preparationMinutes
                    }
                    macros={meal.nutrition}
                    isOwner={meal.isOwner}
                  >
                    <AddMealButton mealId={meal._id} time={slot.value} />
                  </MealCard>
                ))}
            </AddMeal>
          </CardHeader>

          <CardContent>
            {filteredMeals(slot.value).length === 0 ? (
              <p className="text-muted-foreground p-4 border-2 border-dashed border-border rounded-lg text-center">
                Add a meal for {slot.name.toLowerCase()}
              </p>
            ) : (
              <div>
                {filteredMeals(slot.value).map((meal) => (
                  <div key={meal._id?.toString()}>
                    {(meal.meal as IMeal)?.title}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
