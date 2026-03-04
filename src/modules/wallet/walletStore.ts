import { create } from 'zustand';
import type { Wallet, Transaction } from './types';

interface WalletState {
  balance: number;
  totalEarned: number;
  transactions: Transaction[];
  isLoading: boolean;

  // Actions
  setWalletData: (data: Wallet) => void;
  addTransactionLocal: (tx: Transaction) => void;
  setLoading: (status: boolean) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  balance: 0,
  totalEarned: 0,
  transactions: [],
  isLoading: false,

  //////////////////////////////////////////////////////
  // SET WALLET DATA FROM BACKEND
  //////////////////////////////////////////////////////

  setWalletData: (data) =>
    set({
      balance: data.balance,
      totalEarned: data.totalEarned,
      transactions: data.transactions ?? [],
    }),

  //////////////////////////////////////////////////////
  // ADD TRANSACTION (LOCAL UPDATE)
  //////////////////////////////////////////////////////

  addTransactionLocal: (tx) =>
    set((state) => {
      let newBalance = state.balance;

      if (tx.type === 'CREDIT') {
        newBalance += tx.amount;
      }

      if (tx.type === 'DEBIT' || tx.type === 'PAYOUT' || tx.type === 'REFUND') {
        newBalance -= tx.amount;
      }

      return {
        transactions: [tx, ...state.transactions],
        balance: newBalance,
      };
    }),

  //////////////////////////////////////////////////////
  // LOADING STATE
  //////////////////////////////////////////////////////

  setLoading: (status) =>
    set({
      isLoading: status,
    }),
}));