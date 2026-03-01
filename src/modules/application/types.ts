import type { User } from '../auth/types';

export type ApplicationStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'rejected';

/* ===============================
   Core Application Model
================================= */

export interface Application {
  id: string;
  service_type: string;
  status: ApplicationStatus;
  customer_id: string;
  agent_id?: string;
  pincode: string;
  documents: string[]; // S3 URLs
  created_at: string;
  updated_at: string;
  customer?: User;
  agent?: User;
}

export interface CreateApplicationDTO {
  service_type: string;
  pincode: string;
  documents: string[];
}

/* ===============================
   Agent Dashboard Summary
================================= */

export interface AgentDashboardStats {
  pending_tasks: number;
  completed_today: number;

  performance_data: {
    name: string;
    received: number;
    completed: number;
  }[];

  recent_apps: {
    id: string;
    service_type: string;
    status: ApplicationStatus;
  }[];
}