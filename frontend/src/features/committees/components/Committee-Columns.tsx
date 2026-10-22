import clsx from "clsx";
import getFormattedDateTime from "@/lib/formatDateTime";
import { createColumnHelper } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/shared/data-table";
import type { Committee } from "@/features/committees/types/Committee.types";
import UpdateCommitteeDialog from "./Update-Committee-Dialog";
import DeleteCommitteeDialog from "./Delete-Committee-Dialog";

// Use `accessor` for data columns and `display` for columns without one.
const committeeDataTableColumnHelper = createColumnHelper<
  DataTableFeatures,
  Committee
>();

export const committeeDataTableColumns = committeeDataTableColumnHelper.columns(
  [
    committeeDataTableColumnHelper.display({
      id: "#",
      header: "#",
      cell: ({ row }) => {
        return <span>{row.index + 1}</span>;
      },
    }),
    committeeDataTableColumnHelper.accessor("name", {
      header: "Name",
    }),
    committeeDataTableColumnHelper.accessor("id", {
      header: "ID",
    }),
    committeeDataTableColumnHelper.accessor("description", {
      header: "Description",
    }),
    committeeDataTableColumnHelper.accessor("isActive", {
      header: () => <div className="px-4">Status</div>,
      cell: ({ getValue }) => {
        const isActive = getValue();
        return (
          <div
            className={clsx("w-fit px-4 py-1 rounded-lg font-medium", {
              "bg-green-500/5 text-green-600": isActive,
              "bg-destructive/5 text-destructive": !isActive,
            })}
          >
            {isActive ? "Active" : "Inactive"}
          </div>
        );
      },
    }),
    committeeDataTableColumnHelper.accessor("createdAt", {
      header: "Created At",
      cell: ({ getValue }) => {
        const date = new Date(getValue());

        return <div>{getFormattedDateTime(date)}</div>;
      },
    }),
    committeeDataTableColumnHelper.accessor("updatedAt", {
      header: "Updated At",
      cell: ({ getValue }) => {
        const date = new Date(getValue());

        return <div>{getFormattedDateTime(date)}</div>;
      },
    }),
    committeeDataTableColumnHelper.display({
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <div className="space-x-3">
            <UpdateCommitteeDialog id={id} />
            <DeleteCommitteeDialog id={id} />
          </div>
        );
      },
    }),
  ],
);
