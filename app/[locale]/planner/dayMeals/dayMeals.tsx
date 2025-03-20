import { Types } from 'mongoose';
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
import { IMealPlan } from '@/types';
import { updateMealPlan } from '@/requests/meal-plan';

export default async function DayMeals({
  planId,
  day,
  mealPlanMeals
}: {
  planId: string;
  day: string;
  mealPlanMeals: IMealPlan['meals'];
}) {
  const timeSlots = [
    { time: '08:00', name: 'Breakfast', value: 'breakfast' },
    { time: '11:00', name: 'Snack', value: 'snack' },
    { time: '13:00', name: 'Lunch', value: 'lunch' },
    { time: '16:00', name: 'Snack', value: 'snack' },
    { time: '19:00', name: 'Dinner', value: 'dinner' }
  ];

  const { meals } = await getMeals({});

  const addMealAction = async (mealId: Types.ObjectId, time: string) => {
    const newMeals = [...mealPlanMeals];
    newMeals.push({
      meal: mealId,
      dishType: time,
      day
    });
    const { mealPlan } = await updateMealPlan({ _id: planId, meals: newMeals });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
                    id={meal._id.toString()}
                    title={meal.title}
                    description={meal.description}
                    image={meal.image}
                    readyInMinutes={
                      meal.cookingMinutes + meal.preparationMinutes
                    }
                    macros={meal.nutrition}
                    isOwner={meal.isOwner}
                    addMealAction={() => addMealAction(meal._id, slot.value)}
                  />
                ))}
            </AddMeal>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground p-4 border-2 border-dashed border-border rounded-lg text-center">
              Add a meal for {slot.name.toLowerCase()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
