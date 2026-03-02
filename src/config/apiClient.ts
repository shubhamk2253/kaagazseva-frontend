import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/modules/auth/authStore';
import { getErrorMessage } from './errorMapper';

/**
 * KAAGAZSEVA - Production API Client (Node Backend Aligned)
 * Features:
 * - Auto JWT Injection
 * - Global Error Handling
 * - 401 Auto Logout
 */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/* ======================================================
   🔒 REQUEST INTERCEPTOR (JWT Injection)
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
   🔓 RESPONSE INTERCEPTOR
====================================================== */

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const status = error.response?.status;

    /* ========================================
       🔐 401 — Token Invalid / Expired
    ======================================== */

    if (status === 401) {
      useAuthStore.getState().logout();

      toast.error('Session expired. Please login again.', {
        id: 'session-expired',
      });

      window.location.href = '/login';

      return Promise.reject(error);
    }

    /* ========================================
       🌍 Global Error Mapping
    ======================================== */

    const friendlyMessage = getErrorMessage(error);

    toast.error(friendlyMessage, {
      id: 'global-api-error',
    });

    return Promise.reject(error);
  }
);

export default apiClient;