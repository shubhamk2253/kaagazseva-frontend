import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/authStore';
import type { UserRole } from '@/modules/auth/types';

interface RoleRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

/**
 * KAAGAZSEVA - Role Route
 *
 * Second security layer after ProtectedRoute.
 * Ensures that only specific roles can access a route.
 */

export const RoleRoute: React.FC<RoleRouteProps> = ({
  allowedRoles,
  children,
}) => {

  const { role, isAuthenticated } = useAuthStore();
  const location = useLocation();

  //////////////////////////////////////////////////////
  // AUTH CHECK
  //////////////////////////////////////////////////////

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  //////////////////////////////////////////////////////
  // ROLE CHECK
  //////////////////////////////////////////////////////

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  //////////////////////////////////////////////////////
  // AUTHORIZED
  //////////////////////////////////////////////////////

  return <>{children}</>;

};