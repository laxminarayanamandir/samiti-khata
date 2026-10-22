import { MODULES } from "@/constants/constants";
import { getExpenses } from "../api/expense.api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ExpenseQueryParams } from "@/types/pagination.types";

export default function useGetExpenses({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
  categoryId,
  committeeId,
  searchColumn,
  searchKey,
}: ExpenseQueryParams) {
  return useQuery({
    queryKey: [MODULES.EXPENSE, "page", pageIndex, pageSize, sortDir, searchKey, searchColumn, categoryId, committeeId],
    queryFn: () => getExpenses({ pageIndex, pageSize, sortDir, searchKey, searchColumn, categoryId, committeeId }),
    placeholderData: keepPreviousData,
  });
}
