import React from 'react';

export function WeightChart() {
  // This is a placeholder. In production, use a proper charting library
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-baseline">
        <div>
          <p className="text-2xl font-bold">75.5 kg</p>
          <p className="text-sm text-green-500">-0.5 kg this week</p>
        </div>
        <button
          type="button"
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          Log Weight
        </button>
      </div>
      <div className="h-40 flex items-end justify-between gap-2">
        {[65, 70, 68, 72, 71, 69, 75.5].map((weight, i) => (
          <div
            key={i}
            className="w-full bg-indigo-100 rounded-t"
            style={{ height: `${(weight / 100) * 100}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
    </div>
  );
}
