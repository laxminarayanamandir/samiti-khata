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
import useGetReceiptBooks from "../hooks/useGetReceiptBooks";
import ReceiptBookDataTable from "../components/Receipt-Book-Data-Table";
import CreateReceiptBookSheet from "../components/Create-Receipt-Boook-Sheet";
import { receiptBookDataTableColumns } from "../components/Receipt-Book-Columns";

export default function ReceiptBookPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDir | null>("desc");
  const [fiscalYearId, setFiscalYearId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [assignedTo, setAssignedTo] = useState<string | null>(null);

  const { data: receiptResponse, isPending } = useGetReceiptBooks({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortDir: sortDirection ?? "desc",
    searchKey,
    searchColumn,
    fiscalYearId: fiscalYearId ?? "",
    status: status ?? "",
    assignedTo: assignedTo ?? "",
  });

  const searchableColumns: SearchableColumn[] = [
    {
      id: "bookNumber",
      label: "Book Number",
    },
    {
      id: "receiptStartNumber",
      label: "Receipt Start No.",
    },
    {
      id: "receiptEndNumber",
      label: "Receipt End No.",
    },
  ];

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Receipt Books"
          description="Manage organization receipt books."
        />
        <CreateReceiptBookSheet />
      </PageHeader>
      <PageSection>
        <ReceiptBookDataTable
          data={receiptResponse?.data}
          columns={receiptBookDataTableColumns}
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
            pageCount: receiptResponse?.meta.totalPages,
            pagination,
            setPagination,
          }}
          fiscalYearId={fiscalYearId}
          status={status}
          assignedTo={assignedTo}
          setFiscalYearId={setFiscalYearId}
          setStatus={setStatus}
          setAssignedTo={setAssignedTo}
        />
      </PageSection>
    </PageLayout>
  );
}
