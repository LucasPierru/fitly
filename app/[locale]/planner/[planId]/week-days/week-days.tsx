import { Link } from '@/i18n/navigation';

export default function WeekDays({
  selectedDay,
  planId
}: {
  selectedDay: string;
  planId: string;
}) {
  const days = [
    { label: 'Monday', value: 'monday' },
    { label: 'Tuesday', value: 'tuesday' },
    { label: 'Wednesday', value: 'wednesday' },
    { label: 'Thursday', value: 'thursday' },
    { label: 'Friday', value: 'friday' },
    { label: 'Saturday', value: 'saturday' },
    { label: 'Sunday', value: 'sunday' }
  ];

  const selectedIndex = days.findIndex((day) => day.value === selectedDay);

  // Center the selected day in the middle of the week
  const extendedDays = [...days, ...days, ...days];
  const startIndex = selectedIndex + days.length - 3;
  const visibleDays = extendedDays.slice(startIndex, startIndex + 7);

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-4">
      {visibleDays.map((day, index) => {
        return (
          <Link
            key={day.value}
            href={{
              pathname: `/planner/${planId}`,
              query: { day: day.value }
            }}
            className={`p-1 sm:p-4 border-2 rounded-lg bg-card text-center ${
              day.value === selectedDay
                ? 'border-primary text-card-foreground hover:bg-muted'
                : 'border-border hover:bg-muted hover:border-muted'
            } ${index === 1 || index === 5 ? 'hidden md:block' : ''} ${index === 6 || index === 0 ? 'hidden xl:block' : ''}`}
          >
            <p className="text-lg md:text-lg xl:text-xl font-medium sm:mt-1 truncate">
              {day.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
