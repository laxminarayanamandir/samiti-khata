import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { getCommittees } from "../api/committee.api";

export default function useGetCommittees() {
  return useQuery({
    queryKey: [MODULES.COMMITTEE],
    queryFn: () => getCommittees(),
  });
}
