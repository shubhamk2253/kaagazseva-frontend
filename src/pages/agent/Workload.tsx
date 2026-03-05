import React, { useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { ApplicationTable } from '../../components/tables/ApplicationTable';
import { applicationService } from '../../modules/application/applicationService';
import { useApi } from '../../hooks/useApi';
import type { Application } from '../../modules/application/types';

/**
 * KAAGAZSEVA - Agent Workload Page
 * Shows assigned applications for agents
 */

const AgentWorkload: React.FC = () => {

  const {
    data: workload,
    request: fetchWorkload,
  } = useApi<Application[], []>(
    applicationService.getAgentWorkload
  );

  //////////////////////////////////////////////////////
  // LOAD WORKLOAD
  //////////////////////////////////////////////////////

  useEffect(() => {
    fetchWorkload();
  }, [fetchWorkload]);

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

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
          showAgent={false}
        />

      </Card>

    </div>

  );

};

export default AgentWorkload;