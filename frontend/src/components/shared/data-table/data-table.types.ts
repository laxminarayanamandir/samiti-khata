import type { Dispatch, SetStateAction } from "react";

import type { PaginationState } from "@/types/pagination.types";

export interface SearchableColumn {
  id: string;
  label: string;
}

export interface DataTableSearchState {
  search: string;
  searchColumn: string;
}

export interface DataTableSearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

  searchColumn: string;
  setSearchColumn: Dispatch<SetStateAction<string>>;

  searchableColumns: SearchableColumn[];

  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;

  debounceMs?: number;
  sortDirection: SortDir | null;
  setSortDirection: Dispatch<SetStateAction<SortDir | null>>;
}

export type SortDir = "asc" | "desc";
