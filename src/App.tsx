import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Infrastructure & Safety
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loader } from '@/components/ui/Loader';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

// Routes & Guards
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { RoleRoute } from '@/routes/RoleRoute';

// Layouts
import { PublicLayout } from '@/layout/PublicLayout';
import { DashboardLayout } from '@/layout/DashboardLayout';

/* =====================================================
   🔥 LAZY LOADED PAGES (Production Grade)
===================================================== */

// Public
const Home = React.lazy(() => import('@/pages/public/Home'));
const Login = React.lazy(() => import('@/pages/auth/Login'));
const VerifyOTP = React.lazy(() => import('@/pages/auth/VerifyOTP'));

// 👤 Customer
const CustomerDashboard = React.lazy(() =>
  import('@/modules/customer/pages/CustomerDashboard')
);

const ApplyService = React.lazy(() =>
  import('@/modules/application/pages/ApplyService')
);

const CustomerApplications = React.lazy(() =>
  import('@/modules/application/pages/CustomerApplications')
);

// 🛠 Agent
const AgentDashboard = React.lazy(() =>
  import('@/modules/agent/pages/AgentDashboard')
);

const AgentWorkload = React.lazy(() =>
  import('@/modules/agent/pages/AgentWorkload')
);

const AgentWallet = React.lazy(() =>
  import('@/modules/agent/pages/AgentWallet')
);

// 👑 Admin
const AdminDashboard = React.lazy(() =>
  import('@/modules/admin/pages/AdminDashboard')
);

const ControlTower = React.lazy(() =>
  import('@/modules/admin/pages/ControlTower')
);

const AdminAnalytics = React.lazy(() =>
  import('@/modules/admin/pages/AdminAnalytics')
);

/* =====================================================
   🚀 MAIN APP
===================================================== */

export const App = () => {
  const isOnline = useNetworkStatus();

  return (
    <ErrorBoundary>
      <BrowserRouter>

        {/* 🌐 Global Notifications */}
        <Toaster position="top-center" reverseOrder={false} />

        {/* ⚠️ Offline Banner */}
        {!isOnline && (
          <div className="bg-red-600 text-white text-center py-1 text-xs font-bold sticky top-0 z-[9999]">
            ⚠️ You are offline. Changes may not be saved.
          </div>
        )}

        {/* ⚡ Suspense Fallback */}
        <Suspense fallback={<Loader fullScreen />}>
          <Routes>

            {/* =========================
                🔓 PUBLIC AREA
            ========================== */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
            </Route>

            {/* =========================
                🔒 PRIVATE AREA
            ========================== */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >

              {/* 👤 CUSTOMER */}
              <Route path="/customer">
                <Route
                  index
                  element={
                    <RoleRoute allowedRoles={['customer']}>
                      <CustomerDashboard />
                    </RoleRoute>
                  }
                />
                <Route
                  path="apply"
                  element={
                    <RoleRoute allowedRoles={['customer']}>
                      <ApplyService />
                    </RoleRoute>
                  }
                />
                <Route
                  path="applications"
                  element={
                    <RoleRoute allowedRoles={['customer']}>
                      <CustomerApplications />
                    </RoleRoute>
                  }
                />
              </Route>

              {/* 🛠 AGENT */}
              <Route path="/agent">
                <Route
                  index
                  element={
                    <RoleRoute allowedRoles={['agent']}>
                      <AgentDashboard />
                    </RoleRoute>
                  }
                />
                <Route
                  path="workload"
                  element={
                    <RoleRoute allowedRoles={['agent']}>
                      <AgentWorkload />
                    </RoleRoute>
                  }
                />
                <Route
                  path="wallet"
                  element={
                    <RoleRoute allowedRoles={['agent']}>
                      <AgentWallet />
                    </RoleRoute>
                  }
                />
              </Route>

              {/* 👑 ADMIN */}
              <Route path="/admin">
                <Route
                  index
                  element={
                    <RoleRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </RoleRoute>
                  }
                />
                <Route
                  path="control-tower"
                  element={
                    <RoleRoute allowedRoles={['admin']}>
                      <ControlTower />
                    </RoleRoute>
                  }
                />
                <Route
                  path="analytics"
                  element={
                    <RoleRoute allowedRoles={['admin']}>
                      <AdminAnalytics />
                    </RoleRoute>
                  }
                />
              </Route>

            </Route>

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </Suspense>

      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;