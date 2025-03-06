import React from 'react';

export function DailyProgress() {
  const goals = {
    calories: { current: 1200, target: 2000, unit: 'kcal' },
    protein: { current: 45, target: 80, unit: 'g' },
    carbs: { current: 120, target: 200, unit: 'g' },
    fat: { current: 35, target: 60, unit: 'g' }
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Today&apos;s Progress</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(goals).map(([nutrient, { current, target, unit }]) => (
          <div key={nutrient} className="space-y-2">
            <div className="flex justify-between text-md">
              <span className="capitalize">{nutrient}</span>
              <span className="text-gray-500">
                {current}/{target}
                {unit}
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${Math.min((current / target) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
