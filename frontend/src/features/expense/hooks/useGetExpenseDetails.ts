import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { getExpenseDetails } from "../api/expense.api";

export default function useGetExpenseDetails(expenseId: number | null) {
  return useQuery({
    queryKey: [MODULES.EXPENSE, "details", expenseId],
    enabled: !!expenseId,
    queryFn: () => getExpenseDetails(expenseId),
  });
}
