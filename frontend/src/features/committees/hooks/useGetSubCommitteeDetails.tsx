import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import {  getSubCommitteeDetails } from "../api/committee.api";

export default function useGetSubCommitteeDetails(id: number | null) {
  return useQuery({
    queryKey: [MODULES.SUB_COMMITTEE, "details", id],
    enabled: !!id,
    queryFn: () => getSubCommitteeDetails(id),
  });
}
