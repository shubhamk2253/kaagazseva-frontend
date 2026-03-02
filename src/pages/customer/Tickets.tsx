import React, { useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ticketService } from '../../modules/ticket/ticketService';
import { useApi } from '../../hooks/useApi';
import { formatDate } from '../../utils/formatters';

export const CustomerTickets: React.FC = () => {
  const { data: tickets, request: fetchTickets } = useApi(ticketService.getMyTickets);
  useEffect(() => { fetchTickets(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-900">Support Tickets</h2>
        <Button variant="outline">New Ticket</Button>
      </div>
      
      <div className="grid gap-4">
        {tickets?.map(ticket => (
          <Card key={ticket.id} className="hover:shadow-md cursor-pointer transition-all">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900">{ticket.subject}</h4>
                <p className="text-xs text-slate-500">Raised on {formatDate(ticket.createdAt)}</p>
              </div>
              <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold uppercase">{ticket.status}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};