import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { getOrgMembers } from "../api/orgMember.api";

export default function useGetOrgMembers() {
  return useQuery({
    queryKey: [MODULES.ORG_MEMBERS],
    queryFn: () => getOrgMembers(),
  });
}
