import React from 'react';
import type { User } from '../../modules/auth/types';

interface AgentTableProps {
  agents: User[];
  onManage: (agentId: string) => void;
}

export const AgentTable: React.FC<AgentTableProps> = ({
  agents,
  onManage,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-sm font-semibold">Agent Name</th>
            <th className="px-6 py-3 text-sm font-semibold">Mobile</th>
            <th className="px-6 py-3 text-sm font-semibold">Joined Date</th>
            <th className="px-6 py-3 text-sm font-semibold text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {agents.map((agent) => (
            <tr key={agent.id} className="hover:bg-gray-50">
              
              {/* ✅ name (backend aligned) */}
              <td className="px-6 py-4 text-gray-900 font-medium">
                {agent.name ?? 'Unnamed Agent'}
              </td>

              {/* ✅ phoneNumber (backend aligned) */}
              <td className="px-6 py-4 text-gray-600">
                {agent.phoneNumber}
              </td>

              {/* ✅ createdAt (real backend field) */}
              <td className="px-6 py-4 text-gray-600">
                {new Date(agent.createdAt).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onManage(agent.id)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-md text-sm transition-all"
                >
                  Manage Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};