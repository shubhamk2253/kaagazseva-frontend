import apiClient from '../../config/apiClient';
import type { Application, CreateApplicationDTO } from './types';

export const applicationService = {

  //////////////////////////////////////////////////////
  // 🚀 CREATE APPLICATION (MULTIPART FORM DATA)
  //////////////////////////////////////////////////////

  create: async (data: CreateApplicationDTO): Promise<Application> => {
    const formData = new FormData();

    formData.append('serviceType', data.serviceType);
    formData.append('state', data.state);
    formData.append('district', data.district);
    formData.append('govtFee', String(data.govtFee));
    formData.append('mode', data.mode);

    if (data.customerLat)
      formData.append('customerLat', String(data.customerLat));

    if (data.customerLng)
      formData.append('customerLng', String(data.customerLng));

    if (data.deliveryAddress)
      formData.append('deliveryAddress', data.deliveryAddress);

    // 🔥 IMPORTANT — documents must match backend field name
    data.documents.forEach((file: File) => {
      formData.append('documents', file);
    });

    const response = await apiClient.post(
      '/applications',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Backend wraps inside ApiResponse.success(...)
    return response.data.data;
  },

  //////////////////////////////////////////////////////
  // GET BY ID
  //////////////////////////////////////////////////////

  getById: async (id: string): Promise<Application> => {
    const response = await apiClient.get(`/applications/${id}`);
    return response.data.data;
  },

  //////////////////////////////////////////////////////
  // CUSTOMER: MY APPLICATIONS
  //////////////////////////////////////////////////////

  getCustomerApplications: async () => {
    const response = await apiClient.get('/applications/me');
    return response.data.data;
  },

  //////////////////////////////////////////////////////
  // AGENT WORKLOAD
  //////////////////////////////////////////////////////

  getAgentWorkload: async () => {
    const response = await apiClient.get('/applications');
    return response.data.data;
  },

  //////////////////////////////////////////////////////
  // ADMIN LIST
  //////////////////////////////////////////////////////

  getAllApplications: async () => {
    const response = await apiClient.get('/admin/applications');
    return response.data.data;
  },
};