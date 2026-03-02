export const APP_CONFIG = {
  NAME: 'KaagazSeva',
  SUPPORT_EMAIL: 'support@kaagazseva.com',
  DEFAULT_PAGE_SIZE: 10,
};

export const APPLICATION_STATUS = {
  PENDING: 'PENDING_PAYMENT',
  IN_PROGRESS: 'UNDER_REVIEW',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED',
} as const;

export const ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  CUSTOMER: 'customer',
} as const;