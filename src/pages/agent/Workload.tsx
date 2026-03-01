import React, { useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { ApplicationTable } from '../../components/tables/ApplicationTable';
import { applicationService } from '../../modules/application/applicationService';
import { useApi } from '../../hooks/useApi';
import type { Application } from '../../modules/application/types';

export const AgentWorkload: React.FC = () => {
  const {
    data: workload,
    request: fetchWorkload,
  } = useApi<Application[], []>(applicationService.getAgentWorkload);

  useEffect(() => {
    fetchWorkload();
  }, [fetchWorkload]);

  const handleView = (app: Application) => {
    console.log('Open details for:', app.id);
    // Later → navigate(`/agent/applications/${app.id}`)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Active Workload
          </h2>
          <p className="text-slate-500 text-sm">
            Review and update customer documentation.
          </p>
        </div>
      </div>

      <Card>
        <ApplicationTable
          data={workload ?? []}
          onAction={handleView}
          showAgent={false}
        />
      </Card>
    </div>
  );
};