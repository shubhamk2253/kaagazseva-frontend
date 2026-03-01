import React, { useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { useApi } from '../../hooks/useApi';
import { adminService } from '../../modules/admin/adminService';

const ControlTower: React.FC = () => {
  const { data: towerData, request: fetchTower } =
    useApi(adminService.getControlTowerData);

  useEffect(() => {
    fetchTower();
  }, [fetchTower]);

  const statuses = [
    {
      label: 'Pending Assignment',
      count: towerData?.pending || 0,
      color: 'bg-amber-500',
    },
    {
      label: 'In Review',
      count: towerData?.review || 0,
      color: 'bg-blue-500',
    },
    {
      label: 'Correction Required',
      count: towerData?.correction || 0,
      color: 'bg-red-500',
    },
    {
      label: 'Completed',
      count: towerData?.completed || 0,
      color: 'bg-emerald-500',
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
        Operational Control
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statuses.map((s) => (
          <Card key={s.label} className="border-t-4 border-t-slate-100">
            <div className={`w-3 h-3 rounded-full ${s.color} mb-3`} />
            <p className="text-slate-500 text-sm font-medium">{s.label}</p>
            <h4 className="text-2xl font-black text-slate-900">
              {s.count}
            </h4>
          </Card>
        ))}
      </div>

      <Card title="Live Assignment Queue">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-slate-100 rounded" />
          <div className="h-10 bg-slate-100 rounded" />
          <div className="h-10 bg-slate-100 rounded" />
        </div>
        <p className="text-center text-xs text-slate-400 mt-4 italic">
          Fetching real-time updates...
        </p>
      </Card>
    </div>
  );
};

export default ControlTower;