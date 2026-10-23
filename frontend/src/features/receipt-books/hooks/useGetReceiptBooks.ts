import { MODULES } from "@/constants/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getReceiptBooks } from "../api/receipt-books.api";
import type { ReceiptBookQueryParams } from "@/types/pagination.types";

export default function useGetReceiptBooks({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
  fiscalYearId,
  status,
  assignedTo,
  searchKey,
  searchColumn,
}: ReceiptBookQueryParams) {
  return useQuery({
    queryKey: [
      MODULES.RECEIPT_BOOK,
      "page",
      pageIndex,
      pageSize,
      sortDir,
      fiscalYearId,
      status,
      assignedTo,
      searchKey,
      searchColumn,
    ],
    queryFn: () =>
      getReceiptBooks({
        pageIndex,
        pageSize,
        sortDir,
        fiscalYearId,
        status,
        assignedTo,
        searchKey,
        searchColumn,
      }),
    placeholderData: keepPreviousData,
  });
}
