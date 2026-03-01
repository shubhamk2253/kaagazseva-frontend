/**
 * KAAGAZSEVA - Global Type Definitions
 * Shared across all modules to ensure system-wide consistency.
 */

// 1. Standard API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 2. Pagination Metadata (For large tables of Agents/Applications)
export interface PaginationMeta {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

// 3. Generic Selection Options (For dropdowns/selects)
export interface SelectOption {
  label: string;
  value: string | number;
}

// 4. Global Date String Type (Enforcing ISO format documentation)
export type ISODateString = string;

// 5. Shared Icon Type (For Sidebar/Buttons)
export type IconType = React.ComponentType<{ className?: string }>;