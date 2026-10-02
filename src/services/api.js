import axios from 'axios';
import appConfig from '../config/appConfig';
import toast from '../utils/toast';

// Create axios instance
const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(appConfig.tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try refresh token
      const refreshToken = localStorage.getItem(appConfig.refreshTokenKey);
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${appConfig.apiBaseUrl}/auth/refresh-token`,
            { refreshToken }
          );
          localStorage.setItem(appConfig.tokenKey, data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed — clear session and redirect to login
          localStorage.removeItem(appConfig.tokenKey);
          localStorage.removeItem(appConfig.refreshTokenKey);
          localStorage.removeItem(appConfig.userKey);
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token — redirect to login
        localStorage.removeItem(appConfig.tokenKey);
        localStorage.removeItem(appConfig.userKey);
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Helper to upload files (multipart/form-data)
export const createFormDataApi = () =>
  axios.create({
    baseURL: appConfig.apiBaseUrl,
    timeout: 60000,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem(appConfig.tokenKey)}`,
    },
  });

export default api;
