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
| 'DOORSTEP'
| 'FULL';

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

documents: Record<string, unknown>;

createdAt: string;
updatedAt: string;

customerId?: string;
agentId?: string;

customer?: User;
agent?: User;
}

/* ===================================
CREATE DTO
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

documents: File[];
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