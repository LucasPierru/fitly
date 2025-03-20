import WeeklyCalendar from './weeklyCalendar/weeklyCalendar';
import DayMeals from './dayMeals/dayMeals';
import WeekSwitch from './weekSwitch/weekSwitch';
import { getStartOfWeek } from '@/utils/utils';

export default function PlannerPage({
  searchParams
}: {
  searchParams: { start: string };
}) {
  const { start } = searchParams;

  const startDate = start
    ? getStartOfWeek(new Date(start))
    : getStartOfWeek(new Date());

  return (
    <div className="space-y-6 px-4 sm:px-6 min-h-screen lg:px-8 py-4 sm:py-6 lg:py-8 bg-background">
      <div className="flex items-center flex-col sm:flex-row justify-between">
        <h1 className="text-xl font-bold text-foreground">Meal Planner</h1>
        <WeekSwitch startDate={startDate} />
      </div>
      <WeeklyCalendar
        startDate={startDate}
        selectedDate={start ? new Date(start) : new Date()}
      />
      <DayMeals />
    </div>
  );
}
