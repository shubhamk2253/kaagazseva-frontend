import apiClient from '../../config/apiClient';
import { AuthResponse, LoginDTO, VerifyOTPDTO } from './types';

export const authService = {
  // Step 1: Send OTP to Mobile
  sendOtp: async (data: LoginDTO): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/send-otp', data);
    return response.data;
  },

  // Step 2: Verify OTP and get Token + Role
  verifyOtp: async (data: VerifyOTPDTO): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/verify-otp', data);
    return response.data;
  },

  // Admin Login (Direct password/OTP for founder)
  adminLogin: async (data: any): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/admin-login', data);
    return response.data;
  }
};