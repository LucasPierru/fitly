'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { User } from '@/types-old/users';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { updateProfile } from '@/requests/profile';
import { updateUserSchema } from '@/lib/validation/user';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function UserSettings({ profile }: { profile: User }) {
  const t = useTranslations('Common');
  const router = useRouter();
  const schema = updateUserSchema(t);

  type Inputs = z.infer<typeof schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: profile
  });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await updateProfile(data);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold mb-4">
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => {
                  return (
                    <FormItem className="gap-2">
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input id="height" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => {
                  return (
                    <FormItem className="gap-2">
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input id="weight" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => {
                return (
                  <FormItem className="gap-2">
                    <FormLabel>Birthday</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              dayjs(field.value).format('MMMM D, YYYY')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => {
                return (
                  <FormItem className="gap-2">
                    <FormLabel>Sex</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your sex" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="howActive"
              render={({ field }) => {
                return (
                  <FormItem className="gap-2">
                    <FormLabel>Activity Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary</SelectItem>
                        <SelectItem value="light">Light Exercise</SelectItem>
                        <SelectItem value="moderate">
                          Moderate Exercise
                        </SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="very_active">Very Active</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="w-full">
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
