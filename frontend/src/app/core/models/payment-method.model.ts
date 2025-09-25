export const PaymentMethod = {
  COUNTER: 'counter',
  KIOSK: 'kiosk',
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
