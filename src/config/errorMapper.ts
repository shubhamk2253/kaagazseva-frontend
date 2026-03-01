import { AxiosError } from 'axios';

/**
 * Converts technical Axios errors into user-friendly strings.
 */
export const getErrorMessage = (error: AxiosError | any): string => {
  if (!error.response) {
    // This handles network failures (offline, DNS issues)
    return "No internet connection. Please check your network.";
  }
  
  const status = error.response.status;
  const code = error.code;

  // Handle Timeout specifically
  if (code === 'ECONNABORTED') {
    return "Server is taking too long to respond. Please try again.";
  }

  // Map HTTP Status Codes
  switch (status) {
    case 401: return "Session expired. Please login again.";
    case 403: return "You are not allowed to perform this action.";
    case 404: return "The requested service was not found.";
    case 422: return "Invalid information provided. Please check your entries.";
    case 429: return "Too many requests. Please wait a moment.";
    case 500: return "System temporarily unavailable. Our engineers are on it.";
    default: 
      // Fallback to backend message if available
      return (error.response.data as any)?.message || "Something went wrong. Please try again.";
  }
};