import { MODULES } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { getMyOrganization } from "../api/organizations.api";

export default function useGetMyOrganization() {
  return useQuery({
    queryKey: [MODULES.ORGANIZATION],
    queryFn: getMyOrganization,
  });
}
