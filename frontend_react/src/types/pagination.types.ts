export type PaginationState = {
  pageSize: number;
  pageIndex: number;
};

export type PaginatedQueryString = PaginationState & {
  sortDir?: "asc" | "desc";
  searchKey?: string;
  searchColumn?: string;
};

export type CursorPaginatedQueryString = {
  cursor?: number;
  limit: number;
};

export type SearchableColumns = {
  id: string;
  label: string;
};

export type Search = {
  searchKey: string;
  searchColumn: string;
};

export type IncomeQueryParams = PaginatedQueryString & {
  receiptBookId?: string | null;
  committeeId?: string | null;
  minAmount?: number;
  maxAmount?: number;
};

export type ExpenseQueryParams = PaginatedQueryString & {
  committeeId?: string | null;
  categoryId?: string | null;
};

export type ReceiptBookQueryParams = PaginatedQueryString & {
  fiscalYearId?: string | null;
  status?: string | null;
  assignedTo?: string | null;
};
