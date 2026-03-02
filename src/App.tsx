import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loader } from '@/components/ui/Loader';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { RoleRoute } from '@/routes/RoleRoute';

import PublicLayout from '@/layout/PublicLayout';
import { DashboardLayout } from '@/layout/DashboardLayout';

/* =========================
   PUBLIC PAGES
========================= */

const Home = React.lazy(() => import('@/pages/public/Home'));
const Login = React.lazy(() => import('@/pages/auth/Login'));
const VerifyOTP = React.lazy(() => import('@/pages/auth/VerifyOTP'));

/* =========================
   CUSTOMER PAGES
========================= */

const CustomerDashboard = React.lazy(() =>
  import('@/pages/customer/Dashboard')
);

const Apply = React.lazy(() =>
  import('@/pages/customer/Apply')
);

/* =========================
   AGENT
========================= */

const AgentDashboard = React.lazy(() =>
  import('@/pages/agent/Dashboard')
);

/* =========================
   ADMIN
========================= */

const AdminDashboard = React.lazy(() =>
  import('@/pages/admin/Dashboard')
);

export const App: React.FC = () => {
  const isOnline = useNetworkStatus();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />

        {!isOnline && (
          <div className="bg-red-600 text-white text-center py-1 text-xs font-bold sticky top-0 z-[9999]">
            ⚠️ You are offline. Changes may not be saved.
          </div>
        )}

        <Suspense fallback={<Loader fullScreen />}>
          <Routes>

            {/* ================= PUBLIC ================= */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
            </Route>

            {/* ================= PROTECTED ================= */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>

                {/* ================= CUSTOMER ================= */}
                <Route
                  path="/customer"
                  element={
                    <RoleRoute allowedRoles={['customer']}>
                      <CustomerDashboard />
                    </RoleRoute>
                  }
                />

                <Route
                  path="/customer/apply"
                  element={
                    <RoleRoute allowedRoles={['customer']}>
                      <Apply />
                    </RoleRoute>
                  }
                />

                {/* ================= AGENT ================= */}
                <Route
                  path="/agent"
                  element={
                    <RoleRoute allowedRoles={['agent']}>
                      <AgentDashboard />
                    </RoleRoute>
                  }
                />

                {/* ================= ADMIN ================= */}
                <Route
                  path="/admin"
                  element={
                    <RoleRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </RoleRoute>
                  }
                />

              </Route>
            </Route>

            {/* ================= FALLBACK ================= */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};