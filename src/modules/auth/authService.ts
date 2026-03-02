import apiClient from '@/config/apiClient';
import { useAuthStore } from './authStore';
import type {
  LoginDTO,
  VerifyOTPDTO,
  AuthResponse,
  UserRole,
} from './types';

/**
 * KAAGAZSEVA - Authentication Service (OTP Based)
 * Backend Route: /api/v1/otp/*
 */

export const authService = {
  /* ======================================================
     📲 REQUEST OTP
     POST /otp/send
  ====================================================== */
  async requestOtp(data: LoginDTO): Promise<{ message: string }> {
    const response = await apiClient.post('/otp/send', data);

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to send OTP');
    }

    return {
      message: response.data.message,
    };
  },

  /* ======================================================
     🔐 VERIFY OTP + LOGIN
     POST /otp/verify
  ====================================================== */
  async verifyOtp(data: VerifyOTPDTO): Promise<AuthResponse> {
    const response = await apiClient.post('/otp/verify', data);

    if (!response.data?.success || !response.data?.data) {
      throw new Error(response.data?.message || 'OTP verification failed');
    }

    const backendData = response.data.data;

    if (!backendData.accessToken || !backendData.user) {
      throw new Error('Invalid authentication response');
    }

    // Normalize role to lowercase for frontend routing
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

    // Save to Zustand
    useAuthStore.getState().setAuth(
      formattedResponse.user,
      formattedResponse.accessToken
    );

    return formattedResponse;
  },

  /* ======================================================
     🚪 LOGOUT
  ====================================================== */
  logout(): void {
    useAuthStore.getState().logout();
    window.location.href = '/login';
  },

  /* ======================================================
     👤 GET CURRENT USER
  ====================================================== */
  getCurrentUser() {
    return useAuthStore.getState().user;
  },
};