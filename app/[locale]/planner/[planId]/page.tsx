import { Edit2Icon } from 'lucide-react';
import DayMeals from '../dayMeals/dayMeals';
import WeekDays from './week-days/week-days';
import { getMealPlan } from '@/requests/meal-plan';

export default async function PlanPage({
  params,
  searchParams
}: {
  params: { planId: string };
  searchParams: { day: string };
}) {
  const { planId } = params;
  const { day } = searchParams;

  const { mealPlan } = await getMealPlan(planId);

  return (
    <div className="space-y-6 px-4 sm:px-6 min-h-screen lg:px-8 py-4 sm:py-6 lg:py-8 bg-background">
      <div className="flex items-center flex-col sm:flex-row justify-between">
        <h1 className="text-xl font-bold text-foreground">Meal Planner</h1>
        <div className="flex flex-col items-end">
          <span className="flex items-center gap-2">
            <Edit2Icon className="h-4 w-4" />
            {mealPlan?.name}
          </span>
          <span className="flex items-center gap-2">
            <Edit2Icon className="h-4 w-4" />
            {mealPlan?.description}
          </span>
        </div>
      </div>
      <WeekDays selectedDay={day || 'monday'} planId={planId} />
      <DayMeals />
    </div>
  );
}
