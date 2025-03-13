import { AxiosError, AxiosResponse } from 'axios';
import { IIngredient } from '@/types';
import { api } from './server';
import { createApiError } from './common';

export const getIngredientsAutocomplete = async (
  query: string
): Promise<{
  ingredients: IIngredient[] | null;
  message: string | null;
  error: string | null;
}> => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];
  try {
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response: AxiosResponse<{
      ingredients: IIngredient[];
      message: string;
      error: string;
    }> = await api.get(`/v1/ingredient/search?search=${query}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    const data: { message: string } = (error as AxiosError).response?.data as {
      message: string;
    };

    const axiosError: AxiosError = error as AxiosError;

    return {
      ingredients: [],
      message: data.message,
      error: axiosError.message
    };
  }
};

export const getIngredientInformations = async (
  id: string
): Promise<IIngredient> => {
  try {
    const response: AxiosResponse<IIngredient> = await api.get(
      `/v1/ingredient/details/${id}`
    );
    return response.data;
  } catch (error) {
    throw createApiError(error as AxiosError);
  }
};
