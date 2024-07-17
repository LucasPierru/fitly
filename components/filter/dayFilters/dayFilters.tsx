'use client';

import { Link, usePathname, AppPathname } from '@/navigation';

type DayFiltersProps = {
  id: string;
  currentDay: string;
};

const DayFilters = ({ id, currentDay }: DayFiltersProps) => {
  const days = [
    {
      shortName: 'Mon',
      longName: 'Monday',
      query: 'monday'
    },
    {
      shortName: 'Tue',
      longName: 'Tuesday',
      query: 'tuesday'
    },
    {
      shortName: 'Wed',
      longName: 'Wednesday',
      query: 'wednesday'
    },
    {
      shortName: 'Thu',
      longName: 'Thursday',
      query: 'thursday'
    },
    {
      shortName: 'Fri',
      longName: 'Friday',
      query: 'friday'
    },
    {
      shortName: 'Sat',
      longName: 'Saturday',
      query: 'saturday'
    },
    {
      shortName: 'Sun',
      longName: 'Sunday',
      query: 'sunday'
    }
  ];

  const pathname = usePathname();

  return (
    <div className="flex gap-4 px-4 border-b-2 border-b-secondary">
      {days.map((day) => {
        return (
          <Link
            key={day.query}
            href={
              { pathname, params: { id }, query: { day: day.query } } as {
                pathname: AppPathname;
                params: { id: string };
                query: { day: string };
              }
            }
            className={`border-b-4 ${
              currentDay === day.query
                ? `border-b-primary`
                : `border-b-background text-secondary`
            } py-4 px-1`}
          >
            {day.longName}
          </Link>
        );
      })}
    </div>
  );
};

export default DayFilters;
