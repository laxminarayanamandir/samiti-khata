import getFormattedDateTime from "@/lib/formatDateTime";
import { createColumnHelper } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/shared/data-table";
import type { SubCommittee } from "@/features/committees/types/Committee.types";
import UpdateSubCommitteeDialog from "./Update-Sub-Committee-Dialog";
import DeleteSubCommitteeDialog from "./Delete-Sub-Committee-Dialog";

// Use `accessor` for data columns and `display` for columns without one.
const helper = createColumnHelper<DataTableFeatures, SubCommittee>();

export const subcommitteeDataTableColumns = helper.columns([
  helper.display({
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  }),
  helper.accessor("id", {
    header: "ID",
  }),
  helper.accessor("name", {
    header: "Name",
  }),
  helper.accessor("description", {
    header: "Description",
  }),
  helper.accessor("Committee.name", {
    header: "Main Committee",
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
          <UpdateSubCommitteeDialog id={id} />
          <DeleteSubCommitteeDialog id={id} />
        </div>
      );
    },
  }),
]);
