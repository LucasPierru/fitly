import { AxiosError, AxiosResponse } from 'axios';
import { FoodInformation } from '@/types/foods';
import { api } from './spoonacular';

interface ApiError extends Error {
  response: AxiosResponse;
}

export const handleError = (error: AxiosError): string => {
  switch (error.response?.status) {
    case 404:
      return 'Request not found';
    case 400:
      return 'Bad request';
    case 401:
      return 'Unauthorized';
    case 500:
      return 'Server unavailable';
    default:
      return 'There was an error';
  }
};

export function createApiError(error: AxiosError): ApiError {
  if (error.response) {
    const apiError = new Error(error.message) as ApiError;
    (apiError as AxiosError).response = error.response;
    return apiError;
  }
  return error as ApiError;
}

export const getIngredientsAutocomplete = async (
  query: string
): Promise<FoodInformation[]> => {
  try {
    const response: AxiosResponse<FoodInformation[]> = await api.get(
      `/food/ingredients/autocomplete?query=${query}&number=5&metaInformation=true&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw createApiError(error as AxiosError);
  }
};
