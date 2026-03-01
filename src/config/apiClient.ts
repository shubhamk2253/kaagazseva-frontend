import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/modules/auth/authStore';
import { getErrorMessage } from './errorMapper';

/**
 * KAAGAZSEVA - National Infrastructure API Client
 * Features:
 * - Auto JWT Injection
 * - Refresh Token Handling
 * - Request Retry System
 * - Global Error Mapping
 * - Toast Deduplication
 */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/* ======================================================
   🔒 REQUEST INTERCEPTOR
====================================================== */

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================================================
   🔁 REFRESH TOKEN SYSTEM
====================================================== */

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

/* ======================================================
   🔓 RESPONSE INTERCEPTOR
====================================================== */

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    const status = error.response?.status;

    /* ========================================
       🔁 Controlled Retry (Network / 5xx)
    ======================================== */

    if (!error.response && !originalRequest._retry) {
      originalRequest._retry = true;
      return apiClient(originalRequest);
    }

    if (status && status >= 500 && !originalRequest._retry) {
      originalRequest._retry = true;
      return apiClient(originalRequest);
    }

    /* ========================================
       🔐 401 — Token Expired Handling
    ======================================== */

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: any) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        // 🔥 CALL REFRESH ENDPOINT
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true } // Requires HttpOnly cookie
        );

        const newToken = response.data.accessToken;

        // Update Zustand store
        useAuthStore.getState().setAuth(
          useAuthStore.getState().user!,
          newToken
        );

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Refresh failed → Logout completely
        useAuthStore.getState().logout();

        toast.error('Session expired. Please login again.');

        window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    /* ========================================
       🌍 Global Error Mapping
    ======================================== */

    const friendlyMessage = getErrorMessage(error);

    if (status !== 401) {
      toast.error(friendlyMessage, {
        id: 'global-api-error',
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;