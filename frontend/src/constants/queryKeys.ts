export const QUERY_KEYS = {
    AUTH_USER: "AUTH_USER",
} as const;

export type QUERY_KEYS = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
