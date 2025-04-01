'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import {
  createMealPlanSchema,
  updateMealPlanSchema
} from '@/lib/validation/meal-plan';
import { IMealPlan, Day, ISavedMealPlan } from '@/types';

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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/current?day=${day}`,
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

export const getMealPlanMetadata = async (
  id: string
): Promise<{
  mealPlan:
    | (IMealPlan & {
        macros: {
          [x: string]: {
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
          };
        };
      })
    | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/metadata/${id}`,
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/saved/all`,
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

// Saved meal plans

export const saveMealPlan = async (
  context: z.infer<typeof updateMealPlanSchema>
): Promise<{
  savedMealPlan: ISavedMealPlan | null;
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/saved/create`,
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
    const { savedMealPlan, error } = data;
    if (error) throw error;
    return { savedMealPlan, error };
  } catch (error) {
    return { savedMealPlan: null, error };
  }
};

export const addMealToSavedMealPlan = async (
  context: z.infer<typeof updateMealPlanSchema>
): Promise<{
  savedMealPlan: ISavedMealPlan | null;
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/saved/add-meal`,
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
    const { savedMealPlan, error } = data;
    if (error) throw error;
    return { savedMealPlan, error };
  } catch (error) {
    return { savedMealPlan: null, error };
  }
};

export const removeMealFromSavedMealPlan = async (meal: {
  mealPlanId: string;
  mealPlanMealId: string;
}): Promise<{
  savedMealPlan: ISavedMealPlan | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/saved/remove-meal`,
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
    const { savedMealPlan, error } = data;
    if (error) throw error;
    return { savedMealPlan, error };
  } catch (error) {
    return { savedMealPlan: null, error };
  }
};

export const getSavedMealPlan = async (
  planId: string,
  day: Day
): Promise<{
  savedMealPlan:
    | (ISavedMealPlan & {
        macros: {
          [x: string]: {
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
          };
        };
      })
    | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/saved/details/${planId}?day=${day}`,
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
    const { savedMealPlan, error } = data;
    if (error) throw error;
    return { savedMealPlan, error };
  } catch (error) {
    return { savedMealPlan: null, error };
  }
};

export const getSavedMealPlanMetadata = async (
  planId: string
): Promise<{
  savedMealPlan:
    | (ISavedMealPlan & {
        macros: {
          [x: string]: {
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
          };
        };
      })
    | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/saved/metadata/${planId}`,
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
    const { savedMealPlan, error } = data;
    if (error) throw error;
    return { savedMealPlan, error };
  } catch (error) {
    return { savedMealPlan: null, error };
  }
};

export const getSavedMealPlans = async (): Promise<{
  savedMealPlans: ISavedMealPlan[] | null;
  error: unknown;
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/meal-plan/saved/all`,
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
    const { savedMealPlans, error } = data;
    if (error) throw error;
    return { savedMealPlans, error };
  } catch (error) {
    return { savedMealPlans: null, error };
  }
};
