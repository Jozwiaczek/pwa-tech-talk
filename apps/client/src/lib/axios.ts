import baseAxios, { CreateAxiosDefaults } from 'axios';
import { config } from '@/client/config';

console.log('L:4 | config.API_URL: ', config.API_URL);

const axiosConfig: CreateAxiosDefaults = {
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const axios = baseAxios.create(axiosConfig);
