import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/authStore';
import type { UserRole } from '@/modules/auth/types';

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

/**
 * ROLE ROUTE
 * Prevents unauthorized role access to protected sections.
 */
export const RoleRoute: React.FC<RoleRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Safety: Not logged in
  if (!isAuthenticated || !role) {
    return <Navigate to="/login" replace />;
  }

  // Check role access
  const hasAccess = allowedRoles.includes(role);

  if (!hasAccess) {
    const fallbackMap: Record<UserRole, string> = {
      admin: '/admin',
      agent: '/agent',
      customer: '/customer',
    };

    return <Navigate to={fallbackMap[role]} replace />;
  }

  return <>{children}</>;
};