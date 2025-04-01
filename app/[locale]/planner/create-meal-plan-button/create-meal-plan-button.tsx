'use client';

import { PlusIcon } from 'lucide-react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { saveMealPlan } from '@/requests/meal-plan';
import { useRouter } from '@/i18n/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { IMealPlan } from '@/types';

const CreateMealButton = ({ meals }: { meals: IMealPlan['meals'] }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const schema = z.object({
    name: z.string().nonempty({ message: 'Name is required' }),
    description: z.string().nonempty({ message: 'Description is required' })
  });

  type Inputs = z.infer<typeof schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newPlan = {
      ...data,
      meals
    };
    const { savedMealPlan } = await saveMealPlan(newPlan);
    if (savedMealPlan) {
      reset();
      router.refresh();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          <PlusIcon className="h-6 w-6 text-white" /> Save Meal Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save current meal plan</DialogTitle>
          <DialogDescription>
            Give a name and a descritption to this meal plan and save it to your
            account
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">Name</FormLabel>
                  <FormControl>
                    <Input id="name" type="text" {...field} className="mb-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      {...field}
                      className="mb-2 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-2">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMealButton;
