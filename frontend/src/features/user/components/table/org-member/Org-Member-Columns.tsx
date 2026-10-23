import getFormattedDateTime from "@/lib/formatDateTime";
import { createColumnHelper } from "@tanstack/react-table";
import type { OrgMember } from "@/features/user/types/orgMember.types";
import type { DataTableFeatures } from "@/components/shared/data-table";

// Use `accessor` for data columns and `display` for columns without one.
const orgMemberDataTableColumnHelper = createColumnHelper<
  DataTableFeatures,
  OrgMember
>();

export const orgMemberDataTableColumns = orgMemberDataTableColumnHelper.columns(
  [
    orgMemberDataTableColumnHelper.display({
      id: "#",
      header: "#",
      cell: ({ row }) => {
        return <span>{row.index + 1}</span>;
      },
    }),
    orgMemberDataTableColumnHelper.accessor("name", {
      header: "Name",
    }),
    orgMemberDataTableColumnHelper.accessor("address", {
      header: "Address",
    }),
    orgMemberDataTableColumnHelper.accessor("phone", {
      header: "Phone Number",
    }),

    orgMemberDataTableColumnHelper.accessor("createdAt", {
      header: "Added On",
      cell: ({ getValue }) => {
        const date = new Date(getValue());

        return <div>{getFormattedDateTime(date)}</div>;
      },
    }),
  ],
);
