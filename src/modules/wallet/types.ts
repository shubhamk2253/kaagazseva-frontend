//////////////////////////////////////////////////////
// TRANSACTION TYPES
//////////////////////////////////////////////////////

export type TransactionType =
  | 'CREDIT'
  | 'DEBIT'
  | 'PAYOUT'
  | 'REFUND';

export type TransactionStatus =
  | 'PENDING'
  | 'SUCCESS'
  | 'FAILED';

//////////////////////////////////////////////////////
// TRANSACTION MODEL
//////////////////////////////////////////////////////

export interface Transaction {
  id: string;

  amount: number;

  type: TransactionType;

  status: TransactionStatus;

  description?: string;

  referenceId?: string; // linked Application ID

  createdAt: string;
}

//////////////////////////////////////////////////////
// WALLET MODEL
//////////////////////////////////////////////////////

export interface Wallet {
  id: string;

  userId: string;

  balance: number;

  totalEarned: number;

  updatedAt: string;

  transactions: Transaction[];
}

//////////////////////////////////////////////////////
// PAYOUT REQUEST DTO
//////////////////////////////////////////////////////

export interface PayoutRequestDTO {
  amount: number;

  upiId?: string;

  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    accountHolder: string;
  };
}