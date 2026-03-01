import { useAuth } from './useAuth';
import type { UserRole } from '../modules/auth/types';

export const useRoleGuard = (allowedRoles: UserRole[]) => {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated || !role) return false;
  
  return allowedRoles.includes(role);
};