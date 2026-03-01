import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, UserRole } from './types';

interface AuthState {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

/**
 * KAAGAZSEVA - Central Auth Store
 * Production-safe, backend-aligned authentication state.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user, token) => {
        set({
          user,
          token,
          role: user.role,
          isAuthenticated: true,
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
          role: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Clear persisted storage safely
        localStorage.removeItem('kaagaz-auth-storage');
      },
    }),
    {
      name: 'kaagaz-auth-storage',
      storage: createJSONStorage(() => localStorage),

      // 🔥 Only persist essential security data
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);