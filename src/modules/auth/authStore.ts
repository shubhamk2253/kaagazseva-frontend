import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, UserRole } from './types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  isLoading: boolean;

  // Actions
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

/**
 * KAAGAZSEVA - Central Auth Store
 * Single source of truth for all security claims.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      role: null,
      isLoading: false,

      setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
          role: user.role,
          isLoading: false,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          role: null,
          isLoading: false,
        });

        sessionStorage.clear();
      },
    }),
    {
      name: 'kaagaz-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);