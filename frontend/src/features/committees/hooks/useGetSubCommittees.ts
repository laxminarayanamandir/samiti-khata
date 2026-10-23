import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { getAllSubCommittees } from "../api/committee.api";

export default function useGetSubCommittees() {
  return useQuery({
    queryKey: [MODULES.SUB_COMMITTEE],
    queryFn: () => getAllSubCommittees(),
  });
}
