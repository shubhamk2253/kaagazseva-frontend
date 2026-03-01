import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';
import { Loader } from '@/components/ui/Loader';

// 🔓 Public Pages
const Login = lazy(() =>
  import('@/pages/auth/Login').then((m) => ({ default: m.Login }))
);

const VerifyOTP = lazy(() =>
  import('@/pages/auth/VerifyOTP').then((m) => ({ default: m.VerifyOTP }))
);

// 👑 Admin Pages
const AdminDashboard = lazy(() =>
  import('@/pages/admin/Dashboard').then((m) => ({ default: m.AdminDashboard }))
);

const ControlTower = lazy(() =>
  import('@/pages/admin/ControlTower').then((m) => ({ default: m.ControlTower }))
);

// 🛠️ Agent Pages
const AgentDashboard = lazy(() =>
  import('@/pages/agent/Dashboard').then((m) => ({ default: m.AgentDashboard }))
);

// 👤 Customer Pages
const CustomerDashboard = lazy(() =>
  import('@/pages/customer/Dashboard').then((m) => ({ default: m.CustomerDashboard }))
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Protected Layer */}
        <Route path="/" element={<ProtectedRoute />}>
          {/* Admin */}
          <Route
            path="admin"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleRoute>
            }
          >
            <Route path="control-tower" element={<ControlTower />} />
          </Route>

          {/* Agent */}
          <Route
            path="agent"
            element={
              <RoleRoute allowedRoles={['agent']}>
                <AgentDashboard />
              </RoleRoute>
            }
          />

          {/* Customer */}
          <Route
            path="customer"
            element={
              <RoleRoute allowedRoles={['customer']}>
                <CustomerDashboard />
              </RoleRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};