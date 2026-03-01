import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/authStore';
import { Loader } from '@/components/ui/Loader';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

/**
 * PROTECTED ROUTE
 * First security layer – checks authentication before rendering nested routes.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  // Prevent flash redirect while Zustand hydrates
  if (token && !isAuthenticated) {
    return <Loader fullScreen />;
  }

  // Not logged in → redirect
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // If children exist (your usage pattern), render them
  if (children) {
    return <>{children}</>;
  }

  // Otherwise render nested routes
  return <Outlet />;
};