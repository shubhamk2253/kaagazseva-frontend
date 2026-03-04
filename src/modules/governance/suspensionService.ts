import apiClient from '@/config/apiClient';

export interface SuspensionCase {
  id: string;
  userId: string;
  reason: string;
  level: number;
  status:
    | 'UNDER_REVIEW'
    | 'ESCALATED'
    | 'AUTO_ESCALATED'
    | 'CONFIRMED'
    | 'REJECTED';
  createdAt: string;
}

export const suspensionService = {

  //////////////////////////////////////////////////////
  // GET ALL CASES
  //////////////////////////////////////////////////////

  getCases: async (): Promise<SuspensionCase[]> => {

    const response = await apiClient.get('/suspensions');

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // INITIATE SUSPENSION
  //////////////////////////////////////////////////////

  initiate: async (
    userId: string,
    reason: string
  ) => {

    const response = await apiClient.post(
      '/suspensions/initiate',
      { userId, reason }
    );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // REVIEW CASE
  //////////////////////////////////////////////////////

  review: async (
    caseId: string,
    decision: 'CONFIRMED' | 'REJECTED'
  ) => {

    const response = await apiClient.post(
      `/suspensions/${caseId}/review`,
      { decision }
    );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // ESCALATE CASE
  //////////////////////////////////////////////////////

  escalate: async (caseId: string) => {

    const response = await apiClient.post(
      `/suspensions/${caseId}/escalate`
    );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // APPEAL (AGENT)
  //////////////////////////////////////////////////////

  appeal: async (
    caseId: string,
    message: string
  ) => {

    const response = await apiClient.post(
      `/suspensions/${caseId}/appeal`,
      { message }
    );

    return response.data.data;

  }

};