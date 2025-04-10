import dayjs from 'dayjs';
import DayMeals from './dayMeals/dayMeals';
import WeekDays from './week-days/week-days';
import { getSavedMealPlanMetadata } from '@/requests/meal-plan';
import PlanMetadata from './plan-metadata/plan-metadata';
import { Day } from '@/types';

export default async function PlanPage({
  params,
  searchParams
}: {
  params: { planId: string };
  searchParams: { day: Day };
}) {
  const { planId } = params;
  const { day } = searchParams;

  const today = dayjs().format('dddd').toLowerCase();
  const { savedMealPlan } = await getSavedMealPlanMetadata(planId);

  console.log('savedMealPlan', savedMealPlan);

  return (
    <div className="space-y-6 px-4 sm:px-6 min-h-screen lg:px-8 py-4 sm:py-6 lg:py-8 bg-background">
      <div className="flex items-center flex-col sm:flex-row justify-between">
        <h1 className="text-xl font-bold text-foreground">Meal Planner</h1>
        <PlanMetadata
          name={savedMealPlan?.name!}
          description={savedMealPlan?.description!}
        />
      </div>
      <WeekDays
        selectedDay={day || today}
        planId={planId}
        mealPlan={savedMealPlan!}
      />
      <DayMeals planId={planId} day={day || today} />
    </div>
  );
}
