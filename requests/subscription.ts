'use server';

import { cookies } from 'next/headers';

export const createSubscription = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/subscription/create`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token.value}`
        }
      }
    );
    const data = await response.json();
    const { subscriptionPrice, subscriptionCurrency, clientSecret, error } =
      data;
    if (error) throw error;
    return { subscriptionPrice, subscriptionCurrency, clientSecret, error };
  } catch (error) {
    return {
      subscriptionPrice: null,
      subscriptionCurrency: null,
      clientSecret: null,
      error
    };
  }
};
