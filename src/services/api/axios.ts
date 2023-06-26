import axios from 'axios';

export let BASE_ENDPOINT = '';
const env = import.meta.env.VITE_APP_ENVIRONMENT;

if (env === 'local') {
  BASE_ENDPOINT = 'http://localhost:5000';
} else if (env === 'development') {
  BASE_ENDPOINT = 'https://api.dev.<your-backend-domain>';
} else if (env === 'production') {
  BASE_ENDPOINT = 'https://api.prod.<your-backend-domain>';
}

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export default axios.create({ baseURL: BASE_URL });

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-type': 'application/json', Accept: 'application/json' },
  withCredentials: true,
});
