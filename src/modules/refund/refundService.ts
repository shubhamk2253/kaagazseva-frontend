import apiClient from '@/config/apiClient';

//////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////

export interface RefundRequest {
  id: string;
  applicationId: string;
  amount: number;
  reason: string;
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'PROCESSED';
  createdAt: string;
}

export interface ReviewRefundDTO {
  decision: 'APPROVED' | 'REJECTED';
}

//////////////////////////////////////////////////////
// SERVICE
//////////////////////////////////////////////////////

export const refundService = {

  //////////////////////////////////////////////////////
  // CUSTOMER — REQUEST REFUND
  // POST /refunds/request
  //////////////////////////////////////////////////////

  requestRefund: async (
    applicationId: string,
    reason: string
  ): Promise<RefundRequest> => {

    const response = await apiClient.post(
      '/refunds/request',
      {
        applicationId,
        reason,
      }
    );

    return response.data.data;
  },

  //////////////////////////////////////////////////////
  // ADMIN — GET ALL REFUND REQUESTS
  // GET /refunds
  //////////////////////////////////////////////////////

  getRefunds: async (): Promise<RefundRequest[]> => {

    const response = await apiClient.get(
      '/refunds'
    );

    return response.data.data ?? [];
  },

  //////////////////////////////////////////////////////
  // ADMIN — REVIEW REFUND
  // POST /refunds/:id/review
  //////////////////////////////////////////////////////

  reviewRefund: async (
    id: string,
    decision: 'APPROVED' | 'REJECTED'
  ): Promise<RefundRequest> => {

    const response = await apiClient.post(
      `/refunds/${id}/review`,
      { decision }
    );

    return response.data.data;
  },

  //////////////////////////////////////////////////////
  // ADMIN — PROCESS REFUND
  // POST /refunds/:id/process
  //////////////////////////////////////////////////////

  processRefund: async (
    id: string
  ): Promise<RefundRequest> => {

    const response = await apiClient.post(
      `/refunds/${id}/process`
    );

    return response.data.data;
  },

};