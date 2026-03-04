import apiClient from '../../config/apiClient';
import type { Wallet, Transaction, PayoutRequestDTO } from './types';

export const walletService = {

  //////////////////////////////////////////////////////
  // AGENT — GET WALLET DATA
  // GET /wallet/me
  //////////////////////////////////////////////////////

  getWalletData: async (): Promise<Wallet> => {
    const response = await apiClient.get('/wallet/me');

    return response.data.data;
  },

  //////////////////////////////////////////////////////
  // AGENT — REQUEST PAYOUT
  // POST /wallet/payout
  //////////////////////////////////////////////////////

  requestPayout: async (
    data: PayoutRequestDTO
  ): Promise<{ message: string }> => {

    const response = await apiClient.post(
      '/wallet/payout',
      data
    );

    return response.data;
  },

  //////////////////////////////////////////////////////
  // ADMIN — VIEW PENDING PAYOUTS
  // GET /admin/payouts/pending
  //////////////////////////////////////////////////////

  getPendingPayouts: async (): Promise<Transaction[]> => {

    const response = await apiClient.get(
      '/admin/payouts/pending'
    );

    return response.data.data;
  },

  //////////////////////////////////////////////////////
  // ADMIN — APPROVE PAYOUT
  // POST /admin/payouts/:id/approve
  //////////////////////////////////////////////////////

  approvePayout: async (
    transactionId: string
  ): Promise<{ success: boolean }> => {

    const response = await apiClient.post(
      `/admin/payouts/${transactionId}/approve`
    );

    return response.data;
  },

};