import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, UserRole } from './types';

interface AuthState {
  user: User | null;
  token: string | null;
  role: UserRole | null;

  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;

  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setHydrated: () => void;
}

/**
 * KAAGAZSEVA - Global Authentication Store
 */

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({

      user: null,
      token: null,
      role: null,

      isAuthenticated: false,
      isLoading: false,
      isHydrated: false,

      //////////////////////////////////////////////////////
      // SET AUTH
      //////////////////////////////////////////////////////

      setAuth: (user, token) => {

        set({
          user,
          token,
          role: user?.role ?? null,
          isAuthenticated: !!token,
          isLoading: false,
        });

      },

      //////////////////////////////////////////////////////
      // LOADING
      //////////////////////////////////////////////////////

      setLoading: (loading) => {

        set({ isLoading: loading });

      },

      //////////////////////////////////////////////////////
      // LOGOUT
      //////////////////////////////////////////////////////

      logout: () => {

        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false,
          isLoading: false,
        });

        try {
          localStorage.removeItem('kaagaz-auth-storage');
        } catch (err) {
          console.error('Storage cleanup failed', err);
        }

      },

      //////////////////////////////////////////////////////
      // HYDRATION
      //////////////////////////////////////////////////////

      setHydrated: () => {

        set({ isHydrated: true });

      },

    }),

    {
      name: 'kaagaz-auth-storage',

      storage: createJSONStorage(() => localStorage),

      //////////////////////////////////////////////////////
      // Persist only required fields
      //////////////////////////////////////////////////////

      partialize: (state) => ({
        user: state.user,
        token: state.token,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),

      //////////////////////////////////////////////////////
      // Hydration handler
      //////////////////////////////////////////////////////

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated();
        }
      },
    }
  )
);