import getFormattedDateTime from "@/lib/formatDateTime";
import { createColumnHelper } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/shared/data-table";
import type { ExpenseCategory } from "../types/expense-category.types";
import UpdateExpenseCategoryDialog from "./Update-Expense-Category-Dialog";
import DeleteExpenseCategoryDialog from "./Delete-Expense-Category-Dialog";

// Use `accessor` for data columns and `display` for columns without one.
const helper = createColumnHelper<DataTableFeatures, ExpenseCategory>();

export const expenseCategoryDataTableColumns = helper.columns([
  helper.display({
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  }),
  helper.accessor("name", {
    header: "Name",
  }),
  helper.accessor("id", {
    header: "ID",
  }),
  helper.accessor("description", {
    header: "Description",
  }),
  helper.accessor("createdAt", {
    header: "Created At",
    cell: ({ getValue }) => {
      const date = new Date(getValue());

      return <div>{getFormattedDateTime(date)}</div>;
    },
  }),
  helper.accessor("updatedAt", {
    header: "Updated At",
    cell: ({ getValue }) => {
      const date = new Date(getValue());

      return <div>{getFormattedDateTime(date)}</div>;
    },
  }),

  helper.display({
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <div className="space-x-3">
          <UpdateExpenseCategoryDialog id={id} />
          <DeleteExpenseCategoryDialog id={id} />
        </div>
      );
    },
  }),
]);
