import { format } from 'date-fns';
import { Scale, Utensils } from 'lucide-react';
import { NextMeals } from './nextMeals/nextMeals';
import { WeightChart } from './weightChart/weightChart';
import Card from '@/components/cards/card';
import { DailyProgress } from './dailyProgress/dailyProgress';

export const metadata = {
  title: 'Fitly | Dashboard'
};

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="col-span-full flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">
          Welcome back, {/* Add user name */}
        </h1>
        <p className="text-md text-gray-500">
          {format(new Date(), 'EEEE, MMMM d')}
        </p>
      </div>
      <Card className="col-span-full">
        <DailyProgress />
      </Card>
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Utensils className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold">Next Meals</h2>
        </div>
        <NextMeals />
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Scale className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold">Weight Progress</h2>
        </div>
        <WeightChart />
      </Card>
    </div>
  );
}
