export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TicketMessage {
  id: string;
  sender_id: string;
  message: string;
  created_at: string;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: 'payment' | 'application' | 'technical' | 'other';
  user_id: string;
  related_id?: string; // Link to a specific Application or Transaction
  messages: TicketMessage[];
  created_at: string;
  updated_at: string;
}

export interface CreateTicketDTO {
  subject: string;
  description: string;
  priority: TicketPriority;
  category: Ticket['category'];
  related_id?: string;
}