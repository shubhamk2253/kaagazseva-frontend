export type TransactionType = 'credit' | 'debit' | 'payout' | 'refund';
export type TransactionStatus = 'PENDING_PAYMENT' | 'success' | 'failed';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
  reference_id?: string; // Links to an Application ID
  createdAt: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  total_earned: number;
  last_updated: string;
  transactions: Transaction[];
}

export interface PayoutRequestDTO {
  amount: number;
  upi_id?: string;
  bank_details?: any;
}