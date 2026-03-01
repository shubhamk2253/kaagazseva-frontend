import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ApplicationTable } from '../../components/tables/ApplicationTable';
import { applicationService } from '../../modules/application/applicationService';
import { useApi } from '../../hooks/useApi';
import type { Application } from '../../modules/application/types';

export const CustomerDashboard: React.FC = () => {
  const {
    data: apps,
    request: fetchApps,
    loading,
  } = useApi<Application[], []>(applicationService.getCustomerApplications);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  // ✅ Always work with safe array
  const allApps = apps ?? [];

  const activeApps = useMemo(
    () =>
      allApps.filter(
        (a) => a.status !== 'completed' && a.status !== 'rejected'
      ),
    [allApps]
  );

  const completedCount = useMemo(
    () => allApps.length - activeApps.length,
    [allApps, activeApps]
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Namaste!
          </h1>
          <p className="text-slate-500">
            Track your active document requests here.
          </p>
        </div>

        <Link to="/customer/apply">
          <Button
            size="lg"
            className="shadow-lg shadow-blue-200"
          >
            New Application +
          </Button>
        </Link>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-blue-600">
          <p className="text-xs font-bold text-slate-400 uppercase">
            Active Requests
          </p>
          <h3 className="text-2xl font-black text-slate-900">
            {activeApps.length}
          </h3>
        </Card>

        <Card className="border-l-4 border-green-600">
          <p className="text-xs font-bold text-slate-400 uppercase">
            Completed
          </p>
          <h3 className="text-2xl font-black text-slate-900">
            {completedCount}
          </h3>
        </Card>
      </div>

      <Card title="Recent Activity">
        <ApplicationTable
          data={allApps.slice(0, 5)}
        />

        <Link
          to="/customer/applications"
          className="block text-center mt-4 text-sm font-bold text-blue-600 hover:underline"
        >
          View All Applications
        </Link>
      </Card>
    </div>
  );
};