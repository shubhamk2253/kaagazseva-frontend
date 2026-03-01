import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/authStore';
import { UserRole } from '@/modules/auth/types';

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

/**
 * ROLE ROUTE
 * Prevents "Inquisitive Customers" from accessing the /admin panel.
 */
export const RoleRoute: React.FC<RoleRouteProps> = ({ children, allowedRoles }) => {
  const { role, isAuthenticated } = useAuthStore();

  // 1. If not logged in at all, ProtectedRoute usually handles this, 
  // but we add a safety check here.
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // 2. Security: Check if the user's role is in the allowed list
  const hasAccess = role && allowedRoles.includes(role);

  if (!hasAccess) {
    // Redirect to their respective "Home" dashboard if they try to trespass
    const fallbackMap: Record<UserRole, string> = {
      admin: '/admin',
      agent: '/agent',
      customer: '/customer'
    };
    
    return <Navigate to={role ? fallbackMap[role] : '/login'} replace />;
  }

  return <>{children}</>;
};