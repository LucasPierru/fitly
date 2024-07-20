import axios from 'axios';

const BASE_URL = 'https://api.spoonacular.com';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
