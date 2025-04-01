import { format } from 'date-fns';
import { NextMeals } from './nextMeals/nextMeals';
import { WeightChart } from './weightChart/weightChart';
import { DailyProgress } from './dailyProgress/dailyProgress';

export const metadata = {
  title: 'Fitly | Dashboard'
};

export default async function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-min gap-6 bg-background min-h-screen px-2 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="col-span-full flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">
          Welcome back, {/* Add user name */}
        </h1>
        <p className="text-md text-gray-500">
          {format(new Date(), 'EEEE, MMMM d')}
        </p>
      </div>
      <DailyProgress />
      <NextMeals />
      <WeightChart />
    </div>
  );
}
