import {
  dataTableFeatures,
  type DataTableFeatures,
} from "./Data-Table-Features";
import {
  useTable,
  type ColumnDef,
  type PaginationState,
  type RowData,
} from "@tanstack/react-table";
import { X } from "lucide-react";
import DataTable from "./components/Data-Table";
import { Button } from "@/components/ui/button";
import type { SortDir } from "./data-table.types";
import type { Dispatch, SetStateAction } from "react";
import DataTableSort from "./components/Data-Table-Sort";
import DataTableSearch from "./components/Data-Table-Search";
import type { SearchableColumns } from "@/types/pagination.types";
import DataTablePagination from "./components/Data-Table-Pagination";

type Props<TData extends RowData> = {
  data?: TData[];
  isLoading: boolean;
  columns: ColumnDef<DataTableFeatures, TData>[];

  search: {
    searchKey: string;
    searchColumn: string;
    searchableColumns: SearchableColumns[];
    setSearchKey: Dispatch<SetStateAction<string>>;
    setSearchColumn: Dispatch<SetStateAction<string>>;
  };

  sorting: {
    sortDirection: SortDir | null;
    setSortDirection: Dispatch<SetStateAction<SortDir | null>>;
  };

  pagination: {
    pageCount?: number;
    pagination: PaginationState;
    setPagination: Dispatch<SetStateAction<PaginationState>>;
  };
};

export default function ServerDataTable<TData extends RowData>({
  data,
  isLoading,
  columns,
  pagination,
  search,
  sorting,
}: Props<TData>) {
  const table = useTable({
    columns,
    data: data ?? [],
    features: dataTableFeatures,
    manualPagination: true,
    pageCount: pagination.pageCount,
    onPaginationChange: pagination.setPagination,
    state: {
      pagination: pagination.pagination,
    },
  });

  const handleClearFilters = () => {
    search.setSearchKey("");
    search.setSearchColumn("");
    sorting.setSortDirection("desc");
  };

  return (
    <div className="space-y-6 flex min-h-0 flex-col">
      <div className="flex items-center gap-2">
        <DataTableSearch
          key={search.searchKey}
          search={search}
          pagination={{
            setPagination: pagination.setPagination,
          }}
        />

        <DataTableSort sorting={sorting} />
        <Button variant={"secondary"} onClick={handleClearFilters}>
          <X />
          Clear Filters
        </Button>
      </div>

      <DataTable columns={columns} table={table} isLoading={isLoading} />

      <DataTablePagination
        isLoading={isLoading}
        pageCount={pagination.pageCount ?? 0}
        pageIndex={pagination.pagination.pageIndex}
        nextPage={table.nextPage}
        previousPage={table.previousPage}
      />
    </div>
  );
}
