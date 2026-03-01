export type UserRole = 'customer' | 'agent' | 'admin';

export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

/* ============================= */
/* DTOs                          */
/* ============================= */

export interface LoginDTO {
  mobile: string;
}

export interface VerifyOTPDTO {
  mobile: string;
  otp: string;
}

/* ============================= */
/* Error Type                    */
/* ============================= */

export interface AuthError {
  message: string;
  status: number;
}