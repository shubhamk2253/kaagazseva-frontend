import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import toast from "react-hot-toast";

/**
 * KAAGAZSEVA - API CLIENT
 * Handles:
 * - Base backend connection
 * - JWT token injection
 * - Global error handling
 * - Session expiration
 */

const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://kaagazseva-backend.onrender.com/api/v1",
  timeout: 30000,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

///////////////////////////////////////////////////////////
// REQUEST INTERCEPTOR
// Inject JWT automatically
///////////////////////////////////////////////////////////

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      const storage = localStorage.getItem("kaagaz-auth-storage");

      if (storage) {
        const parsed = JSON.parse(storage);
        const token = parsed?.state?.token;

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // If uploading FormData do not set content-type
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }
    } catch (err) {
      console.error("Token read error:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

///////////////////////////////////////////////////////////
// RESPONSE INTERCEPTOR
// Global error + session handling
///////////////////////////////////////////////////////////

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const status = error.response?.status;

    // Session expired
    if (status === 401) {
      localStorage.removeItem("kaagaz-auth-storage");

      toast.error("Session expired. Please login again.");

      window.location.href = "/login";

      return Promise.reject(error);
    }

    const message =
      (error.response?.data as any)?.message ||
      "Something went wrong. Please try again.";

    toast.error(message);

    return Promise.reject(error);
  }
);

export default apiClient;