import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { getExpenseCategoryDetails } from "../api/expense-category.api";

export default function useGetExpenseCategoryDetails(id: number | null) {
  return useQuery({
    queryKey: [MODULES.EXPENSE_CATEGORY, "details", id],
    enabled: !!id,
    queryFn: () => getExpenseCategoryDetails(id),
  });
}
