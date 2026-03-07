import apiClient from '@/config/apiClient';

export interface State {
  id: string;
  name: string;
  code: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface RequiredDocument {
  id: string;
  documentName: string;
  isMandatory: boolean;
  order: number;
}

export const publicService = {

  //////////////////////////////////////////////////////
  // GET STATES
  //////////////////////////////////////////////////////

  async getStates(): Promise<State[]> {

    const response = await apiClient.get('/public/states');

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch states');
    }

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // GET SERVICES BY STATE
  //////////////////////////////////////////////////////

  async getServices(stateId: string): Promise<Service[]> {

    const response = await apiClient.get(`/public/services?stateId=${stateId}`);

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch services');
    }

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // GET REQUIRED DOCUMENTS
  //////////////////////////////////////////////////////

  async getServiceDocuments(serviceId: string): Promise<RequiredDocument[]> {

    const response = await apiClient.get(`/public/services/${serviceId}/documents`);

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Failed to fetch documents');
    }

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // VALIDATE PINCODE
  //////////////////////////////////////////////////////

  async validatePincode(pincode: string) {

    const response = await apiClient.post('/public/pincode', {
      pincode
    });

    if (!response.data?.success) {
      throw new Error(response.data?.message || 'Invalid pincode');
    }

    return response.data.data;

  },

};