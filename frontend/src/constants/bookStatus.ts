export const BookStatus = {
  AVAILABLE: "AVAILABLE",
  ASSIGNED: "ASSIGNED",
  RETURNED: "RETURNED",
  ASSIGNED_WITH_MANY: "ASSIGNED_WITH_MANY",
} as const;

export type BookStatus = (typeof BookStatus)[keyof typeof BookStatus];

export const BookStatusOptions = [
  {
    item: "AVAILABLE",
    label: "Available",
  },
  {
    item: "ASSIGNED",
    label: "Assigned",
  },
  {
    item: "RETURNED",
    label: "Returned",
  },
  {
    item: "ASSIGNED_WITH_MANY",
    label: "Assigned with many members",
  },
];
