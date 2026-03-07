import apiClient from '@/config/apiClient';
import { useAuthStore } from '@/modules/auth/authStore';
import type {
  LoginDTO,
  VerifyOTPDTO,
  AuthResponse,
  UserRole,
} from './types';

/**
 * KAAGAZSEVA - Authentication Service
 * Backend routes: /api/v1/auth/*
 */

export const authService = {

  //////////////////////////////////////////////////////
  // REQUEST OTP
  // POST /auth/send-otp
  //////////////////////////////////////////////////////

  async requestOtp(data: LoginDTO): Promise<{ message: string }> {

    const response = await apiClient.post('/auth/request-otp', data);

    const res = response.data;

    if (!res?.success) {
      throw new Error(res?.message || 'Failed to send OTP');
    }

    return {
      message: res.message || 'OTP sent successfully',
    };
  },

  //////////////////////////////////////////////////////
  // VERIFY OTP
  // POST /auth/verify-otp
  //////////////////////////////////////////////////////

  async verifyOtp(data: VerifyOTPDTO): Promise<AuthResponse> {

    const response = await apiClient.post('/auth/verify-otp', data);

    const res = response.data;

    if (!res?.success || !res?.data) {
      throw new Error(res?.message || 'OTP verification failed');
    }

    const backendData = res.data;

    //////////////////////////////////////////////////////
    // VALIDATE RESPONSE
    //////////////////////////////////////////////////////

    if (!backendData.accessToken || !backendData.user) {
      throw new Error('Invalid authentication response from server');
    }

    //////////////////////////////////////////////////////
    // NORMALIZE ROLE
    //////////////////////////////////////////////////////

    const normalizedRole =
      backendData.user.role?.toLowerCase() as UserRole;

    //////////////////////////////////////////////////////
    // FORMAT RESPONSE
    //////////////////////////////////////////////////////

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

    //////////////////////////////////////////////////////
    // SAVE AUTH STATE (ZUSTAND)
    //////////////////////////////////////////////////////

    useAuthStore.getState().setAuth(
      formattedResponse.user,
      formattedResponse.accessToken
    );

    return formattedResponse;
  },

  //////////////////////////////////////////////////////
  // LOGOUT
  //////////////////////////////////////////////////////

  logout(): void {

    useAuthStore.getState().logout();

    window.location.href = '/login';

  },

  //////////////////////////////////////////////////////
  // GET CURRENT USER
  //////////////////////////////////////////////////////

  getCurrentUser() {

    return useAuthStore.getState().user;

  },

  //////////////////////////////////////////////////////
  // GET TOKEN
  //////////////////////////////////////////////////////

  getToken() {

    return useAuthStore.getState().token;

  },

  //////////////////////////////////////////////////////
  // CHECK AUTH
  //////////////////////////////////////////////////////

  isAuthenticated() {

    const token = useAuthStore.getState().token;

    return !!token;

  },

};