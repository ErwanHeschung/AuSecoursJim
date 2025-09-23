export const OrderType = {
  DINE_IN: 'dine_in',
  TAKEAWAY: 'takeaway',
} as const;
export type OrderType = (typeof OrderType)[keyof typeof OrderType];
