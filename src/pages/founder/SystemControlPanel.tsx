import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { systemControlService } from '@/modules/system/systemControlService';
import { useApi } from '@/hooks/useApi';

const SystemControlPanel: React.FC = () => {

  const { data, request } =
    useApi(systemControlService.getStatus);

  const [reason, setReason] = useState('');

  useEffect(() => {
    request();
  }, [request]);

  const freezePayments = async () => {
    await systemControlService.freezePayments(reason);
    request();
  };

  const freezeRefunds = async () => {
    await systemControlService.freezeRefunds(reason);
    request();
  };

  const freezeWithdrawals = async () => {
    await systemControlService.freezeWithdrawals(reason);
    request();
  };

  const unfreeze = async () => {
    await systemControlService.unfreeze();
    request();
  };

  const status = data;

  return (

    <div className="space-y-10">

      <div>
        <h1 className="text-4xl font-black text-slate-900">
          System Emergency Controls
        </h1>
        <p className="text-slate-500 mt-2">
          Founder-level financial protection switches.
        </p>
      </div>

      <Card title="Current System Status">

        {!status && <p>Loading...</p>}

        {status && (
          <div className="space-y-3">

            <p>
              Payments Frozen:
              <b className="ml-2">
                {status.paymentsFrozen ? 'YES' : 'NO'}
              </b>
            </p>

            <p>
              Refunds Frozen:
              <b className="ml-2">
                {status.refundsFrozen ? 'YES' : 'NO'}
              </b>
            </p>

            <p>
              Withdrawals Frozen:
              <b className="ml-2">
                {status.withdrawalsFrozen ? 'YES' : 'NO'}
              </b>
            </p>

          </div>
        )}

      </Card>

      <Card title="Emergency Actions">

        <div className="space-y-4">

          <textarea
            placeholder="Reason for system freeze"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border w-full p-3 rounded"
          />

          <div className="flex gap-3 flex-wrap">

            <button
              onClick={freezePayments}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Freeze Payments
            </button>

            <button
              onClick={freezeRefunds}
              className="bg-orange-600 text-white px-4 py-2 rounded"
            >
              Freeze Refunds
            </button>

            <button
              onClick={freezeWithdrawals}
              className="bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Freeze Withdrawals
            </button>

            <button
              onClick={unfreeze}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Unfreeze System
            </button>

          </div>

        </div>

      </Card>

    </div>

  );

};

export default SystemControlPanel;