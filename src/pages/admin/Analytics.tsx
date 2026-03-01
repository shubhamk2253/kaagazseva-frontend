import React, { useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { useApi } from '../../hooks/useApi';
import { adminService } from '../../modules/admin/adminService';
import { PerformanceChart } from '../../components/charts/PerformanceChart';
import { RevenueChart } from '../../components/charts/RevenueChart';
import type { DetailedAnalytics } from '../../modules/admin/types';

export const AdminAnalytics: React.FC = () => {
  const {
    data: analytics,
    request: fetchAnalytics,
  } = useApi<DetailedAnalytics, []>(
    adminService.getDetailedAnalytics
  );

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900">
          Marketplace Intelligence
        </h2>
        <p className="text-slate-500">
          Deep-dive into service velocity and regional growth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Popularity */}
        <Card title="Volume by Service Category">
          <PerformanceChart
            data={analytics?.service_distribution ?? []}
          />
        </Card>

        {/* Financial Velocity */}
        <Card title="Monthly Revenue Growth">
          <RevenueChart
            data={analytics?.monthly_growth ?? []}
          />
        </Card>
      </div>

      {/* Regional Overview */}
      <Card title="Regional Performance (State-wise)">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {analytics?.regions?.map((region) => (
            <div
              key={region.name}
              className="p-4 bg-slate-50 rounded-xl border border-slate-100"
            >
              <p className="text-xs font-bold text-slate-400 uppercase">
                {region.name}
              </p>

              <p className="text-xl font-black text-slate-900">
                {region.total_apps}
              </p>

              <div className="w-full bg-slate-200 h-1 mt-2 rounded-full">
                <div
                  className="bg-blue-600 h-1 rounded-full"
                  style={{ width: `${region.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};