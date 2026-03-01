import apiClient from '@/config/apiClient';
import { useAuthStore } from './authStore';
import type { 
  LoginDTO, 
  VerifyOTPDTO, 
  AuthResponse 
} from './types';

/**
 * KAAGAZSEVA - Authentication Service
 * Responsible for API communication and local session sync.
 */
export const authService = {
  /**
   * Step 1: Request OTP
   * Hits the backend to trigger an SMS/Mock OTP.
   */
  async requestOtp(data: LoginDTO): Promise<{ message: string }> {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  /**
   * Step 2: Verify OTP & Initialize Session
   * Exchanges OTP for a JWT and User profile.
   */
  async verifyOtp(data: VerifyOTPDTO): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/verify-otp', data);
    const authData: AuthResponse = response.data;

    // 100/100 Discipline: Sync the global state immediately upon success
    if (authData.access_token && authData.user) {
      useAuthStore.getState().setAuth(authData.user, authData.access_token);
    }

    return authData;
  },

  /**
   * Logout
   * Clears the session and redirects.
   */
  logout(): void {
    useAuthStore.getState().logout();
    window.location.href = '/login';
  },

  /**
   * Get Current Session State
   */
  getCurrentUser() {
    return useAuthStore.getState().user;
  }
};