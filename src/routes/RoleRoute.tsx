import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/authStore';
import type { UserRole } from '@/modules/auth/types';

interface RoleRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

/**
 * KAAGAZSEVA - Role Route
 * Second security layer
 * Restricts route access by user role
 */

export const RoleRoute: React.FC<RoleRouteProps> = ({
  allowedRoles,
  children,
}) => {

  const { role } = useAuthStore();

  // Not authorized
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // Authorized
  return <>{children}</>;
};