import baseAxios, { CreateAxiosDefaults } from 'axios';
import { config } from '@/client/config';

const baseURL = config.NODE_ENV === 'production' ? '/api' : config.API_URL;

const axiosConfig: CreateAxiosDefaults = {
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const axios = baseAxios.create(axiosConfig);
