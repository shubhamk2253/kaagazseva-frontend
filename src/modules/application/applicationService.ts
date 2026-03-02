import apiClient from '../../config/apiClient';
import type { Application, CreateApplicationDTO } from './types';

export const applicationService = {
  // Customer: Submit a new request
  create: async (data: CreateApplicationDTO): Promise<Application> => {
    const response = await apiClient.post('/applications', data);
    return response.data;
  },

  // Generic: Get application by ID
  getById: async (id: string): Promise<Application> => {
    const response = await apiClient.get(`/applications/${id}`);
    return response.data;
  },

  // Customer: View their own history
  getCustomerApplications: async (): Promise<Application[]> => {
  const response = await apiClient.get('/applications/me');
  return response.data;
},

  // Agent: View assigned work
  getAgentWorkload: async (): Promise<Application[]> => {
    const response = await apiClient.get('/applications/workload');
    return response.data;
  },

  // Admin: View everything in the National Infrastructure
  getAllApplications: async (): Promise<Application[]> => {
    const response = await apiClient.get('/admin/applications');
    return response.data;
  }
};