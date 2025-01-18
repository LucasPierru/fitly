import { AxiosError, AxiosResponse } from 'axios';
import { FoodInformation, FoodInformationDetails } from '@/types/foods';
import { api } from './spoonacular';
import { createApiError } from './common';
import { getFromCache, setToCache } from '@/utils/cache';

export const getIngredientsAutocomplete = async (
  query: string
): Promise<FoodInformation[]> => {
  const cachedData: FoodInformation[] = getFromCache(query);
  if (cachedData) return cachedData;
  try {
    const response: AxiosResponse<FoodInformation[]> = await api.get(
      `/food/ingredients/autocomplete?query=${query}&number=3&metaInformation=true&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
    );
    setToCache(query, response.data);
    return response.data;
  } catch (error) {
    throw createApiError(error as AxiosError);
  }
};

export const getIngredientInformations = async (
  id: number,
  amount?: number,
  unit?: string
): Promise<FoodInformationDetails> => {
  const cachedData: FoodInformationDetails = getFromCache(id.toString());
  if (cachedData) return cachedData;
  try {
    const response: AxiosResponse<FoodInformationDetails> = await api.get(
      `/food/ingredients/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&amount=${amount || 100}&unit=${unit || 'g'}`
    );
    setToCache(id.toString(), response.data);
    return response.data;
  } catch (error) {
    throw createApiError(error as AxiosError);
  }
};
