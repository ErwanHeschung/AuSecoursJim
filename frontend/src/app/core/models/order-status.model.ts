export const OrderStatus = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
