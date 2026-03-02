import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/authStore';
import type { UserRole } from '@/modules/auth/types';

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export const RoleRoute: React.FC<RoleRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { role, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = role && allowedRoles.includes(role);

  if (!hasAccess) {
    const fallbackMap: Record<UserRole, string> = {
      admin: '/admin',
      agent: '/agent',
      customer: '/customer',
    };

    return <Navigate to={role ? fallbackMap[role] : '/login'} replace />;
  }

  return <>{children}</>;
};