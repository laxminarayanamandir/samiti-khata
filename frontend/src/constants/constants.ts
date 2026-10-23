export const MODULES = {
  COMMITTEE: "COMMITTEE",
  EXPENSE: "EXPENSE",
  EXPENSE_CATEGORY: "EXPENSE_CATEGORY",
  INCOME: "INCOME",
  FISCAL_YEAR: "FISCAL-YEAR",
  ORG_MEMBERS: "ORG-MEMBERS",
  ORGANIZATION: "ORGANIZATION",
  RECEIPT_BOOK: "RECEIPT_BOOK",
  USER: "USER",
  SUB_COMMITTEE: "SUB_COMMITTEE",
} as const;

export type MODULES = (typeof MODULES)[keyof typeof MODULES];

export const ACTIONS = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
} as const;
export type ACTIONS = (typeof ACTIONS)[keyof typeof ACTIONS];

export const PaymentModeOptions = [
  {
    label: "Cash",
    item: "CASH",
  },
  {
    label: "Cheque",
    item: "CHEQUE",
  },
  {
    label: "Online",
    item: "ONLINE",
  },
];
