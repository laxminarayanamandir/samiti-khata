import { createColumnHelper } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/shared/data-table/Data-Table-Features";
import type { ReceiptBook } from "../types/receiptBooks.types";
import clsx from "clsx";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, ReceiptBook>();

export const receiptBookDataTableColumns = columnHelper.columns([
  columnHelper.display({
    id: "#",
    header: "#",
    cell: ({ row, table }) => {
      const pagination = table.options.state?.pagination;

      return (
        <span>
          {(pagination?.pageIndex ?? 0) * (pagination?.pageSize ?? 0) +
            row.index +
            1}
        </span>
      );
    },
  }),
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("fiscalYear.name", {
    header: "Fiscal Year",
  }),
  columnHelper.accessor("bookNumber", {
    header: "Book Number",
  }),
  columnHelper.accessor("receiptStartingNumber", {
    header: "Recipt Start No.",
  }),
  columnHelper.accessor("receiptEndingNumber", {
    header: "Recipt End No.",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <span
          className={clsx(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            status === "AVAILABLE" &&
              "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
            status === "ASSIGNED" &&
              "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
            status === "RETURNED" &&
              "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
            status === "ASSIGNED_WITH_MANY" &&
              "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
          )}
        >
          {status}
        </span>
      );
    },
  }),
  columnHelper.accessor("assignedMember.name", {
    header: "Assigned To",
    cell: ({ getValue }) => {
      const value = getValue();
      return value ?? "-";
    },
  }),
]);
