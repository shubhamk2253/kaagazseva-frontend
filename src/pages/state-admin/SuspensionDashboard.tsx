import React, { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { useApi } from '@/hooks/useApi';
import { suspensionService } from '@/modules/governance/suspensionService';
import { SuspensionTable } from '@/components/tables/SuspensionTable';
import type { SuspensionCase } from '@/modules/governance/suspensionService';

const SuspensionDashboard: React.FC = () => {

  const { data, request } =
    useApi<SuspensionCase[], []>(
      suspensionService.getCases
    );

  useEffect(() => {
    request();
  }, [request]);

  const cases = data ?? [];

  return (

    <div className="space-y-10">

      <div>
        <h1 className="text-4xl font-black text-slate-900">
          Suspension Monitoring
        </h1>
        <p className="text-slate-500 mt-2">
          Monitor fraud and policy violations.
        </p>
      </div>

      <Card title="Active Suspension Cases">

        <SuspensionTable data={cases} />

      </Card>

    </div>

  );

};

export default SuspensionDashboard;