import {
  type SearchableColumn,
  type SortDir,
} from "@/components/shared/data-table";
import {
  PageHeader,
  PageHeading,
  PageLayout,
  PageSection,
} from "@/components/shared/page";
import { useState } from "react";
import useGetExpenses from "../hooks/useGetExpenses";
import AddExpenseBillSheet from "../components/Add-Expense-Bill-Sheet";
import { expenseDataTableColumns } from "../components/Expense-Columns";
import ExpenseDataTable from "../components/Expense-Data-Table";

export default function ExpensePage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDir | null>("desc");
  const [committeeId, setCommitteeId] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const { data: expenseResponse, isPending } = useGetExpenses({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortDir: sortDirection ?? "desc",
    searchKey,
    searchColumn,
    committeeId: committeeId ?? "",
    categoryId: categoryId ?? "",
  });

  const searchableColumns: SearchableColumn[] = [
    {
      id: "name",
      label: "Name",
    },
    {
      id: "address",
      label: "Address",
    },
  ];

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Expense"
          description="Manage organization expense."
        />
        <AddExpenseBillSheet />
      </PageHeader>
      <PageSection>
        <ExpenseDataTable
          data={expenseResponse?.data}
          columns={expenseDataTableColumns}
          isLoading={isPending}
          search={{
            searchKey,
            searchColumn,
            searchableColumns,
            setSearchKey,
            setSearchColumn,
          }}
          sorting={{
            sortDirection,
            setSortDirection,
          }}
          pagination={{
            pageCount: expenseResponse?.meta.totalPages ?? 1,
            pagination,
            setPagination,
          }}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          committeeId={committeeId}
          setCommitteeId={setCommitteeId}
        />
      </PageSection>
    </PageLayout>
  );
}
