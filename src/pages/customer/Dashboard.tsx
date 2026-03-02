import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ApplicationTable } from '@/components/tables/ApplicationTable';
import { applicationService } from '@/modules/application/applicationService';
import { useApi } from '@/hooks/useApi';
import type { Application } from '@/modules/application/types';

const CustomerDashboard: React.FC = () => {
  const {
    data: apps,
    request: fetchApps,
  } = useApi<Application[], []>(
    applicationService.getCustomerApplications
  );

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const allApps = apps ?? [];

  const activeApps = useMemo(
    () =>
      allApps.filter(
        (a) =>
          a.status !== 'completed' &&
          a.status !== 'rejected'
      ),
    [allApps]
  );

  const completedCount = useMemo(
    () =>
      allApps.filter(
        (a) => a.status === 'completed'
      ).length,
    [allApps]
  );

  return (
    <div className="space-y-12">

      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Citizen Dashboard
          </h1>
          <p className="text-slate-500 mt-2 text-base">
            Monitor your service applications and track execution status.
          </p>
        </div>

        <Link to="/customer/apply">
          <Button
            size="lg"
            className="rounded-2xl px-10 bg-blue-700 hover:bg-blue-800 text-white shadow-lg shadow-blue-200"
          >
            Apply for New Service
          </Button>
        </Link>
      </div>

      {/* ================= KPI SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <Card>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Active Requests
            </p>
            <h3 className="text-4xl font-black text-blue-700">
              {activeApps.length}
            </h3>
            <p className="text-sm text-slate-500">
              Currently under processing
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Completed
            </p>
            <h3 className="text-4xl font-black text-emerald-600">
              {completedCount}
            </h3>
            <p className="text-sm text-slate-500">
              Successfully delivered services
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Total Applications
            </p>
            <h3 className="text-4xl font-black text-slate-900">
              {allApps.length}
            </h3>
            <p className="text-sm text-slate-500">
              Lifetime submissions
            </p>
          </div>
        </Card>

      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <Card title="Recent Activity">
        <ApplicationTable data={allApps.slice(0, 5)} />

        <div className="mt-6 text-right">
          <Link
            to="/customer/applications"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
          >
            View All Applications →
          </Link>
        </div>
      </Card>

    </div>
  );
};

export default CustomerDashboard;