import apiClient from '@/config/apiClient';
import { useAuthStore } from '@/modules/auth/authStore';
import type { AuthResponse, UserRole } from './types';

/**
 * KAAGAZSEVA - Authentication Service
 * Firebase OTP + Backend Session
 */

export const authService = {

  //////////////////////////////////////////////////////
  // FIREBASE LOGIN
  // POST /auth/firebase-login
  //////////////////////////////////////////////////////

  async firebaseLogin(data: { phoneNumber: string }): Promise<AuthResponse> {

    const response = await apiClient.post('/auth/firebase-login', data);

    const res = response.data;

    if (!res?.success || !res?.data) {
      throw new Error(res?.message || 'Authentication failed');
    }

    const backendData = res.data;

    //////////////////////////////////////////////////////
    // VALIDATE RESPONSE
    //////////////////////////////////////////////////////

    if (!backendData.accessToken || !backendData.user) {
      throw new Error('Invalid authentication response');
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