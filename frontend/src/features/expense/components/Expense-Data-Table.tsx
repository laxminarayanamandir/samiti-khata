import {
  useTable,
  type ColumnDef,
  type PaginationState,
  type RowData,
} from "@tanstack/react-table";
import {
  DataTable,
  dataTableFeatures,
  DataTablePagination,
  DataTableSearch,
  DataTableSort,
  type DataTableFeatures,
  type SortDir,
} from "@/components/shared/data-table";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { SearchableColumns } from "@/types/pagination.types";
import SelectCommitteeFilter from "@/features/committees/components";
import SelectCategoryFilter from "@/features/expense-category/components";
import { ClearFilterButton } from "@/components/shared/data-table/components";
import ExpenseDetailsDialog from "./Expense-Details-Dialog";
import DeleteExpenseAlertDialog from "./Delete-Expense-Alert-Dialog";
import UpdateExpenseBillSheet from "./Update-Expense-Bill-Sheet";

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

  committeeId: string | null;
  categoryId: string | null;
  setCommitteeId: Dispatch<SetStateAction<string | null>>;
  setCategoryId: Dispatch<SetStateAction<string | null>>;
};

export default function ExpenseDataTable<TData extends RowData>({
  data,
  isLoading,
  columns,
  pagination,
  search,
  sorting,
  committeeId,
  categoryId,
  setCommitteeId,
  setCategoryId,
}: Props<TData>) {
  const [clickedRowId, setClickedRowId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<"delete" | "update" | null>(
    null,
  );

  const handleSuccess = () => {
    setOpenDialog(null);
    setClickedRowId(null);
  };

  const handleRowClick = (id: string) => {
    setClickedRowId(Number(id));
  };

  const table = useTable({
    columns,
    data: data ?? [],
    features: dataTableFeatures,
    manualPagination: true,
    pageCount: pagination.pageCount,
    onPaginationChange: pagination.setPagination,
    state: {
      pagination: pagination.pagination,
      columnVisibility: {
        id: false,
      },
    },
  });

  const handleClearFilters = () => {
    setCommitteeId(null);
    setCategoryId(null);
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

        <SelectCategoryFilter
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />

        <SelectCommitteeFilter
          committeeId={committeeId}
          setCommitteeId={setCommitteeId}
        />

        <DataTableSort sorting={sorting} />

        <ClearFilterButton onClick={handleClearFilters} />
      </div>

      <DataTable
        columns={columns}
        table={table}
        isLoading={isLoading}
        onRowClick={handleRowClick}
      />

      <DataTablePagination
        isLoading={isLoading}
        pageCount={pagination.pageCount ?? 0}
        pageIndex={pagination.pagination.pageIndex}
        nextPage={table.nextPage}
        previousPage={table.previousPage}
      />

      {clickedRowId && (
        <>
          <ExpenseDetailsDialog
            id={clickedRowId}
            open={!!clickedRowId}
            onClose={() => setClickedRowId(null)}
            onDeleteClick={() => setOpenDialog("delete")}
            onUpdateClick={() => setOpenDialog("update")}
          />

          <DeleteExpenseAlertDialog
            id={clickedRowId}
            open={openDialog === "delete"}
            onOpenChange={(state) =>
              state ? setOpenDialog("delete") : setOpenDialog(null)
            }
            onDeleteSuccess={handleSuccess}
          />
          <UpdateExpenseBillSheet
            id={clickedRowId}
            open={openDialog === "update"}
            onOpenChange={(state) =>
              state ? setOpenDialog("update") : setOpenDialog(null)
            }
            onUpdateSuccess={handleSuccess}
          />
        </>
      )}
    </div>
  );
}
