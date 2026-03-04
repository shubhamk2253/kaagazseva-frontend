import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/modules/auth/authStore';
import type { UserRole } from '@/modules/auth/types';

interface RoleRouteProps {
allowedRoles: UserRole[];
}

/**

* KAAGAZSEVA - Role Route
* Second security layer
* Restricts route access by user role
  */

export const RoleRoute: React.FC<RoleRouteProps> = ({
allowedRoles,
}) => {
const { role } = useAuthStore();

if (!role || !allowedRoles.includes(role)) {
return <Navigate to="/unauthorized" replace />;
}

return <Outlet />;
};