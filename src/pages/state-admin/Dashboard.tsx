import React, { useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { ApplicationTable } from '@/components/tables/ApplicationTable';
import { applicationService } from '@/modules/application/applicationService';
import { useApi } from '@/hooks/useApi';
import type { Application } from '@/modules/application/types';

const StateAdminDashboard: React.FC = () => {

  //////////////////////////////////////////////////////
  // FETCH APPLICATIONS
  //////////////////////////////////////////////////////

  const { data, request: fetchApps } =
    useApi<Application[], []>(
      applicationService.getAgentWorkload
    );

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const applications = data ?? [];

  //////////////////////////////////////////////////////
  // KPI CALCULATIONS
  //////////////////////////////////////////////////////

  const totalApplications = applications.length;

  const activeCases = useMemo(() =>
    applications.filter(
      (app) =>
        app.status === 'ASSIGNED' ||
        app.status === 'UNDER_REVIEW' ||
        app.status === 'DOCUMENT_REQUIRED'
    ).length,
  [applications]);

  const completedCases = useMemo(() =>
    applications.filter(
      (app) => app.status === 'COMPLETED'
    ).length,
  [applications]);

  const pendingPayment = useMemo(() =>
    applications.filter(
      (app) => app.status === 'PENDING_PAYMENT'
    ).length,
  [applications]);

  //////////////////////////////////////////////////////
  // RECENT APPLICATIONS
  //////////////////////////////////////////////////////

  const recentApps = applications.slice(0, 10);

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (

    <div className="space-y-12">

      {/* ================= HEADER ================= */}

      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          State Administration Panel
        </h1>

        <p className="text-slate-500 mt-2 text-base">
          Monitor district operations, agent execution, and service completion across the state.
        </p>
      </div>

      {/* ================= KPI SECTION ================= */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        <Card>

          <div className="space-y-2">

            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Total Applications
            </p>

            <h3 className="text-4xl font-black text-slate-900">
              {totalApplications}
            </h3>

          </div>

        </Card>

        <Card>

          <div className="space-y-2">

            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Active Cases
            </p>

            <h3 className="text-4xl font-black text-blue-600">
              {activeCases}
            </h3>

          </div>

        </Card>

        <Card>

          <div className="space-y-2">

            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Completed
            </p>

            <h3 className="text-4xl font-black text-emerald-600">
              {completedCases}
            </h3>

          </div>

        </Card>

        <Card>

          <div className="space-y-2">

            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Pending Payment
            </p>

            <h3 className="text-4xl font-black text-amber-600">
              {pendingPayment}
            </h3>

          </div>

        </Card>

      </div>

      {/* ================= APPLICATION MONITOR ================= */}

      <Card title="State Application Monitoring">

        <ApplicationTable
          data={recentApps}
          showAgent
        />

      </Card>

    </div>

  );

};

export default StateAdminDashboard;