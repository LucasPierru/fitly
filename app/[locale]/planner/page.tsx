import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import { getMealPlan, getSavedMealPlans } from '@/requests/meal-plan';
import WeeklyCalendar from './weeklyCalendar/weeklyCalendar';
import WeekSwitch from './weekSwitch/weekSwitch';
import { calculateMealPlanMacros, getStartOfWeek } from '@/utils/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import DayMeals from './day-meals/day-meals';
import { Day } from '@/types';
import CreateMealButton from './create-meal-plan-button/create-meal-plan-button';

dayjs().format();

export default async function PlannerPage({
  searchParams
}: {
  searchParams: { start: string };
}) {
  const { start } = searchParams;

  const startDate = start
    ? getStartOfWeek(new Date(start))
    : getStartOfWeek(new Date());

  const { savedMealPlans } = await getSavedMealPlans();
  const { mealPlan } = await getMealPlan(
    dayjs(start).format('dddd').toLowerCase() as Day
  );

  if (!mealPlan) {
    return notFound();
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 min-h-screen lg:px-8 py-4 sm:py-6 lg:py-8 bg-background">
      <div className="flex items-center flex-col sm:flex-row justify-between">
        <h1 className="text-xl font-bold text-foreground">Meal Planner</h1>
        <div className="flex items-center gap-4">
          <CreateMealButton meals={mealPlan.meals} />
          <WeekSwitch startDate={startDate} />
        </div>
      </div>
      <WeeklyCalendar
        startDate={startDate}
        selectedDate={start ? new Date(start) : new Date()}
      />
      <DayMeals mealPlan={mealPlan} />
      <div className="flex">
        {savedMealPlans &&
          savedMealPlans.map((plan) => {
            const macros = calculateMealPlanMacros(plan.meals);

            return (
              <Card key={plan._id.toString()}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex gap-4 justify-between">
                    <div>
                      <span className="text-gray-500">Calories</span>
                      <p className="font-medium">{macros.calories}kcal</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Protein</span>
                      <p className="font-medium">{macros.protein}g</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Carbs</span>
                      <p className="font-medium">{macros.carbs}g</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Fat</span>
                      <p className="font-medium">{macros.fat}g</p>
                    </div>
                  </div>
                  <div className="self-end">
                    Created {dayjs(plan.createdAt).format('MMMM D, YYYY')}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Link
                    href={`/planner/${plan._id}`}
                    className="bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/80 transition-colors"
                  >
                    Go to plan
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
