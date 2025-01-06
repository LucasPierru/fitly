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
    <div className="space-y-4">
      {timeSlots.map((slot, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium">{slot.name}</p>
              <p className="text-md text-gray-500">{slot.time}</p>
            </div>
            <button
              type="button"
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
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
