'use client';

import { Scale } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Scale className="h-5 w-5 text-primary" />
          Weight Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-baseline">
          <div>
            <p className="text-2xl font-bold">75.5 kg</p>
            <p className="text-sm text-green-500">-0.5 kg this week</p>
          </div>
          <button
            type="button"
            className="text-sm text-primary hover:text-primary"
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
                fill="#22C55E"
                name="Weight"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
