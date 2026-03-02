import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import toast from 'react-hot-toast';
import { getErrorMessage } from './errorMapper';

/**
 * KAAGAZSEVA - Production API Client (Stable Version)
 * - Reads JWT directly from localStorage (no hydration race)
 * - Auto 401 handling
 * - Global error mapping
 */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
});

/* ======================================================
   🔒 REQUEST INTERCEPTOR (Stable JWT Injection)
====================================================== */

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      // 🔥 READ TOKEN DIRECTLY FROM PERSISTED STORAGE
      const storage = localStorage.getItem('kaagaz-auth-storage');

      if (storage) {
        const parsed = JSON.parse(storage);
        const token = parsed?.state?.token;

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // ⚠️ Do NOT manually set Content-Type for FormData
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      }

    } catch (err) {
      console.error('JWT read error:', err);
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
      // Clear storage manually (no Zustand dependency)
      localStorage.removeItem('kaagaz-auth-storage');

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