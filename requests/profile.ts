'use server';

import { cookies } from 'next/headers';
import { UserBMRData } from '@/types-old/users';

export const getProfile = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/profile`,
      {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token.value}`
        }
      }
    );
    const data = await response.json();
    const { profile, error } = data;
    if (error) throw error;
    return { profile, error };
  } catch (error) {
    return { profile: null, error };
  }
};

export const updateProfile = async (newProfile: UserBMRData) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/profile/update`,
      {
        method: 'POST',
        body: JSON.stringify(newProfile),
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token.value}`
        },
        credentials: 'include'
      }
    );
    const data = await response.json();
    const { profile, error } = data;
    if (error) throw error;
    return { profile, error };
  } catch (error) {
    return { profile: null, error };
  }
};
