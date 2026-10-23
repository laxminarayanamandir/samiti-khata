import { me } from "../api/auth.api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetLoggedInUser() {
  return useQuery({
    queryKey: [QUERY_KEYS.AUTH_USER],
    queryFn: me,
    placeholderData: keepPreviousData,
  });
}
