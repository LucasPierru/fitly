import { format, addDays } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

const WeekSwitch = ({ startDate }: { startDate: Date }) => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href={{
          pathname: '/planner',
          query: { start: addDays(startDate, -7).toISOString() }
        }}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronLeft className="h-5 w-5" />{' '}
      </Link>
      <span className="font-medium">
        {format(startDate, 'MMM d')} - {format(addDays(startDate, 6), 'MMM d')}
      </span>
      <Link
        href={{
          pathname: '/planner',
          query: { start: addDays(startDate, 7).toISOString() }
        }}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ChevronRight className="h-5 w-5" />{' '}
      </Link>
    </div>
  );
};

export default WeekSwitch;
