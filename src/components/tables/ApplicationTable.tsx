import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Application } from '../../modules/application/types';
import { formatDate } from '../../utils/formatters';

interface ApplicationTableProps {
  data: Application[];
  onStatusChange?: (id: string, status: string) => void;
  showAgent?: boolean;
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return 'bg-green-100 text-green-700';

    case 'UNDER_REVIEW':
    case 'ASSIGNED':
      return 'bg-blue-100 text-blue-700';

    case 'PENDING_PAYMENT':
    case 'SUBMITTED':
    case 'DOCUMENT_REQUIRED':
      return 'bg-yellow-100 text-yellow-700';

    case 'REJECTED':
    case 'CANCELLED':
      return 'bg-red-100 text-red-700';

    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  data,
  onStatusChange,
  showAgent = false,
}) => {

  const navigate = useNavigate();

  if (!data.length) {
    return (
      <div className="text-center py-12 text-sm text-gray-500">
        No applications found.
      </div>
    );
  }

  return (

    <div className="overflow-x-auto">

      <table className="w-full text-left border-collapse">

        {/* HEADER */}

        <thead className="bg-gray-50 border-b border-gray-200">

          <tr>

            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">
              Service
            </th>

            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">
              Date
            </th>

            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">
              Status
            </th>

            {showAgent && (
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">
                Agent
              </th>
            )}

            <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-right">
              Action
            </th>

          </tr>

        </thead>

        {/* BODY */}

        <tbody className="divide-y divide-gray-100">

          {data.map((app) => (

            <tr
              key={app.id}
              className="hover:bg-blue-50/30 transition-colors"
            >

              {/* SERVICE */}

              <td className="px-6 py-4 font-medium text-gray-800">
                {app.serviceType}
              </td>

              {/* DATE */}

              <td className="px-6 py-4 text-sm text-gray-600">
                {formatDate(app.createdAt)}
              </td>

              {/* STATUS */}

              <td className="px-6 py-4">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(app.status)}`}
                >
                  {app.status.replaceAll('_', ' ')}
                </span>

              </td>

              {/* AGENT */}

              {showAgent && (
                <td className="px-6 py-4 text-sm text-gray-600">
                  {app.agent?.name ?? 'Unassigned'}
                </td>
              )}

              {/* ACTIONS */}

              <td className="px-6 py-4 text-right space-x-3">

                {/* VIEW DETAILS */}

                <button
                  onClick={() => navigate(`/customer/application/${app.id}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  View
                </button>

                {/* AGENT ACTIONS */}

                {app.status === 'ASSIGNED' && (
                  <button
                    onClick={() =>
                      onStatusChange?.(app.id, 'UNDER_REVIEW')
                    }
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
                  >
                    Start Review
                  </button>
                )}

                {app.status === 'UNDER_REVIEW' && (
                  <>
                    <button
                      onClick={() =>
                        onStatusChange?.(app.id, 'DOCUMENT_REQUIRED')
                      }
                      className="text-yellow-600 hover:text-yellow-800 text-sm font-semibold"
                    >
                      Request Docs
                    </button>

                    <button
                      onClick={() =>
                        onStatusChange?.(app.id, 'COMPLETED')
                      }
                      className="text-green-600 hover:text-green-800 text-sm font-semibold"
                    >
                      Complete
                    </button>
                  </>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};