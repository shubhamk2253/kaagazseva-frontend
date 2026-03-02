import React from 'react';
import type { Application } from '../../modules/application/types';
import { formatDate } from '../../utils/formatters';

interface ApplicationTableProps {
  data: Application[];
  onAction?: (app: Application) => void;
  showAgent?: boolean;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
  data,
  onAction,
  showAgent = false,
}) => {
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

        <tbody className="divide-y divide-gray-100">
          {data.map((app) => (
            <tr
              key={app.id}
              className="hover:bg-blue-50/30 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {app.serviceType}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {formatDate(app.createdAt)}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    app.status === 'COMPLETED'
                      ? 'bg-green-100 text-green-700'
                      : app.status === 'UNDER_REVIEW'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {app.status.replace('_', ' ')}
                </span>
              </td>

              {showAgent && (
                <td className="px-6 py-4 text-sm text-gray-600">
                  {/* ✅ Backend-aligned field */}
                  {app.agent?.name ?? 'Unassigned'}
                </td>
              )}

              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onAction?.(app)}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};