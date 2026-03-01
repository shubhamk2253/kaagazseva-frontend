import apiClient from '../../config/apiClient';
import type {
  SystemStats,
  RevenueData,
  PerformanceMetric,
  DetailedAnalytics,
  ControlTowerData,
  AdminTicket
} from './types';
import type { User } from '../auth/types';

export const adminService = {

  /* ================= Dashboard ================= */

  getDashboardStats: async (): Promise<SystemStats> => {
    const res = await apiClient.get('/admin/stats/summary');
    return res.data;
  },

  getRevenueData: async (days: number = 30): Promise<RevenueData[]> => {
    const res = await apiClient.get(`/admin/stats/revenue?days=${days}`);
    return res.data;
  },

  getPerformanceMetrics: async (days: number = 30): Promise<PerformanceMetric[]> => {
    const res = await apiClient.get(`/admin/stats/performance?days=${days}`);
    return res.data;
  },

  /* ================= Analytics ================= */

  getDetailedAnalytics: async (): Promise<DetailedAnalytics> => {
    const res = await apiClient.get('/admin/analytics/detailed');
    return res.data;
  },

  getStatePerformance: async () => {
    const res = await apiClient.get('/admin/stats/geography');
    return res.data;
  },

  /* ================= Control Tower ================= */

  getControlTowerData: async (): Promise<ControlTowerData> => {
    const res = await apiClient.get('/admin/control-tower');
    return res.data;
  },

  /* ================= Agents ================= */

  getAllAgents: async (): Promise<User[]> => {
    const res = await apiClient.get('/admin/agents');
    return res.data;
  },

  updateUserStatus: async (
    userId: string,
    status: 'active' | 'suspended'
  ): Promise<{ success: boolean }> => {
    const res = await apiClient.patch(
      `/admin/users/${userId}/status`,
      { status }
    );
    return res.data;
  },

  /* ================= Tickets ================= */

  getAllTickets: async (): Promise<AdminTicket[]> => {
    const res = await apiClient.get('/admin/tickets');
    return res.data;
  }

};