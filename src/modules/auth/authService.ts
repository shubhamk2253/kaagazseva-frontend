import apiClient from '@/config/apiClient';
import { useAuthStore } from './authStore';
import type {
  LoginDTO,
  VerifyOTPDTO,
  AuthResponse,
  UserRole,
} from './types';

/**
 * KAAGAZSEVA - Authentication Service
 * Fully aligned with Node backend structure
 */
export const authService = {
  async requestOtp(data: LoginDTO): Promise<{ message: string }> {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  async verifyOtp(data: VerifyOTPDTO): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/verify-otp', data);

    // Backend wraps inside { data: {...} }
    const backendData = response.data?.data;

    if (!backendData?.accessToken || !backendData?.user) {
      throw new Error('Invalid authentication response from server');
    }

    // Normalize role to lowercase
    const normalizedRole =
      backendData.user.role.toLowerCase() as UserRole;

    const formattedResponse: AuthResponse = {
      accessToken: backendData.accessToken,
      user: {
        id: backendData.user.id,
        phoneNumber: backendData.user.phoneNumber,
        name: backendData.user.name ?? undefined,
        role: normalizedRole,
        createdAt: backendData.user.createdAt,
      },
    };

    // Sync Zustand store
    useAuthStore.getState().setAuth(
      formattedResponse.user,
      formattedResponse.accessToken
    );

    return formattedResponse;
  },

  logout(): void {
    useAuthStore.getState().logout();
    window.location.href = '/login';
  },

  getCurrentUser() {
    return useAuthStore.getState().user;
  },
};