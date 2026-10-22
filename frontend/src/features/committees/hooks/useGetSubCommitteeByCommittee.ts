import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { getSubCommitteesByCommittee } from "../api/committee.api";

export default function useGetSubCommitteeByCommittee(committeeId?: number) {
  return useQuery({
    queryKey: [MODULES.SUB_COMMITTEE, "committee_id", committeeId],
    queryFn: () => getSubCommitteesByCommittee(committeeId),
    enabled: !!committeeId,
  });
}
