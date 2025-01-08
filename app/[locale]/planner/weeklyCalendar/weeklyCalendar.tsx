import { format, addDays } from 'date-fns';
import { Link } from '@/navigation';

export function WeeklyCalendar({
  startDate,
  selectedDate
}: {
  startDate: Date;
  selectedDate: Date;
}) {
  return (
    <div className="grid grid-cols-7 gap-2 sm:gap-4">
      {Array.from({ length: 7 }).map((_, i) => {
        const date = addDays(startDate, i);
        const isToday = date.getUTCDate() === selectedDate.getUTCDate();

        return (
          <Link
            key={date.toDateString()}
            href={{
              pathname: '/planner',
              query: { start: date.toISOString() }
            }}
            className={`p-1 sm:p-4 rounded-lg text-center ${
              isToday
                ? 'bg-primary text-white'
                : 'bg-background-secondary hover:bg-background'
            }`}
          >
            <p className="text-sm sm:text-md font-medium">
              {format(date, 'EEE')}
            </p>
            <p className="text-lg sm:text-2xl font-bold sm:mt-1">
              {format(date, 'd')}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
