import axios, { AxiosError, AxiosResponse } from 'axios';
import { createApiError } from './common';
import { ImagesSearch } from '@/types-old/unsplash';

const BASE_URL = 'https://api.unsplash.com';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getImages = async (query: string, page: number) => {
  try {
    const response: AxiosResponse<ImagesSearch> = await api.get(
      `/search/photos?page=${page}&query=${query}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw createApiError(error as AxiosError);
  }
};
