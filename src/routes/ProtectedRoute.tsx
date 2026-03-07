import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/authStore';

/**
 * KAAGAZSEVA - Protected Route
 * First security layer
 * Ensures user is authenticated before accessing protected pages
 */

export const ProtectedRoute: React.FC = () => {

  const { isAuthenticated, isHydrated } = useAuthStore();
  const location = useLocation();

  //////////////////////////////////////////////////////
  // WAIT FOR ZUSTAND HYDRATION
  //////////////////////////////////////////////////////

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center h-screen text-sm text-gray-500">
        Loading session...
      </div>
    );
  }

  //////////////////////////////////////////////////////
  // NOT AUTHENTICATED
  //////////////////////////////////////////////////////

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  //////////////////////////////////////////////////////
  // AUTHENTICATED
  //////////////////////////////////////////////////////

  return <Outlet />;

};