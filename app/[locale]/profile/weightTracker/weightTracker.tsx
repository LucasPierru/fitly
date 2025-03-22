'use client';

import { format, subDays } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function WeightTracker() {
  const weightData = Array.from(Array(30).keys())
    .map((_, i) => {
      const weight = Math.random() * (77 - 75) + 75;
      const bodyFat = Math.random() * (20 - 18) + 18;

      return {
        name: format(subDays(new Date(), i), 'MMM d'),
        weight: weight.toFixed(2),
        muscleWeight: (weight * ((100 - bodyFat) / 100)).toFixed(2)
      };
    })
    .reverse();

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Weight History</h2>
        <Button type="button" className="btn text-white">
          Log Weight
        </Button>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={weightData}
            margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              name="Weight"
              dataKey="weight"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              name="Muscle Weight"
              dataKey="muscleWeight"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
