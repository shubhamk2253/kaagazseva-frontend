import React, { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { useApi } from '@/hooks/useApi';
import { founderVisibilityService } from '@/modules/founder/founderVisibilityService';
import { formatCurrency } from '@/utils/formatters';

const FounderDashboard: React.FC = () => {

  const { data, request } =
    useApi(founderVisibilityService.getOverview);

  useEffect(() => {
    request();
  }, [request]);

  if (!data) {
    return <p>Loading system metrics...</p>;
  }

  return (

    <div className="space-y-10">

      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-black text-slate-900">
          Founder Control Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          National platform monitoring and risk visibility.
        </p>
      </div>

      {/* KPI GRID */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        <Card>
          <p className="text-xs uppercase text-slate-400">
            Active Cases
          </p>
          <h3 className="text-3xl font-black">
            {data.activeCases}
          </h3>
        </Card>

        <Card>
          <p className="text-xs uppercase text-slate-400">
            Confirmed Suspensions
          </p>
          <h3 className="text-3xl font-black text-red-600">
            {data.confirmedCases}
          </h3>
        </Card>

        <Card>
          <p className="text-xs uppercase text-slate-400">
            Auto Escalations
          </p>
          <h3 className="text-3xl font-black text-orange-600">
            {data.autoEscalations}
          </h3>
        </Card>

        <Card>
          <p className="text-xs uppercase text-slate-400">
            Frozen Wallets
          </p>
          <h3 className="text-3xl font-black text-blue-700">
            {data.frozenWalletCount}
          </h3>
        </Card>

      </div>

      {/* FINANCIAL RISK */}

      <Card title="Frozen Funds Exposure">

        <h2 className="text-4xl font-black text-red-600">
          {formatCurrency(data.totalFrozenBalance)}
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          Total balance currently locked due to suspension.
        </p>

      </Card>

      {/* SYSTEM STATUS */}

      <Card title="Platform Financial Switches">

        <div className="space-y-2">

          <p>
            Payments Frozen:
            <b className="ml-2">
              {data.systemStatus.paymentsFrozen ? 'YES' : 'NO'}
            </b>
          </p>

          <p>
            Refunds Frozen:
            <b className="ml-2">
              {data.systemStatus.refundsFrozen ? 'YES' : 'NO'}
            </b>
          </p>

          <p>
            Withdrawals Frozen:
            <b className="ml-2">
              {data.systemStatus.withdrawalsFrozen ? 'YES' : 'NO'}
            </b>
          </p>

        </div>

      </Card>

    </div>

  );

};

export default FounderDashboard;