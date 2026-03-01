import { useAuthStore } from '../modules/auth/authStore';
import type { UserRole } from '../modules/auth/types'; // ✅ fixed filename

/**
 * KAAGAZSEVA - Auth Convenience Hook
 * Clean wrapper over Zustand store.
 */
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return {
    user,
    role,
    isAuthenticated,
    logout,

    // 🎯 Role Helpers
    isAdmin: role === 'admin',
    isAgent: role === 'agent',
    isCustomer: role === 'customer',
  };
};