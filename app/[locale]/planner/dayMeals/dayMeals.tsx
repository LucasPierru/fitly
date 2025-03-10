import { Plus } from 'lucide-react';

export function DayMeals() {
  const timeSlots = [
    { time: '08:00', name: 'Breakfast' },
    { time: '11:00', name: 'Snack' },
    { time: '13:00', name: 'Lunch' },
    { time: '16:00', name: 'Snack' },
    { time: '19:00', name: 'Dinner' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {timeSlots.map((slot) => (
        <div
          key={slot.time}
          className="bg-background-secondary rounded-lg shadow-sm p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium">{slot.name}</p>
              <p className="text-md text-gray-500">{slot.time}</p>
            </div>
            <button
              type="button"
              className="p-2 text-primary hover:bg-muted rounded-full"
            >
              <Plus className="h-5 w-5" />{' '}
            </button>
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
            <p className="text-gray-500">
              Add a meal for {slot.name.toLowerCase()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
