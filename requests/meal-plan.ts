'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import {
  createMealPlanSchema,
  updateMealPlanSchema
} from '@/lib/validation/meal-plan';
import { IMealPlan, Day } from '@/types';

export const createMealPlan = async (
  context: z.infer<typeof createMealPlanSchema>
): Promise<{
  mealPlan: IMealPlan | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const newMealPlan = createMealPlanSchema.parse(context);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/create`,
      {
        method: 'POST',
        body: JSON.stringify(newMealPlan),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token.value}`
        },
        credentials: 'include'
      }
    );
    const data = await response.json();
    const { mealPlan, error } = data;
    if (error) throw error;
    return { mealPlan, error };
  } catch (error) {
    return { mealPlan: null, error };
  }
};

export const updateMealPlan = async (
  context: z.infer<typeof updateMealPlanSchema>
): Promise<{
  mealPlan: IMealPlan | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const newMealPlan = updateMealPlanSchema.parse(context);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/create`,
      {
        method: 'POST',
        body: JSON.stringify(newMealPlan),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token.value}`
        },
        credentials: 'include'
      }
    );
    const data = await response.json();
    const { mealPlan, error } = data;
    if (error) throw error;
    return { mealPlan, error };
  } catch (error) {
    return { mealPlan: null, error };
  }
};

export const addMealToMealPlan = async (
  context: z.infer<typeof updateMealPlanSchema>
): Promise<{
  mealPlan: IMealPlan | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const newMealPlan = updateMealPlanSchema.parse(context);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/add-meal`,
      {
        method: 'POST',
        body: JSON.stringify(newMealPlan),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token.value}`
        },
        credentials: 'include'
      }
    );
    const data = await response.json();
    const { mealPlan, error } = data;
    if (error) throw error;
    return { mealPlan, error };
  } catch (error) {
    return { mealPlan: null, error };
  }
};

export const removeMealFromMealPlan = async (meal: {
  mealPlanId: string;
  mealPlanMealId: string;
}): Promise<{
  mealPlan: IMealPlan | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/remove-meal`,
      {
        method: 'POST',
        body: JSON.stringify(meal),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token.value}`
        },
        credentials: 'include'
      }
    );
    const data = await response.json();
    const { mealPlan, error } = data;
    if (error) throw error;
    return { mealPlan, error };
  } catch (error) {
    return { mealPlan: null, error };
  }
};

export const getMealPlan = async (
  id: string,
  day: Day
): Promise<{
  mealPlan: IMealPlan | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/details/${id}?day=${day}`,
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
    const { mealPlan, error } = data;
    if (error) throw error;
    return { mealPlan, error };
  } catch (error) {
    return { mealPlan: null, error };
  }
};

export const getMealPlans = async (): Promise<{
  mealPlans: IMealPlan[] | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/all`,
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
    const { mealPlans, error } = data;
    if (error) throw error;
    return { mealPlans, error };
  } catch (error) {
    return { mealPlans: null, error };
  }
};
