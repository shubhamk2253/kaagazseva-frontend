import React, { useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { ApplicationTable } from '../../components/tables/ApplicationTable';
import { applicationService } from '../../modules/application/applicationService';
import { useApi } from '../../hooks/useApi';

export const CustomerApplications: React.FC = () => {
  const { data, request: fetchApps } = useApi(applicationService.getCustomerApplications);
  useEffect(() => { fetchApps(); }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-900">All Applications</h2>
      <Card>
        <ApplicationTable data={data || []} showAgent />
      </Card>
    </div>
  );
};