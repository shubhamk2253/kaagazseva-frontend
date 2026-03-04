import React from 'react';
import { suspensionService } from '@/modules/governance/suspensionService';
import { formatDate } from '@/utils/formatters';

interface Props {
  data: any[];
}

export const SuspensionTable: React.FC<Props> = ({ data }) => {

  if (!data.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No suspension cases
      </div>
    );
  }

  const confirm = async (id: string) => {
    await suspensionService.review(id, 'CONFIRMED');
    location.reload();
  };

  const reject = async (id: string) => {
    await suspensionService.review(id, 'REJECTED');
    location.reload();
  };

  const escalate = async (id: string) => {
    await suspensionService.escalate(id);
    location.reload();
  };

  return (

    <table className="w-full">

      <thead className="border-b">
        <tr>
          <th className="p-3 text-left">User</th>
          <th className="p-3 text-left">Reason</th>
          <th className="p-3 text-left">Level</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Created</th>
          <th className="p-3 text-right">Actions</th>
        </tr>
      </thead>

      <tbody>

        {data.map((c) => (

          <tr key={c.id} className="border-b">

            <td className="p-3">
              {c.userId}
            </td>

            <td className="p-3">
              {c.reason}
            </td>

            <td className="p-3">
              Level {c.level}
            </td>

            <td className="p-3">
              {c.status}
            </td>

            <td className="p-3">
              {formatDate(c.createdAt)}
            </td>

            <td className="p-3 text-right space-x-2">

              {c.status === 'UNDER_REVIEW' && (
                <>
                  <button
                    onClick={() => confirm(c.id)}
                    className="text-green-600 font-semibold"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => reject(c.id)}
                    className="text-red-600 font-semibold"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => escalate(c.id)}
                    className="text-blue-600 font-semibold"
                  >
                    Escalate
                  </button>
                </>
              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );

};