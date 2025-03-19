'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';
import { createMealSchema } from '@/lib/validation/meal';
import { IMeal } from '@/types';

export const createMeal = async (
  context: z.infer<typeof createMealSchema>
): Promise<{
  meal: IMeal | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const newMeal = createMealSchema.parse(context);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal/create`,
      {
        method: 'POST',
        body: JSON.stringify(newMeal),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token.value}`
        },
        credentials: 'include'
      }
    );
    const data = await response.json();
    const { meal, error } = data;
    if (error) throw error;
    return { meal, error };
  } catch (error) {
    return { meal: null, error };
  }
};

export const getMeals = async (query: {
  query?: string;
  protein?: string;
  carbs?: string;
  own?: string;
}): Promise<{
  meals: (IMeal & { isOwner: boolean })[] | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal/all?${new URLSearchParams(
        query
      )} `,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token.value}`
        },
        credentials: 'include'
      }
    );
    const data = await response.json();
    const { meals, error } = data;
    if (error) throw error;
    return { meals, error };
  } catch (error) {
    return { meals: null, error };
  }
};
