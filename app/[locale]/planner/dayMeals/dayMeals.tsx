import { Plus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DayMeals() {
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
        <Card key={slot.time}>
          <CardHeader className="flex-row items-start justify-between mb-2">
            <div>
              <CardTitle className="font-medium">{slot.name}</CardTitle>
              <CardDescription className="text-md">{slot.time}</CardDescription>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-primary !mt-0 hover:text-primary hover:bg-muted rounded-full"
            >
              <Plus className="h-5 w-5" />{' '}
            </Button>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground p-4 border-2 border-dashed border-border rounded-lg text-center">
              Add a meal for {slot.name.toLowerCase()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
