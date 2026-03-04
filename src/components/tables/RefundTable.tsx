import React from 'react';
import { refundService } from '@/modules/refund/refundService';
import { formatDate } from '@/utils/formatters';

interface Props {
  data: any[];
}

export const RefundTable: React.FC<Props> = ({ data }) => {

  if (!data.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No refund requests
      </div>
    );
  }

  const handleApprove = async (id: string) => {
    await refundService.reviewRefund(id, 'APPROVED');
    location.reload();
  };

  const handleReject = async (id: string) => {
    await refundService.reviewRefund(id, 'REJECTED');
    location.reload();
  };

  const handleProcess = async (id: string) => {
    await refundService.processRefund(id);
    location.reload();
  };

  return (

    <table className="w-full">

      <thead className="border-b">
        <tr>
          <th className="p-3 text-left">Application</th>
          <th className="p-3 text-left">Amount</th>
          <th className="p-3 text-left">Reason</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Date</th>
          <th className="p-3 text-right">Actions</th>
        </tr>
      </thead>

      <tbody>

        {data.map((refund) => (

          <tr key={refund.id} className="border-b">

            <td className="p-3">
              {refund.applicationId}
            </td>

            <td className="p-3">
              ₹{refund.amount}
            </td>

            <td className="p-3">
              {refund.reason}
            </td>

            <td className="p-3">
              {refund.status}
            </td>

            <td className="p-3">
              {formatDate(refund.createdAt)}
            </td>

            <td className="p-3 text-right space-x-2">

              {refund.status === 'REQUESTED' && (
                <>
                  <button
                    onClick={() => handleApprove(refund.id)}
                    className="text-green-600 font-semibold"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(refund.id)}
                    className="text-red-600 font-semibold"
                  >
                    Reject
                  </button>
                </>
              )}

              {refund.status === 'APPROVED' && (
                <button
                  onClick={() => handleProcess(refund.id)}
                  className="text-blue-600 font-semibold"
                >
                  Process
                </button>
              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );

};