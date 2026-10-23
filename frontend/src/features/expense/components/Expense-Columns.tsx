import clsx from "clsx";
import type { Expense } from "../types/expense.types";
import { formatNPR } from "@/lib/formatNepaliCurrency";
import { createColumnHelper } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/shared/data-table";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Expense>();

export const expenseDataTableColumns = columnHelper.columns([
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
  columnHelper.accessor("nepaliDate", {
    header: "Date",
  }),
  columnHelper.accessor("Category.name", {
    header: "Category",
  }),
  columnHelper.accessor("recepientName", {
    header: "Recepient",
  }),
  columnHelper.accessor("recepientAddress", {
    header: "Address",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: ({ getValue }) => formatNPR(getValue()).concat(" /-"),
  }),
  columnHelper.accessor("paymentMode", {
    header: "Payment Mode",
    cell: ({ getValue }) => {
      const mode = getValue();

      return (
        <span
          className={clsx(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
            mode === "ONLINE" &&
              "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
            mode === "CASH" &&
              "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
            mode === "CHEQUE" &&
              "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
          )}
        >
          {mode}
        </span>
      );
    },
  }),
  columnHelper.accessor("Committee.name", {
    header: "Committee",
  }),
  columnHelper.accessor("AuthorizedOrgMember.name", {
    header: "Paid By",
  }),
]);
