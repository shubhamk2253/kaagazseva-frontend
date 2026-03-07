import apiClient from '../../config/apiClient';
import type { Application, CreateApplicationDTO } from './types';

export const applicationService = {

  //////////////////////////////////////////////////////
  // STEP 1 — CREATE APPLICATION DRAFT
  //////////////////////////////////////////////////////

  create: async (data: CreateApplicationDTO): Promise<Application> => {

    const payload = {
      serviceId: data.serviceId,
      stateId: data.stateId,
      pincode: data.pincode,
      mode: data.mode,
      customerLat: data.customerLat,
      customerLng: data.customerLng,
      deliveryAddress: data.deliveryAddress,
    };

    const response = await apiClient.post(
      '/applications/draft',
      payload
    );

    const application = response.data.data;

    //////////////////////////////////////////////////////
    // STEP 2 — ATTACH DOCUMENTS
    //////////////////////////////////////////////////////

    if (data.documents && data.documents.length > 0) {

      const documentsPayload = data.documents.map((file: File) => ({
        name: file.name,
        fileUrl: URL.createObjectURL(file)
      }));

      await apiClient.post(
        `/applications/${application.applicationId}/documents`,
        {
          documents: documentsPayload
        }
      );

    }

    return application;

  },

  //////////////////////////////////////////////////////
  // GET APPLICATION BY ID
  //////////////////////////////////////////////////////

  getById: async (id: string): Promise<Application> => {

    const response = await apiClient.get(
      `/applications/${id}`
    );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // CUSTOMER APPLICATION LIST
  //////////////////////////////////////////////////////

  getCustomerApplications: async (): Promise<Application[]> => {

    const response = await apiClient.get(
      '/applications'
    );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // AGENT WORKLOAD
  //////////////////////////////////////////////////////

  getAgentWorkload: async (): Promise<Application[]> => {

    const response = await apiClient.get(
      '/applications'
    );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // UPDATE APPLICATION STATUS
  //////////////////////////////////////////////////////

  updateStatus: async (
    id: string,
    status: Application['status']
  ) => {

    const response = await apiClient.patch(
      `/applications/${id}/status`,
      { status }
    );

    return response.data.data;

  },

};