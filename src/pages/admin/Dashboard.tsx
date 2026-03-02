import React, { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { adminService } from '@/modules/admin/adminService';
import { useApi } from '@/hooks/useApi';
import { formatCurrency } from '@/utils/formatters';
import type { SystemStats, RevenueData } from '@/modules/admin/types';

const AdminDashboard: React.FC = () => {
  const { data: stats, request: fetchStats } =
    useApi<SystemStats, []>(
      adminService.getDashboardStats
    );

  const { data: chartData, request: fetchChart } =
    useApi<RevenueData[], [number]>(
      adminService.getRevenueData
    );

  useEffect(() => {
    fetchStats();
    fetchChart(30);
  }, [fetchStats, fetchChart]);

  const safeStats = stats ?? {
    total_revenue: 0,
    agent_count: 0,
    app_count: 0,
    pending_tickets: 0,
  };

  return (
    <div className="space-y-14">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          National Operations Dashboard
        </h1>
        <p className="text-slate-500 mt-2 text-base">
          System-wide monitoring of revenue, agents, and application flow.
        </p>
      </div>

      {/* ================= KPI GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Total GMV */}
        <Card>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Total GMV
            </p>
            <h3 className="text-4xl font-black text-blue-700">
              {formatCurrency(safeStats.total_revenue)}
            </h3>
            <p className="text-sm text-slate-500">
              Gross platform transaction value
            </p>
          </div>
        </Card>

        {/* Agents */}
        <Card>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Active Agents
            </p>
            <h3 className="text-4xl font-black text-slate-900">
              {safeStats.agent_count}
            </h3>
            <p className="text-sm text-slate-500">
              Operational across districts
            </p>
          </div>
        </Card>

        {/* Applications */}
        <Card>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Total Applications
            </p>
            <h3 className="text-4xl font-black text-slate-900">
              {safeStats.app_count}
            </h3>
            <p className="text-sm text-slate-500">
              Submitted across platform
            </p>
          </div>
        </Card>

        {/* Tickets */}
        <Card>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Pending Tickets
            </p>
            <h3 className="text-4xl font-black text-amber-600">
              {safeStats.pending_tickets}
            </h3>
            <p className="text-sm text-slate-500">
              Requires administrative review
            </p>
          </div>
        </Card>

      </div>

      {/* ================= REVENUE ANALYTICS ================= */}
      <Card title="Revenue Velocity (Last 30 Days)">
        <RevenueChart data={chartData ?? []} />
      </Card>

    </div>
  );
};

export default AdminDashboard;