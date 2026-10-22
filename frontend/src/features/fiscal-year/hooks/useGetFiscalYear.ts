import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { getFiscalYear } from "../api/fiscal-year.api";

export default function useGetFiscalYears() {
  return useQuery({
    queryKey: [MODULES.FISCAL_YEAR],
    queryFn: () => getFiscalYear(),
  });
}
