export const APP_CONFIG = {
  NAME: 'KaagazSeva',
  SUPPORT_EMAIL: 'support@kaagazseva.com',
  DEFAULT_PAGE_SIZE: 10,
};

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
} as const;

export const ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  CUSTOMER: 'customer',
} as const;