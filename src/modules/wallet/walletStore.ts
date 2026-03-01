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

  setWalletData: (data) => set({ 
    balance: data.balance, 
    totalEarned: data.total_earned,
    transactions: data.transactions 
  }),

  // Used for real-time updates when an action occurs
  addTransactionLocal: (tx) => set((state) => ({
    transactions: [tx, ...state.transactions],
    balance: tx.type === 'credit' ? state.balance + tx.amount : state.balance - tx.amount
  })),

  setLoading: (status) => set({ isLoading: status })
}));