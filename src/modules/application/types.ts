import type { User } from '../auth/types';

/* ===================================
   ENUMS (Aligned with Prisma)
=================================== */

export type ApplicationStatus =
  | 'DRAFT'
  | 'PENDING_PAYMENT'
  | 'SUBMITTED'
  | 'ASSIGNED'
  | 'UNDER_REVIEW'
  | 'DOCUMENT_REQUIRED'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED';

export type ServiceMode = 'DIGITAL' | 'DOORSTEP';

/* ===================================
   Core Application Model (Backend Aligned)
=================================== */

export interface Application {
  id: string;

  serviceType: string;
  state: string;
  district: string;
  mode: ServiceMode;
  status: ApplicationStatus;

  govtFee: number;
  serviceFee: number;
  platformCommission: number;
  agentCommission: number;
  deliveryFee: number;
  totalAmount: number;

  documents: Record<string, any>;

  createdAt: string;
  updatedAt: string;

  customer?: User;
  agent?: User;
}

/* ===================================
   CREATE DTO (🔥 IMPORTANT)
=================================== */

export interface CreateApplicationDTO {
  serviceType: string;
  state: string;
  district: string;
  govtFee: number;
  mode: ServiceMode;

  customerLat?: number;
  customerLng?: number;
  deliveryAddress?: string;

  documents: File[];   // MUST be File[]
}

/* ===================================
   Agent Dashboard Summary
=================================== */

export interface AgentDashboardStats {
  pendingTasks: number;
  completedToday: number;

  performanceData: {
    name: string;
    received: number;
    completed: number;
  }[];

  recentApps: {
    id: string;
    serviceType: string;
    status: ApplicationStatus;
  }[];
}