import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Infrastructure & Safety
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Loader } from '@/components/ui/Loader';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useAuthStore } from '@/modules/auth/authStore';

// Routes & Guards
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { RoleRoute } from '@/routes/RoleRoute';

// Layouts
import { PublicLayout } from '@/layout/PublicLayout';
import { DashboardLayout } from '@/layout/DashboardLayout';

// Pages (Use React.lazy for "A-Grade" performance)
const Home = React.lazy(() => import('@/pages/public/Home'));
const Login = React.lazy(() => import('@/pages/auth/Login').then(m => ({ default: m.Login })));
const VerifyOTP = React.lazy(() => import('@/pages/auth/VerifyOTP').then(m => ({ default: m.VerifyOTP })));
// ... (Lazy load other pages similarly)

export const App = () => {
  const isOnline = useNetworkStatus();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        {/* 1. Global Notification Layer */}
        <Toaster position="top-center" reverseOrder={false} />

        {/* 2. Real-world Stress: Offline Banner */}
        {!isOnline && (
          <div className="bg-red-600 text-white text-center py-1 text-xs font-bold sticky top-0 z-[9999]">
            ⚠️ You are offline. Changes may not be saved.
          </div>
        )}

        {/* 3. Performance: Code-splitting fallback */}
        <Suspense fallback={<Loader fullScreen />}>
          <Routes>
            {/* --- 🔓 PUBLIC AREA --- */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
            </Route>

            {/* --- 🔒 PRIVATE AREA (Protected & Guarded) --- */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              
              {/* 👤 Customer Section */}
              <Route path="/customer">
                <Route index element={<RoleRoute allowedRoles={['customer']}><CustomerDashboard /></RoleRoute>} />
                <Route path="apply" element={<RoleRoute allowedRoles={['customer']}><ApplyService /></RoleRoute>} />
                <Route path="applications" element={<RoleRoute allowedRoles={['customer']}><CustomerApplications /></RoleRoute>} />
              </Route>

              {/* 🛠️ Agent Section */}
              <Route path="/agent">
                <Route index element={<RoleRoute allowedRoles={['agent']}><AgentDashboard /></RoleRoute>} />
                <Route path="workload" element={<RoleRoute allowedRoles={['agent']}><AgentWorkload /></RoleRoute>} />
                <Route path="wallet" element={<RoleRoute allowedRoles={['agent']}><AgentWallet /></RoleRoute>} />
              </Route>

              {/* 👑 Admin Section */}
              <Route path="/admin">
                <Route index element={<RoleRoute allowedRoles={['admin']}><AdminDashboard /></RoleRoute>} />
                <Route path="control-tower" element={<RoleRoute allowedRoles={['admin']}><ControlTower /></RoleRoute>} />
                <Route path="analytics" element={<RoleRoute allowedRoles={['admin']}><AdminAnalytics /></RoleRoute>} />
              </Route>

            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};