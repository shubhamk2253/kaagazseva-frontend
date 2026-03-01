import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleRoute } from './RoleRoute';
import { Loader } from '@/components/ui/Loader';

/* =========================
   Public Pages
========================= */

const Login = lazy(() => import('@/pages/auth/Login'));
const VerifyOTP = lazy(() => import('@/pages/auth/VerifyOTP'));

/* =========================
   Admin Pages
========================= */

const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const ControlTower = lazy(() => import('@/pages/admin/ControlTower'));

/* =========================
   Agent Pages
========================= */

const AgentDashboard = lazy(() => import('@/pages/agent/Dashboard'));

/* =========================
   Customer Pages
========================= */

const CustomerDashboard = lazy(() => import('@/pages/customer/Dashboard'));

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* ================= PROTECTED ================= */}
        <Route element={<ProtectedRoute />}>

          {/* ---------------- ADMIN ---------------- */}
          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/control-tower"
            element={
              <RoleRoute allowedRoles={['admin']}>
                <ControlTower />
              </RoleRoute>
            }
          />

          {/* ---------------- AGENT ---------------- */}
          <Route
            path="/agent"
            element={
              <RoleRoute allowedRoles={['agent']}>
                <AgentDashboard />
              </RoleRoute>
            }
          />

          {/* ---------------- CUSTOMER ---------------- */}
          <Route
            path="/customer"
            element={
              <RoleRoute allowedRoles={['customer']}>
                <CustomerDashboard />
              </RoleRoute>
            }
          />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};