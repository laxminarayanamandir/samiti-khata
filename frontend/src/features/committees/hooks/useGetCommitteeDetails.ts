import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { getCommitteeDetails } from "../api/committee.api";

export default function useGetCommitteeDetails(id: number | null) {
  return useQuery({
    queryKey: [MODULES.COMMITTEE, "details", id],
    enabled: !!id,
    queryFn: () => getCommitteeDetails(id),
  });
}
