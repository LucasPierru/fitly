import React from 'react';
import { Check } from 'lucide-react';

export function NextMeals() {
  const meals = [
    {
      id: 1,
      name: 'Breakfast',
      time: '08:00',
      calories: 450,
      consumed: true
    },
    {
      id: 2,
      name: 'Lunch',
      time: '13:00',
      calories: 650,
      consumed: false
    },
    {
      id: 3,
      name: 'Dinner',
      time: '19:00',
      calories: 550,
      consumed: false
    }
  ];

  return (
    <div className="space-y-4">
      {meals.map((meal) => (
        <div
          key={meal.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${
                  meal.consumed
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 hover:border-green-500'
                }`}
            >
              {meal.consumed && <Check className="w-4 h-4 text-white" />}
            </button>
            <div>
              <h3 className="font-medium">{meal.name}</h3>
              <p className="text-md text-gray-500">
                {meal.time} • {meal.calories} kcal
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
