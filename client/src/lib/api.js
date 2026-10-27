import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
});

export function authConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export function getApiError(error, fallback) {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
    return 'Could not connect to the server. Check that the Agri-Tech API is running and try again.';
  }
  return fallback;
}

export default api;
