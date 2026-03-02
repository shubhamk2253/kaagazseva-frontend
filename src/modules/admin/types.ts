import type { User } from '../auth/types';

/* ===============================
   Dashboard Summary
================================= */
export interface SystemStats {
  total_revenue: number;
  agent_count: number;
  app_count: number;
  success_rate: number;
  pending_tickets: number;
}

/* ===============================
   Revenue Chart
================================= */
export interface RevenueData {
  date: string;
  revenue: number;
}

/* ===============================
   Performance Metrics
================================= */
export interface PerformanceMetric {
  date: string;
  count: number;
  revenue: number;
}

/* ===============================
   Detailed Analytics
================================= */
export interface DetailedAnalytics {
  service_distribution: {
    name: string;
    received: number;
    completed: number;
  }[];

  monthly_growth: {
    date: string;
    revenue: number;
  }[];

  regions: {
    name: string;
    total_apps: number;
    percentage: number;
  }[];
}

/* ===============================
   Control Tower
================================= */
export interface ControlTowerData {
  pending: number;
  review: number;
  correction: number;
  completed: number;
}

/* ===============================
   Tickets
================================= */
export interface AdminTicket {
  id: string;
  user_name: string;
  subject: string;
  status: string;
  createdAt: string;
}