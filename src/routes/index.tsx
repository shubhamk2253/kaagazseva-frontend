import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';
import { Loader } from '@/components/ui/Loader';

/* =========================
   PUBLIC PAGES
========================= */

const Login = lazy(() => import('@/pages/auth/Login'));
const VerifyOTP = lazy(() => import('@/pages/auth/VerifyOTP'));

/* =========================
   CUSTOMER
========================= */

const CustomerDashboard = lazy(() =>
  import('@/pages/customer/Dashboard')
);

/* =========================
   AGENT
========================= */

const AgentDashboard = lazy(() =>
  import('@/pages/agent/Dashboard')
);

/* =========================
   ADMINS
========================= */

const DistrictAdminDashboard = lazy(() =>
  import('@/pages/district-admin/Dashboard')
);

const StateAdminDashboard = lazy(() =>
  import('@/pages/state-admin/Dashboard')
);

const FounderDashboard = lazy(() =>
  import('@/pages/founder/Dashboard')
);

export const AppRoutes: React.FC = () => {

  return (

    <Suspense fallback={<Loader fullScreen />}>

      <Routes>

        {/* PUBLIC */}

        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* PROTECTED */}

        <Route element={<ProtectedRoute />}>

          {/* CUSTOMER */}

          <Route
            path="/customer"
            element={
              <RoleRoute allowedRoles={['customer']}>
                <CustomerDashboard />
              </RoleRoute>
            }
          />

          {/* AGENT */}

          <Route
            path="/agent"
            element={
              <RoleRoute allowedRoles={['agent']}>
                <AgentDashboard />
              </RoleRoute>
            }
          />

          {/* DISTRICT ADMIN */}

          <Route
            path="/district-admin"
            element={
              <RoleRoute allowedRoles={['district_admin']}>
                <DistrictAdminDashboard />
              </RoleRoute>
            }
          />

          {/* STATE ADMIN */}

          <Route
            path="/state-admin"
            element={
              <RoleRoute allowedRoles={['state_admin']}>
                <StateAdminDashboard />
              </RoleRoute>
            }
          />

          {/* FOUNDER */}

          <Route
            path="/founder"
            element={
              <RoleRoute allowedRoles={['founder']}>
                <FounderDashboard />
              </RoleRoute>
            }
          />

        </Route>

        {/* FALLBACK */}

        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>

    </Suspense>

  );
};