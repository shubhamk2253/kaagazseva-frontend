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
    loading: loadingWorkload,
    request: fetchWorkload,
  } = useApi<Application[], []>(
    applicationService.getAgentWorkload
  );

  const {
    data: wallet,
    loading: loadingWallet,
    request: fetchWallet,
  } = useApi<Wallet, []>(
    walletService.getWalletData
  );

  //////////////////////////////////////////////////////
  // INITIAL LOAD
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchWorkload();
    fetchWallet();

  }, []);

  const safeWorkload = workload ?? [];

  //////////////////////////////////////////////////////
  // ASSIGNED TASKS
  //////////////////////////////////////////////////////

  const pendingTasks = useMemo(() =>
    safeWorkload.filter(
      (app) =>
        app.status === 'ASSIGNED' ||
        app.status === 'UNDER_REVIEW' ||
        app.status === 'DOCUMENT_REQUIRED'
    ).length,
  [safeWorkload]);

  //////////////////////////////////////////////////////
  // COMPLETED TODAY
  //////////////////////////////////////////////////////

  const completedToday = useMemo(() => {

    const today = new Date().toDateString();

    return safeWorkload.filter((app) => {

      if (app.status !== 'COMPLETED') return false;

      return (
        new Date(app.updatedAt).toDateString() === today
      );

    }).length;

  }, [safeWorkload]);

  //////////////////////////////////////////////////////
  // PERFORMANCE DATA
  //////////////////////////////////////////////////////

  const performanceData = useMemo(() => {

    const map: Record<
      string,
      { name: string; received: number; completed: number }
    > = {};

    safeWorkload.forEach((app) => {

      const service = app.serviceType;

      if (!map[service]) {
        map[service] = {
          name: service,
          received: 0,
          completed: 0,
        };
      }

      map[service].received += 1;

      if (app.status === 'COMPLETED') {
        map[service].completed += 1;
      }

    });

    return Object.values(map);

  }, [safeWorkload]);

  const recentApps = safeWorkload.slice(0, 5);

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  if (loadingWorkload || loadingWallet) {
    return (
      <div className="text-center text-slate-500 py-10">
        Loading agent dashboard...
      </div>
    );
  }

  return (

    <div className="space-y-12">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Agent Operations Panel
        </h1>

        <p className="text-slate-500 mt-2 text-base">
          Monitor assignments, performance, and commission flow.
        </p>

      </div>

      {/* KPI */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <Card>

          <div className="space-y-3">

            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Wallet Balance
            </p>

            <h3 className="text-4xl font-black text-blue-700">
              {formatCurrency(Number(wallet?.balance ?? 0))}
            </h3>

            <p className="text-sm text-slate-500">
              Available for withdrawal
            </p>

          </div>

        </Card>

        <Card>

          <div className="space-y-3">

            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Assigned Tasks
            </p>

            <h3 className="text-4xl font-black text-amber-600">
              {pendingTasks}
            </h3>

            <p className="text-sm text-slate-500">
              Awaiting execution
            </p>

          </div>

        </Card>

        <Card>

          <div className="space-y-3">

            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Completed Today
            </p>

            <h3 className="text-4xl font-black text-emerald-600">
              {completedToday}
            </h3>

            <p className="text-sm text-slate-500">
              Successfully delivered
            </p>

          </div>

        </Card>

      </div>

      {/* PERFORMANCE */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        <Card title="Service Performance">
          <PerformanceChart data={performanceData} />
        </Card>

        <Card title="Recent Assignments">

          <div className="space-y-4">

            {recentApps.length === 0 && (
              <p className="text-sm text-slate-500">
                No recent assignments available.
              </p>
            )}

            {recentApps.map((app) => (

              <div
                key={app.id}
                className="flex justify-between items-center px-5 py-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors"
              >

                <span className="font-semibold text-sm text-slate-800">
                  {app.serviceType}
                </span>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                    app.status === 'COMPLETED'
                      ? 'bg-emerald-100 text-emerald-700'
                      : app.status === 'ASSIGNED'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {app.status.replace('_', ' ')}
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