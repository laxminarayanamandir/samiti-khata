import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ColumnDef, ReactTable, RowData } from "@tanstack/react-table";
import type { DataTableFeatures } from "../Data-Table-Features";

type Props<T extends RowData> = {
  table: ReactTable<DataTableFeatures, T>;
  columns: ColumnDef<DataTableFeatures, T>[];
  isLoading: boolean;
  onRowClick?: (id: string) => void;
};

export default function DataTable<T extends RowData>({
  table,
  columns,
  isLoading,
  onRowClick,
}: Props<T>) {
  return (
    <div className="max-h-[calc(100vh-220px)] overflow-auto rounded-md border">
      <Table className="w-full min-w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-muted sticky top-0 z-10"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-muted">
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick?.(row.getValue("id"))}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
