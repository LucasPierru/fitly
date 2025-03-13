'use server';

import { AxiosError, AxiosResponse } from 'axios';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { redirect } from '@/i18n/navigation';
import { api } from './server';
import { createApiError } from './common';
import { IUser } from '@/types';

export const login = async (email: string, password: string) => {
  try {
    const {
      data
    }: AxiosResponse<{
      token: string | null;
      message: string;
      error: Error | null;
    }> = await api.post(`/v1/auth/login`, { email, password });
    if (data.token) {
      cookies().set('token', data.token);
    }
    return data;
  } catch (error) {
    const data: { message: string } = (error as AxiosError).response?.data as {
      message: string;
    };

    const axiosError: AxiosError = error as AxiosError;

    return {
      token: null,
      message: data.message,
      error: axiosError.message
    };
  }
};

export const signUp = async (user: IUser) => {
  try {
    const {
      data
    }: AxiosResponse<{
      token: string | null;
      message: string;
      error: Error | null;
    }> = await api.post(`/v1/auth/register`, user);
    if (data.token) {
      cookies().set('token', data.token);
    }
    return data;
  } catch (error) {
    throw createApiError(error as AxiosError);
  }
};

export const logout = async () => {
  try {
    cookies().delete('token');
  } catch (error) {
    console.log(error);
  }
  redirect({ href: '/login', locale: await getLocale() });
};
