'use client';

import { BarChart, Bar, ResponsiveContainer, XAxis } from 'recharts';

export function WeightChart() {
  const weights = [
    { name: 'Oct 1', weight: 65 },
    { name: 'Oct 2', weight: 70 },
    { name: 'Oct 3', weight: 68 },
    { name: 'Oct 4', weight: 72 },
    { name: 'Oct 5', weight: 71 },
    { name: 'Oct 6', weight: 69 },
    { name: 'Oct 7', weight: 75.5 }
  ];
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
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} data={weights}>
            <XAxis dataKey="name" />
            <Bar
              dataKey="weight"
              fill="#8884d8"
              name="Weight"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
