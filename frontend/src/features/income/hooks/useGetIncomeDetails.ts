import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { getIncomeDetails } from "../api/income.api";

export default function useGetIncomeDetails(incomeId: number | null) {
  return useQuery({
    queryKey: [MODULES.INCOME, "details", incomeId],
    enabled: !!incomeId,
    queryFn: () => getIncomeDetails(incomeId),
  });
}
