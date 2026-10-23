import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { getExpenseCategories } from "../api/expense-category.api";

export default function useGetExpenseCategories() {
  return useQuery({
    queryKey: [MODULES.EXPENSE_CATEGORY],
    queryFn: () => getExpenseCategories(),
  });
}
