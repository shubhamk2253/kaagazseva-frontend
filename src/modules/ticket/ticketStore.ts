import { create } from 'zustand';
import type { Ticket, TicketMessage } from './types';

interface TicketState {
  tickets: Ticket[];
  activeTicket: Ticket | null;
  isLoading: boolean;
  
  setTickets: (tickets: Ticket[]) => void;
  setActiveTicket: (ticket: Ticket | null) => void;
  addMessageLocal: (message: TicketMessage) => void;
  updateTicketStatusLocal: (id: string, status: Ticket['status']) => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  activeTicket: null,
  isLoading: false,

  setTickets: (tickets) => set({ tickets }),
  
  setActiveTicket: (ticket) => set({ activeTicket: ticket }),

  // Push new message into the active conversation locally
  addMessageLocal: (message) => set((state) => ({
    activeTicket: state.activeTicket 
      ? { ...state.activeTicket, messages: [...state.activeTicket.messages, message] }
      : null
  })),

  updateTicketStatusLocal: (id, status) => set((state) => ({
    tickets: state.tickets.map(t => t.id === id ? { ...t, status } : t),
    activeTicket: state.activeTicket?.id === id ? { ...state.activeTicket, status } : state.activeTicket
  }))
}));