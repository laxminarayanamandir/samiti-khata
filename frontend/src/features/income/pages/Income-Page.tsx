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
import { useDebounce } from "@/hooks/use-debounce";
import useGetIncomes from "../hooks/useGetIncomes";
import IncomeDataTable from "../components/Income-Data-Table";
import { incomeDataTableColumns } from "../components/Income-Columns";
import AddIncomeReceiptSheet from "../components/Add-Income-Receipt-Sheet";
import useExportIncomes from "../hooks/useExportIncomes";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

export default function IncomePage() {
  const { mutate: exportIncomes, isPending: isExporting } = useExportIncomes();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDir | null>("desc");
  const [receiptBookId, setReceiptBookId] = useState<string | null>(null);
  const [committeeId, setCommitteeId] = useState<string | null>(null);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const debouncedMinAmount = useDebounce(minAmount, 600);
  const debouncedMaxAmount = useDebounce(maxAmount, 600);

  const parseAmount = (amount: string) => {
    if (!amount.trim()) return undefined;
    const value = Number(amount);
    return Number.isFinite(value) ? value : undefined;
  };

  const { data: incomeResponse, isFetching } = useGetIncomes({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortDir: sortDirection ?? "desc",
    searchKey,
    searchColumn,
    receiptBookId: receiptBookId ?? "",
    committeeId: committeeId ?? "",
    minAmount: parseAmount(debouncedMinAmount),
    maxAmount: parseAmount(debouncedMaxAmount),
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
    {
      id: "receiptNumber",
      label: "Receipt Number",
    },
  ];

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading title="Income" description="Manage organization income." />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={isExporting}
            onClick={() =>
              exportIncomes({
                pageIndex: pagination.pageIndex + 1,
                pageSize: pagination.pageSize,
                sortDir: sortDirection ?? "desc",
                searchKey,
                searchColumn,
                receiptBookId: receiptBookId ?? "",
                committeeId: committeeId ?? "",
                minAmount: parseAmount(minAmount),
                maxAmount: parseAmount(maxAmount),
              })
            }
          >
            {isExporting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Download />
            )}
            {isExporting ? "Exporting..." : "Export Excel"}
          </Button>
          <AddIncomeReceiptSheet />
        </div>
      </PageHeader>
      <PageSection>
        <IncomeDataTable
          data={incomeResponse?.data}
          columns={incomeDataTableColumns}
          isLoading={isFetching}
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
            pageCount: incomeResponse?.meta.totalPages,
            pagination,
            setPagination,
          }}
          committeeId={committeeId}
          receiptBookId={receiptBookId}
          minAmount={minAmount}
          maxAmount={maxAmount}
          setCommitteeId={setCommitteeId}
          setReceiptBookId={setReceiptBookId}
          setMinAmount={setMinAmount}
          setMaxAmount={setMaxAmount}
        />
      </PageSection>
    </PageLayout>
  );
}
