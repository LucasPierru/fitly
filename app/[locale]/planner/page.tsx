import { WeeklyCalendar } from './weeklyCalendar/weeklyCalendar';
import { DayMeals } from './dayMeals/dayMeals';
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
