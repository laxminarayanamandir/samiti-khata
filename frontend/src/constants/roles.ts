export const Role = {
  ADMIN: "ADMIN",
  OPERATOR: "OPERATOR",
  OWNER: "OWNER",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
