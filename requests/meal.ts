'use server';

import { cookies } from 'next/headers';
import { CreateMeal } from '@/types/meal';

export const createMeal = async (newMeal: CreateMeal) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
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
