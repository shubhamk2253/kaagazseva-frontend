import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import apiClient from '@/config/apiClient';

interface PaymentState {
  currentApp: any | null;
  loading: boolean;
  error: string | null;
  isProcessing: boolean;

  fetchApplication: (appId: string) => Promise<void>;
  initiateOrder: (appId: string) => Promise<any>;
  verifyPayment: (payload: any) => Promise<boolean>;
  resetStore: () => void;
}

export const usePaymentStore = create<PaymentState>()(
  devtools((set) => ({

    currentApp: null,
    loading: false,
    error: null,
    isProcessing: false,

    //////////////////////////////////////////////////////
    // FETCH APPLICATION
    //////////////////////////////////////////////////////

    fetchApplication: async (appId: string) => {

      set({ loading: true, error: null });

      try {

        const response = await apiClient.get(`/applications/${appId}`);

        set({
          currentApp: response.data.data,
          loading: false
        });

      } catch (err: any) {

        set({
          error:
            err.response?.data?.message ||
            'Failed to load application details',
          loading: false
        });

      }

    },

    //////////////////////////////////////////////////////
    // CREATE PAYMENT ORDER
    //////////////////////////////////////////////////////

    initiateOrder: async (appId: string) => {

      set({ isProcessing: true, error: null });

      try {

        const response = await apiClient.post(
          '/payments/create-order',
          { applicationId: appId }
        );

        set({ isProcessing: false });

        return response.data.data;

      } catch (err: any) {

        set({
          error:
            err.response?.data?.message ||
            'Payment initialization failed',
          isProcessing: false
        });

        throw err;

      }

    },

    //////////////////////////////////////////////////////
    // VERIFY PAYMENT
    //////////////////////////////////////////////////////

    verifyPayment: async (payload: any) => {

      try {

        const response = await apiClient.post(
          '/payments/verify',
          payload
        );

        set((state) => ({
          isProcessing: false,
          currentApp: state.currentApp
            ? {
                ...state.currentApp,
                status: 'SUBMITTED',
                paymentStatus: 'SUCCESS'
              }
            : null
        }));

        return true;

      } catch (err: any) {

        set({
          error:
            err.response?.data?.message ||
            'Payment verification failed',
          isProcessing: false
        });

        return false;

      }

    },

    //////////////////////////////////////////////////////
    // RESET STORE
    //////////////////////////////////////////////////////

    resetStore: () =>
      set({
        currentApp: null,
        error: null,
        loading: false,
        isProcessing: false
      }),

  }))
);