export const API_BASE_URL = 'https://dummyjson.com';

export const ENDPOINTS = {
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  LOGIN: '/auth/login',
  CREATE_PRODUCT: '/auth/products/add',
  REFRESH_TOKEN: '/auth/refresh'
};
