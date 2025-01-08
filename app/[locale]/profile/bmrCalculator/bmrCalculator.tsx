import React from 'react';
import { calculateBMR } from '@/utils/utils';

export function BMRCalculator() {
  const result = calculateBMR({
    weight: 75,
    height: 175,
    age: 30,
    gender: 'male',
    activityLevel: 'moderate'
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">BMR & Calorie Goals</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Base BMR</p>
          <p className="text-2xl font-bold text-indigo-600">{result.bmr}</p>
          <p className="text-xs text-gray-500">calories/day</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Daily Expenditure</p>
          <p className="text-2xl font-bold text-indigo-600">{result.tdee}</p>
          <p className="text-xs text-gray-500">calories/day</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <div>
            <p className="font-medium text-green-700">Weight Loss</p>
            <p className="text-sm text-green-600">-0.5 kg/week</p>
          </div>
          <p className="text-xl font-bold text-green-700">
            {result.weightLoss} cal
          </p>
        </div>

        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <div>
            <p className="font-medium text-blue-700">Maintenance</p>
            <p className="text-sm text-blue-600">Keep current weight</p>
          </div>
          <p className="text-xl font-bold text-blue-700">
            {result.maintenance} cal
          </p>
        </div>

        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
          <div>
            <p className="font-medium text-purple-700">Weight Gain</p>
            <p className="text-sm text-purple-600">+0.5 kg/week</p>
          </div>
          <p className="text-xl font-bold text-purple-700">
            {result.weightGain} cal
          </p>
        </div>
      </div>
    </div>
  );
}
