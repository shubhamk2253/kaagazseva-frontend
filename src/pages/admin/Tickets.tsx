import React, { useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useApi } from '../../hooks/useApi';
import { adminService } from '../../modules/admin/adminService';
import { formatDate } from '../../utils/formatters';

export const AdminTickets: React.FC = () => {
  const { data: tickets, request: fetchTickets } = useApi(adminService.getAllTickets);

  useEffect(() => { fetchTickets(); }, []);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Support Queue</h2>
          <p className="text-slate-500 text-sm">Monitor and resolve system-wide disputes.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Filter: High Priority</Button>
          <Button variant="outline" size="sm">Export CSV</Button>
        </div>
      </header>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Ticket ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Subject</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">User Role</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Priority</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets?.map((ticket: any) => (
              <tr key={ticket.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-mono text-xs text-slate-500">#{ticket.id.slice(0,8)}</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 text-sm">{ticket.subject}</p>
                  <p className="text-xs text-slate-400">{formatDate(ticket.created_at)}</p>
                </td>
                <td className="px-6 py-4 capitalize text-sm">{ticket.user_role}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    ticket.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <span className={`w-2 h-2 rounded-full ${ticket.status === 'open' ? 'bg-amber-400' : 'bg-slate-300'}`} />
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="outline" size="sm">Resolve</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};