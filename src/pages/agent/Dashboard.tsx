import React, { useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { PerformanceChart } from '@/components/charts/PerformanceChart';
import { applicationService } from '@/modules/application/applicationService';
import { walletService } from '@/modules/wallet/walletService';
import { useApi } from '@/hooks/useApi';
import { formatCurrency } from '@/utils/formatters';
import type { Application } from '@/modules/application/types';
import type { Wallet } from '@/modules/wallet/types';

const AgentDashboard: React.FC = () => {
  const {
    data: workload,
    request: fetchWorkload,
  } = useApi<Application[], []>(
    applicationService.getAgentWorkload
  );

  const {
    data: wallet,
    request: fetchWallet,
  } = useApi<Wallet, []>(
    walletService.getWalletData
  );

  useEffect(() => {
    fetchWorkload();
    fetchWallet();
  }, [fetchWorkload, fetchWallet]);

  const safeWorkload = workload ?? [];

  const pendingTasks = useMemo(
    () =>
      safeWorkload.filter(
        (app) => app.status === 'pending'
      ).length,
    [safeWorkload]
  );

  const completedToday = useMemo(() => {
    const today = new Date().toDateString();

    return safeWorkload.filter((app) => {
      if (app.status !== 'completed') return false;
      return (
        new Date(app.updated_at).toDateString() === today
      );
    }).length;
  }, [safeWorkload]);

  const performanceData = useMemo(() => {
    const map: Record<
      string,
      { name: string; received: number; completed: number }
    > = {};

    safeWorkload.forEach((app) => {
      const service = app.service_type;

      if (!map[service]) {
        map[service] = {
          name: service,
          received: 0,
          completed: 0,
        };
      }

      map[service].received += 1;

      if (app.status === 'completed') {
        map[service].completed += 1;
      }
    });

    return Object.values(map);
  }, [safeWorkload]);

  const recentApps = safeWorkload.slice(0, 5);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black text-slate-900">
          Agent Command Center
        </h1>
        <p className="text-slate-500">
          Manage your active workload and track commissions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900 text-white border-none">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Wallet Balance
          </p>
          <h3 className="text-3xl font-black mt-2">
            {formatCurrency(wallet?.balance ?? 0)}
          </h3>
        </Card>

        <Card title="Assigned Tasks">
          <h3 className="text-3xl font-black text-blue-600">
            {pendingTasks}
          </h3>
        </Card>

        <Card title="Completed (Today)">
          <h3 className="text-3xl font-black text-green-600">
            {completedToday}
          </h3>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Service Efficiency">
          <PerformanceChart data={performanceData} />
        </Card>

        <Card title="Recent Assignments">
          <div className="space-y-4">
            {recentApps.map((app) => (
              <div
                key={app.id}
                className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
              >
                <span className="font-medium text-sm text-slate-700">
                  {app.service_type}
                </span>
                <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded uppercase">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AgentDashboard;