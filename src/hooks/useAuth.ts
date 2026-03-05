import { useAuthStore } from '../modules/auth/authStore';
import type { UserRole } from '../modules/auth/types';

/**
 * KAAGAZSEVA - Auth Convenience Hook
 * Clean wrapper around Zustand auth store.
 */

export const useAuth = () => {

  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  //////////////////////////////////////////////////////
  // ROLE HELPERS
  //////////////////////////////////////////////////////

  const isFounder = role === 'founder';

  const isStateAdmin = role === 'state_admin';

  const isDistrictAdmin = role === 'district_admin';

  const isAdmin =
    role === 'founder' ||
    role === 'state_admin' ||
    role === 'district_admin';

  const isAgent = role === 'agent';

  const isCustomer = role === 'customer';

  //////////////////////////////////////////////////////
  // RETURN
  //////////////////////////////////////////////////////

  return {
    user,
    role,
    isAuthenticated,
    logout,

    isFounder,
    isStateAdmin,
    isDistrictAdmin,
    isAdmin,
    isAgent,
    isCustomer,
  };

};