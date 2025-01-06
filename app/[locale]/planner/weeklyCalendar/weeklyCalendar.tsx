import { format, addDays } from 'date-fns';

export function WeeklyCalendar() {
  const today = new Date();

  return (
    <div className="grid grid-cols-7 gap-4">
      {Array.from({ length: 7 }).map((_, i) => {
        const date = addDays(today, i);
        const isToday = i === 0;

        return (
          <button
            key={i}
            type="button"
            className={`p-4 rounded-lg text-center ${
              isToday ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <p className="text-md font-medium">{format(date, 'EEE')}</p>
            <p className="text-2xl font-bold mt-1">{format(date, 'd')}</p>
          </button>
        );
      })}
    </div>
  );
}
