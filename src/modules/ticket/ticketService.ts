import apiClient from '../../config/apiClient';
import type { Ticket, CreateTicketDTO, TicketMessage } from './types';

export const ticketService = {
  // Create a new support request
  create: async (data: CreateTicketDTO): Promise<Ticket> => {
    const response = await apiClient.post('/tickets', data);
    return response.data;
  },

  // Get all tickets for the logged-in user (Customer or Agent)
  getMyTickets: async (): Promise<Ticket[]> => {
    const response = await apiClient.get('/tickets/my-tickets');
    return response.data;
  },

  // Get a single ticket with full message history
  getDetails: async (id: string): Promise<Ticket> => {
    const response = await apiClient.get(`/tickets/${id}`);
    return response.data;
  },

  // Send a new message in an existing ticket
  reply: async (id: string, message: string): Promise<TicketMessage> => {
    const response = await apiClient.post(`/tickets/${id}/messages`, { message });
    return response.data;
  },

  // Admin: View all support tickets across the system
  getAllTickets: async (): Promise<Ticket[]> => {
    const response = await apiClient.get('/admin/tickets');
    return response.data;
  }
};