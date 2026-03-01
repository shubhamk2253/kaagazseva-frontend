import apiClient from '../../config/apiClient';
import type {
  Application,
  CreateApplicationDTO,
  AgentDashboardStats
} from './types';

export const applicationService = {
  /* ===============================
     Customer
  ================================= */

  create: async (data: CreateApplicationDTO): Promise<Application> => {
    const response = await apiClient.post('/applications', data);
    return response.data;
  },

  getById: async (id: string): Promise<Application> => {
    const response = await apiClient.get(`/applications/${id}`);
    return response.data;
  },

  getCustomerApplications: async (): Promise<Application[]> => {
    const response = await apiClient.get('/applications/my-requests');
    return response.data;
  },

  /* ===============================
     Agent
  ================================= */

  getAgentWorkload: async (): Promise<Application[]> => {
    const response = await apiClient.get('/applications/workload');
    return response.data;
  },

  // ✅ NEW — Agent Dashboard Summary
  getAgentStats: async (): Promise<AgentDashboardStats> => {
    const response = await apiClient.get('/agent/dashboard');
    return response.data;
  },

  /* ===============================
     Admin
  ================================= */

  getAllApplications: async (): Promise<Application[]> => {
    const response = await apiClient.get('/admin/applications');
    return response.data;
  }
};