export const PaymentModes = {
  CASH: "CASH",
  CHEQUE: "CHEQUE",
  ONLINE: "ONLINE",
} as const;

export type PaymentModes = (typeof PaymentModes)[keyof typeof PaymentModes];
