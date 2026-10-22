import {
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DataTable,
  dataTableFeatures,
  type DataTableFeatures,
} from "@/components/shared/data-table";

type Props<TData extends RowData> = {
  data?: TData[];
  isLoading: boolean;
  columns: ColumnDef<DataTableFeatures, TData>[];
};

export default function CommitteeDataTable<TData extends RowData>({
  data,
  isLoading,
  columns,
}: Props<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useTable({
    columns,
    data: data ?? [],
    features: dataTableFeatures,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
      columnVisibility: {
        id: false,
      },
    },
  });

  return (
    <div className="space-y-6 flex min-h-0 flex-col">
      <Input
        placeholder={`Search by name`}
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <DataTable
        columns={columns}
        table={table}
        isLoading={isLoading}
      />
    </div>
  );
}
