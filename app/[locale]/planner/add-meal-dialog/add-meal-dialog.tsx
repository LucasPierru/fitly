'use client';

import { Plus } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

const AddMealDialog = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-primary !mt-0 hover:text-primary hover:bg-muted rounded-full"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl" aria-describedby="meals dialog">
        <DialogHeader>
          <DialogTitle>Add meals to your meal plan</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMealDialog;
