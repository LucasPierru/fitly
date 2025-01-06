import { addDays, format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WeeklyCalendar } from './weeklyCalendar/weeklyCalendar';
import { DayMeals } from './dayMeals/dayMeals';

export default function PlannerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Meal Planner</h1>
        <div className="flex items-center gap-4">
          <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="h-5 w-5" />{' '}
          </button>
          <span className="font-medium">
            {format(new Date(), 'MMMM d')} -{' '}
            {format(addDays(new Date(), 6), 'MMMM d')}
          </span>
          <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="h-5 w-5" />{' '}
          </button>
        </div>
      </div>

      <WeeklyCalendar />
      <DayMeals />
    </div>
  );
}
