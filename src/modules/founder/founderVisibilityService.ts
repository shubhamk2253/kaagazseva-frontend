import apiClient from '@/config/apiClient';

export interface FounderOverview {

  activeCases: number;
  confirmedCases: number;
  autoEscalations: number;

  frozenWalletCount: number;
  totalFrozenBalance: number;

  casesByLevel: {
    level: number;
    _count: number;
  }[];

  systemStatus: {
    paymentsFrozen: boolean;
    refundsFrozen: boolean;
    withdrawalsFrozen: boolean;
  };

}

export const founderVisibilityService = {

  //////////////////////////////////////////////////////
  // GET OVERVIEW
  //////////////////////////////////////////////////////

  getOverview: async (): Promise<FounderOverview> => {

    const response = await apiClient.get(
      '/founder/visibility'
    );

    return response.data;

  }

};