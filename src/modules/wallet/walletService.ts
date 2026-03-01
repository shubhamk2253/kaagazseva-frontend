import apiClient from '../../config/apiClient';
import type { Wallet, Transaction, PayoutRequestDTO } from './types';

export const walletService = {
  // Agent: Get current balance and transaction history
  getWalletData: async (): Promise<Wallet> => {
    const response = await apiClient.get('/wallet/me');
    return response.data;
  },

  // Agent: Request a withdrawal to bank/UPI
  requestPayout: async (data: PayoutRequestDTO): Promise<{ message: string }> => {
    const response = await apiClient.post('/wallet/payout', data);
    return response.data;
  },

  // Admin: View all payout requests in the National System
  getPendingPayouts: async (): Promise<Transaction[]> => {
    const response = await apiClient.get('/admin/payouts/pending');
    return response.data;
  },

  // Admin: Approve an Agent's payout
  approvePayout: async (transactionId: string): Promise<{ success: boolean }> => {
    const response = await apiClient.post(`/admin/payouts/${transactionId}/approve`);
    return response.data;
  }
};