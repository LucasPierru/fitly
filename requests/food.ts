import { AxiosError, AxiosResponse } from 'axios';
import { FoodInformation, FoodInformationDetails } from '@/types/foods';
import { api } from './spoonacular';
import { createApiError } from './common';

export const getIngredientsAutocomplete = async (
  query: string
): Promise<FoodInformation[]> => {
  try {
    const response: AxiosResponse<FoodInformation[]> = await api.get(
      `/food/ingredients/autocomplete?query=${query}&number=3&metaInformation=true&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw createApiError(error as AxiosError);
  }
};

export const getIngredientsInformation = async (
  id: number
): Promise<FoodInformationDetails[]> => {
  try {
    const response: AxiosResponse<FoodInformationDetails[]> = await api.get(
      `/food/ingredients/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw createApiError(error as AxiosError);
  }
};
