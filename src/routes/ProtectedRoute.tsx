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

// Prevent flashing before Zustand hydrates
if (!isHydrated) {
return null;
}

// Not logged in → redirect to login
if (!isAuthenticated) {
return (
<Navigate
to="/login"
state={{ from: location }}
replace
/>
);
}

// Authenticated → allow nested routes
return <Outlet />;
};