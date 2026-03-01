import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useApi } from '../../hooks/useApi';
import { adminService } from '../../modules/admin/adminService';

export const AdminAgents: React.FC = () => {
  const { data: agents } = useApi(adminService.getAllAgents);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900">Agent Network</h2>
        <Button>Onboard New Agent +</Button>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Agent Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Region</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Wallet</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {agents?.map((agent: any) => (
              <tr key={agent.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{agent.name}</td>
                <td className="px-6 py-4 text-slate-500 text-sm">{agent.region}</td>
                <td className="px-6 py-4 text-slate-900 font-mono">₹{agent.balance}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${agent.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {agent.active ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 font-bold text-sm hover:underline">View Ledger</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};