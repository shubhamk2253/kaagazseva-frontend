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

export type ServiceMode =
  | 'DIGITAL'
  | 'DOORSTEP';

/* ===================================
CORE APPLICATION MODEL
=================================== */

export interface Application {
  id: string;

  serviceId?: string;
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

  pricingSnapshot?: unknown;

  documents?: unknown[];

  createdAt: string;
  updatedAt: string;

  customerId?: string;
  agentId?: string;

  customer?: User;
  agent?: User;
}

/* ===================================
CREATE APPLICATION DTO
=================================== */

export interface CreateApplicationDTO {

  serviceId: string;
  stateId: string;
  pincode: string;

  mode: ServiceMode;

  customerLat?: number;
  customerLng?: number;

  deliveryAddress?: string;

  documents?: File[];

}

/* ===================================
AGENT DASHBOARD SUMMARY
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