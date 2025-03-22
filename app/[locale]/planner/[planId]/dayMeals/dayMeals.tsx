import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import AddMeal from './add-meal/add-meal';
import { getMeals } from '@/requests/meal';
import MealCard from '../meal-card/meal-card';
import { Day, IMeal } from '@/types';
import MinMealCard from './min-meal-card/min-meal-card';
import { getMealPlan } from '@/requests/meal-plan';

export default async function DayMeals({
  planId,
  day
}: {
  planId: string;
  day: Day;
}) {
  const timeSlots = [
    { time: '08:00', name: 'Breakfast', value: 'breakfast' },
    { time: '13:00', name: 'Lunch', value: 'lunch' },
    { time: '16:00', name: 'Snack', value: 'snack' },
    { time: '19:00', name: 'Dinner', value: 'dinner' }
  ];

  const { meals } = await getMeals({});
  const { mealPlan } = await getMealPlan(planId, day);

  const filteredMeals = (time: string) => {
    return mealPlan && mealPlan.meals.filter((meal) => meal.dishType === time);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
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
                    meal={meal}
                    time={slot.value}
                  />
                ))}
            </AddMeal>
          </CardHeader>
          <CardContent>
            {filteredMeals(slot.value)?.length === 0 ? (
              <p className="text-muted-foreground p-4 border-2 border-dashed border-border rounded-lg text-center">
                Add a meal for {slot.name.toLowerCase()}
              </p>
            ) : (
              <div className="flex flex-col gap-6">
                {filteredMeals(slot.value)?.map((meal) => (
                  <MinMealCard
                    key={meal._id?.toString()}
                    meal={meal.meal as IMeal}
                    mealPlanMealId={meal._id}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
