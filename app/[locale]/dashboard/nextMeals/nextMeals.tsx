import React from 'react';
import { Check, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Utensils className="h-5 w-5 text-primary" /> Next Meals
        </CardTitle>
      </CardHeader>
      <CardContent>
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="flex items-center justify-between p-3 bg-card rounded-lg"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${
                  meal.consumed
                    ? 'bg-success border-success'
                    : 'border-border hover:border-success'
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
      </CardContent>
    </Card>
  );
}
