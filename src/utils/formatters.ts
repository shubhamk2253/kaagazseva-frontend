/**
 * Formats numbers into Indian Rupee (INR) currency format.
 * Example: 50000 -> ₹50,000.00
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

/**
 * Formats ISO date strings into readable Indian format.
 * Example: 2026-02-24 -> 24 Feb 2026
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

/**
 * Truncates long text for table cells or card descriptions.
 */
export const truncateText = (text: string, length: number): string => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};