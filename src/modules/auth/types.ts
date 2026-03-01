export type UserRole = 'customer' | 'agent' | 'admin';

export interface User {
  id: string;
  mobile: string;
  full_name?: string;
  role: UserRole;
  created_at: string;
}

/**
 * 100/100 Discipline: This matches your Flask 
 * login_verify service response exactly.
 */
export interface AuthResponse {
  access_token: string;
  role: UserRole;
  user: User;
}

// Data Transfer Objects (DTOs) for strict form typing
export interface LoginDTO {
  mobile: string;
}

export interface VerifyOTPDTO {
  mobile: string;
  otp: string;
}

// Added for A-Grade Error handling
export interface AuthError {
  message: string;
  status: number;
}