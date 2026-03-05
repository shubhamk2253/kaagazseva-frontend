import { useAuth } from './useAuth';
import type { UserRole } from '../modules/auth/types';

/**
 * KAAGAZSEVA - Role Guard Hook
 * Used to check if the current user
 * has permission to access a feature/page.
 */

export const useRoleGuard = (allowedRoles: UserRole[]): boolean => {

  const { role, isAuthenticated } = useAuth();

  //////////////////////////////////////////////////////
  // AUTH CHECK
  //////////////////////////////////////////////////////

  if (!isAuthenticated || !role) {
    return false;
  }

  //////////////////////////////////////////////////////
  // ROLE CHECK
  //////////////////////////////////////////////////////

  return allowedRoles.includes(role);

};