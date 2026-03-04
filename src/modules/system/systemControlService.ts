import apiClient from '@/config/apiClient';

export interface SystemStatus {
  paymentsFrozen: boolean;
  refundsFrozen: boolean;
  withdrawalsFrozen: boolean;
  reason?: string;
  activatedAt?: string;
}

export const systemControlService = {

  //////////////////////////////////////////////////////
  // GET SYSTEM STATUS
  //////////////////////////////////////////////////////

  getStatus: async (): Promise<SystemStatus> => {

    const response = await apiClient.get(
      '/system-control/system-status'
    );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // FREEZE PAYMENTS
  //////////////////////////////////////////////////////

  freezePayments: async (reason: string) => {

    const response = await apiClient.post(
      '/system-control/freeze/payments',
      { reason }
    );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // FREEZE REFUNDS
  //////////////////////////////////////////////////////

  freezeRefunds: async (reason: string) => {

    const response = await apiClient.post(
      '/system-control/freeze/refunds',
      { reason }
    );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // FREEZE WITHDRAWALS
  //////////////////////////////////////////////////////

  freezeWithdrawals: async (reason: string) => {

    const response = await apiClient.post(
      '/system-control/freeze/withdrawals',
      { reason }
    );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // UNFREEZE SYSTEM
  //////////////////////////////////////////////////////

  unfreeze: async () => {

    const response = await apiClient.post(
      '/system-control/unfreeze'
    );

    return response.data.data;

  }

};