import React, { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { adminService } from '@/modules/admin/adminService';
import { useApi } from '@/hooks/useApi';
import { formatCurrency } from '@/utils/formatters';
import type { SystemStats, RevenueData } from '@/modules/admin/types';

const AdminDashboard: React.FC = () => {
  const {
    data: stats,
    request: fetchStats,
  } = useApi<SystemStats, []>(
    adminService.getDashboardStats
  );

  const {
    data: chartData,
    request: fetchChart,
  } = useApi<RevenueData[], [number]>(
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
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black text-slate-900">
          Kaagaz<span className="text-blue-600">Seva</span> Admin
        </h1>
        <p className="text-slate-500">
          System-wide performance overview.
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-600 text-white border-none shadow-xl">
          <p className="text-xs uppercase tracking-widest">
            Total GMV
          </p>
          <h3 className="text-3xl font-black mt-2">
            {formatCurrency(safeStats.total_revenue)}
          </h3>
        </Card>

        <Card title="Active Agents">
          <h3 className="text-3xl font-black">
            {safeStats.agent_count}
          </h3>
        </Card>

        <Card title="Total Applications">
          <h3 className="text-3xl font-black">
            {safeStats.app_count}
          </h3>
        </Card>

        <Card title="Pending Tickets">
          <h3 className="text-3xl font-black text-indigo-600">
            {safeStats.pending_tickets}
          </h3>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card title="Revenue Velocity">
        <RevenueChart data={chartData ?? []} />
      </Card>
    </div>
  );
};

export default AdminDashboard;