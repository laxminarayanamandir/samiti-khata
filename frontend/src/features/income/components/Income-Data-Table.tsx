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
import IncomeDetailsDialog from "./Income-Details-Dialog";
import type { SearchableColumns } from "@/types/pagination.types";
import DeleteIncomeAlertDialog from "./Delete-Income-Alert-Dialog";
import { useState, type Dispatch, type SetStateAction } from "react";
import SelectCommitteeFilter from "@/features/committees/components";
import { SelectReceiptBookFilter } from "@/features/receipt-books/components";
import { ClearFilterButton } from "@/components/shared/data-table/components";
import UpdateIncomeReceiptSheet from "./Update-Income-Receipt-Sheet";
import { Input } from "@/components/ui/input";

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
  receiptBookId: string | null;
  minAmount: string;
  maxAmount: string;
  setCommitteeId: Dispatch<SetStateAction<string | null>>;
  setReceiptBookId: Dispatch<SetStateAction<string | null>>;
  setMinAmount: Dispatch<SetStateAction<string>>;
  setMaxAmount: Dispatch<SetStateAction<string>>;
};

export default function IncomeDataTable<TData extends RowData>({
  data,
  isLoading,
  columns,
  pagination,
  search,
  sorting,
  committeeId,
  receiptBookId,
  minAmount,
  maxAmount,
  setCommitteeId,
  setReceiptBookId,
  setMinAmount,
  setMaxAmount,
}: Props<TData>) {
  const [clickedRowId, setClickedRowId] = useState<number | null>(null);

  const [openDialog, setOpenDialog] = useState<"delete" | "update" | null>(
    null,
  );

  const handleSuccess = () => {
    setOpenDialog(null);
    setClickedRowId(null);
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
    setReceiptBookId(null);
    setMinAmount("");
    setMaxAmount("");
    search.setSearchKey("");
    search.setSearchColumn("");
    sorting.setSortDirection("desc");
  };

  const handleRowClick = (id: string) => {
    setClickedRowId(Number(id));
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="flex shrink-0 flex-wrap items-center gap-3">
        <DataTableSearch
          key={search.searchKey}
          search={search}
          pagination={{
            setPagination: pagination.setPagination,
          }}
        />

        {/* <SelectReceiptBookFilter
          receiptBookId={receiptBookId}
          setReceiptBookId={setReceiptBookId}
        /> */}

        <SelectCommitteeFilter
          committeeId={committeeId}
          setCommitteeId={setCommitteeId}
        />

        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Amount range"
        >
          <Input
            type="string"
            step="any"
            className="w-28"
            aria-label="Minimum amount"
            placeholder="Min amount"
            value={minAmount}
            onChange={(event) => setMinAmount(event.target.value)}
          />
          <Input
            type="string"
            step="any"
            className="w-28"
            aria-label="Maximum amount"
            placeholder="Max amount"
            value={maxAmount}
            onChange={(event) => setMaxAmount(event.target.value)}
          />
        </div>

        <DataTableSort sorting={sorting} />

        <ClearFilterButton onClick={handleClearFilters} />
      </div>

      <DataTable
        columns={columns}
        table={table}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        scrollRows
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
          <IncomeDetailsDialog
            id={clickedRowId}
            open={!!clickedRowId}
            onClose={() => setClickedRowId(null)}
            onDeleteClick={() => setOpenDialog("delete")}
            onUpdateClick={() => setOpenDialog("update")}
          />

          <DeleteIncomeAlertDialog
            id={clickedRowId}
            open={openDialog === "delete"}
            onOpenChange={(state) =>
              state ? setOpenDialog("delete") : setOpenDialog(null)
            }
            onDeleteSuccess={handleSuccess}
          />

          <UpdateIncomeReceiptSheet
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
