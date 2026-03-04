import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import toast from 'react-hot-toast';
import { getErrorMessage } from './errorMapper';

/**
 * KAAGAZSEVA - Production API Client
 * Features:
 * - Automatic JWT injection
 * - Global error handling
 * - Session expiration handling
 * - FormData support
 * - Secure cookie compatibility
 */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

/* ======================================================
   🔒 REQUEST INTERCEPTOR
   Inject JWT token automatically
====================================================== */

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      const storage = localStorage.getItem('kaagaz-auth-storage');

      if (storage) {
        const parsed = JSON.parse(storage);
        const token = parsed?.state?.token;

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // ⚠️ If uploading files (FormData), do NOT set content type manually
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
   Global error + session handling
====================================================== */

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const status = error.response?.status;

    /* ========================================
       🔐 SESSION EXPIRED
    ======================================== */

    if (status === 401) {
      localStorage.removeItem('kaagaz-auth-storage');

      toast.error('Session expired. Please login again.', {
        id: 'session-expired',
      });

      window.location.href = '/login';

      return Promise.reject(error);
    }

    /* ========================================
       🌍 GLOBAL ERROR MAPPING
    ======================================== */

    const friendlyMessage = getErrorMessage(error);

    toast.error(friendlyMessage, {
      id: 'global-api-error',
    });

    return Promise.reject(error);
  }
);

export default apiClient;