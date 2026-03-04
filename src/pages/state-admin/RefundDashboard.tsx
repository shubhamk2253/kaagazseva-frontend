import React, { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { useApi } from '@/hooks/useApi';
import { refundService } from '@/modules/refund/refundService';
import { RefundTable } from '@/components/tables/RefundTable';
import type { RefundRequest } from '@/modules/refund/refundService';

const RefundDashboard: React.FC = () => {

  //////////////////////////////////////////////////////
  // LOAD REFUNDS
  //////////////////////////////////////////////////////

  const {
    data,
    request,
    loading,
  } = useApi<RefundRequest[], []>(
    refundService.getRefunds
  );

  useEffect(() => {
    request();
  }, [request]);

  const refunds = data ?? [];

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (

    <div className="space-y-10">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-black text-slate-900">
          Refund Control Panel
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor and review refund requests across the platform.
        </p>

      </div>

      {/* REFUND TABLE */}

      <Card title="Refund Requests">

        {loading && (
          <p className="text-sm text-slate-500">
            Loading refunds...
          </p>
        )}

        {!loading && (
          <RefundTable data={refunds} />
        )}

      </Card>

    </div>

  );

};

export default RefundDashboard;