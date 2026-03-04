import apiClient from '../../config/apiClient';
import type { Application, CreateApplicationDTO } from './types';

export const applicationService = {

//////////////////////////////////////////////////////
// STEP 1 — CREATE DRAFT
//////////////////////////////////////////////////////

create: async (data: CreateApplicationDTO): Promise<Application> => {

const payload = {
  serviceType: data.serviceType,
  state: data.state,
  district: data.district,
  govtFee: data.govtFee,
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
// STEP 2 — UPLOAD DOCUMENTS
//////////////////////////////////////////////////////

if (data.documents && data.documents.length > 0) {

  const formData = new FormData();

  data.documents.forEach((file: File) => {
    formData.append('documents', file);
  });

  await apiClient.post(
    `/applications/${application.id}/documents`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
}

return application;

},

//////////////////////////////////////////////////////
// GET BY ID
//////////////////////////////////////////////////////

getById: async (id: string): Promise<Application> => {

const response = await apiClient.get(
  `/applications/${id}`
);

return response.data.data;

},

//////////////////////////////////////////////////////
// CUSTOMER APPLICATIONS
//////////////////////////////////////////////////////

getCustomerApplications: async (): Promise<Application[]> => {

const response = await apiClient.get(
  '/applications/me'
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
// STATUS UPDATE
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